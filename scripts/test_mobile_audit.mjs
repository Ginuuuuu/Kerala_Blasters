import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
  const proc = spawn(edgePath, [
    '--headless',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--window-size=390,844',
    '--hide-scrollbars'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://localhost:9223/json');
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
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true
    });
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 3500));

    // Audit layout & find any elements causing horizontal overflow
    const auditRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const overflowing = [];
        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > winWidth + 1 || rect.left < -1) {
            overflowing.push({
              tag: el.tagName,
              className: el.className,
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width)
            });
          }
        });

        const getTop = (sel) => {
          const el = document.querySelector(sel);
          return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null;
        };

        return {
          winWidth,
          docWidth,
          hasHorizontalOverflow: docWidth > winWidth,
          overflowingCount: overflowing.length,
          topOverflowing: overflowing.slice(0, 10),
          standForTop: getTop('[class*="standForBannerLayer"]'),
          hero03Top: getTop('[class*="hero03BannerLayer"]'),
          sailorsTop: getTop('[class*="sailorsBannerLayer"]'),
          quoteTop: getTop('[class*="quoteSection"]'),
          roadmapTop: getTop('#roadmap, [class*="journeySection"]'),
          footerTop: getTop('footer, [class*="footerRoot"]'),
        };
      })()`,
      returnByValue: true
    });

    console.log('Mobile Audit Initial:', JSON.stringify(auditRes.result?.value, null, 2));
    const layout = auditRes.result?.value;

    const captureSection = async (scrollY, filename) => {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollY});` });
      await new Promise(r => setTimeout(r, 800));
      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(filename, Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
    };

    if (layout.standForTop != null) await captureSection(layout.standForTop, 'mobile_1_standfor.png');
    if (layout.hero03Top != null) await captureSection(layout.hero03Top, 'mobile_2_hero03.png');
    if (layout.sailorsTop != null) await captureSection(layout.sailorsTop, 'mobile_3_sailors.png');
    if (layout.quoteTop != null) await captureSection(layout.quoteTop, 'mobile_4_quote.png');
    if (layout.roadmapTop != null) {
      await captureSection(layout.roadmapTop, 'mobile_5_roadmap_intro.png');
      await captureSection(layout.roadmapTop + 600, 'mobile_5b_roadmap_milestones.png');
    }
    if (layout.footerTop != null) {
      await captureSection(layout.footerTop, 'mobile_6_footer.png');
      await captureSection(layout.footerTop + 650, 'mobile_7_footer_bottom.png');
    }

    ws.close();
  } finally {
    proc.kill();
  }
}

run().catch(console.error);
