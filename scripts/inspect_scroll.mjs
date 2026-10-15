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
        const quote = document.querySelector('[class*="quoteSection"]');
        return {
          windowHeight: window.innerHeight,
          scrollHeight: document.documentElement.scrollHeight,
          standForTop: standFor ? standFor.getBoundingClientRect().top + window.scrollY : null,
          hero03Top: hero03 ? hero03.getBoundingClientRect().top + window.scrollY : null,
          sailorsTop: sailors ? sailors.getBoundingClientRect().top + window.scrollY : null,
          quoteTop: quote ? quote.getBoundingClientRect().top + window.scrollY : null,
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

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(filename, Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved screenshot to ${filename}`);
    };

    // Capture at quote section
    await captureAtScroll(layout.quoteTop - 100, 'screenshot_quote_entering.png');
    await captureAtScroll(layout.quoteTop, 'screenshot_quote_normal.png');

    ws.close();
  } finally {
    proc.kill();
  }
}

run().catch(console.error);
