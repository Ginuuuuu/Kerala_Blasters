import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
  const proc = spawn(edgePath, [
    '--headless',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--window-size=1440,900',
    '--hide-scrollbars'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://localhost:9222/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
    const wsUrl = pageTab?.webSocketDebuggerUrl;
    if (!wsUrl) throw new Error('No tab available');

    const ws = new WebSocket(wsUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const { resolve, reject } = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    await new Promise(r => ws.onopen = r);

    const send = (method, params = {}) => {
      const msgId = id++;
      return new Promise((resolve, reject) => {
        callbacks.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 4000));

    // Evaluate layout
    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const standFor = document.querySelector('[class*="standForBannerLayer"]');
        const hero03 = document.querySelector('[class*="hero03BannerLayer"]');
        const sailors = document.querySelector('[class*="sailorsBannerLayer"]');
        return {
          windowHeight: window.innerHeight,
          scrollHeight: document.documentElement.scrollHeight,
          standForTop: standFor ? standFor.getBoundingClientRect().top + window.scrollY : null,
          hero03Top: hero03 ? hero03.getBoundingClientRect().top + window.scrollY : null,
          sailorsTop: sailors ? sailors.getBoundingClientRect().top + window.scrollY : null,
        };
      })()`,
      returnByValue: true
    });

    console.log('Layout info:', evalRes.result?.value);
    const layout = evalRes.result?.value;

    const captureAtScroll = async (scrollY, filename) => {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo(0, ${scrollY});`
      });
      await new Promise(r => setTimeout(r, 600));

      const pos = await send('Runtime.evaluate', {
        expression: `(() => {
          const hero03 = document.querySelector('[class*="hero03BannerLayer"]');
          const kerala = document.querySelector('[class*="keralaContainer"] h2');
          const blasters = document.querySelector('[class*="blastersContainer"] h2');
          const serialize = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) };
          };
          return {
            scrollY: window.scrollY,
            hero03Top: hero03 ? Math.round(hero03.getBoundingClientRect().top) : null,
            kerala: serialize(kerala),
            blasters: serialize(blasters)
          };
        })()`,
        returnByValue: true
      });
      console.log(`Scroll ${scrollY} status:`, JSON.stringify(pos.result?.value));

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(filename, Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved screenshot to ${filename}`);
    };

    // 1. Scroll 4500: Hero03 at top: 0 (Banner at top: 0, KERALA at top-left, BLASTERS at bottom-right)
    await captureAtScroll(layout.hero03Top, 'screenshot_1_hero03_start.png');

    // 2. Scroll 4725: Banner scrolling up, KERALA translating straight down
    await captureAtScroll(layout.hero03Top + 225, 'screenshot_2_hero03_scrolling.png');

    // 3. Scroll 4950: KERALA reached bottom-left (aligned with BLASTERS on bottom baseline!)
    await captureAtScroll(layout.hero03Top + 450, 'screenshot_3_hero03_aligned.png');

    // 4. Scroll 5400: Sailors entering in normal scroll
    await captureAtScroll(layout.sailorsTop, 'screenshot_4_sailors_normal.png');

    ws.close();
  } finally {
    proc.kill();
  }
}

run().catch(console.error);
