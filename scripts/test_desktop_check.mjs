import { spawn } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
  const proc = spawn(edgePath, [
    '--headless',
    '--remote-debugging-port=9225',
    '--disable-gpu',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://localhost:9225/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    let id = 1;

    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const msgId = id++;
      const onMsg = (evt) => {
        const m = JSON.parse(evt.data);
        if (m.id === msgId) {
          ws.removeEventListener('message', onMsg);
          if (m.error) reject(m.error);
          else resolve(m.result);
        }
      };
      ws.addEventListener('message', onMsg);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await new Promise(r => ws.onopen = r);
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 3500));

    const checkRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const stickyStage = document.querySelector('[class*="stickyStage"]');
        const mobileStage = document.querySelector('[class*="mobileTimelineStage"]');
        return {
          winWidth: window.innerWidth,
          docWidth: document.documentElement.scrollWidth,
          stickyStageDisplay: stickyStage ? getComputedStyle(stickyStage).display : 'none',
          mobileStageDisplay: mobileStage ? getComputedStyle(mobileStage).display : 'none',
        };
      })()`,
      returnByValue: true
    });

    console.log('Desktop Check Result:', JSON.stringify(checkRes.result?.value, null, 2));
    ws.close();
  } finally {
    proc.kill();
  }
}

run().catch(console.error);
