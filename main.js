document.addEventListener('DOMContentLoaded', () => {
  // Screen references
  const titleScreen = document.getElementById('title-screen');
  const missionBriefingScreen = document.getElementById('mission-briefing-screen');
  const gameAreaScreen = document.getElementById('game-area-screen');
  const marsOpsScreen = document.getElementById('mars-ops-screen');

  // Panels
  const missionBriefsPanel = document.getElementById('mission-briefs-panel');
  const scanResultPanel = document.getElementById('scan-result-panel');
  const droneResultPanel = document.getElementById('drone-result-panel');

  // Buttons
  const launchButton = document.getElementById('launch-button');
  const startMissionButton = document.getElementById('start-mission-button');
  const beginSimulationButton = document.getElementById('begin-simulation-button');
  const scanTerrainButton = document.getElementById('scan-terrain-button');
  const deployDroneButton = document.getElementById('deploy-drone-button');
  const viewBriefsButton = document.getElementById('view-briefs-button');
  const rechargeSuitButton = document.getElementById('recharge-suit-button');
  const closeBriefsButton = document.getElementById('close-briefs-button');
  const closeScanButton = document.getElementById('close-scan-button');
  const closeDroneButton = document.getElementById('close-drone-button');

  // Badges and Logbook
  const badgeScan = document.getElementById('badge-scan');
  const badgeDrone = document.getElementById('badge-drone');
  const badgeBriefs = document.getElementById('badge-briefs');
  const logbook = document.getElementById('logbook');

  // Screen Switching
  function showScreen(screenToShow) {
    [titleScreen, missionBriefingScreen, gameAreaScreen, marsOpsScreen].forEach(screen =>
      screen.classList.add('hidden')
    );
    screenToShow.classList.remove('hidden');
  }

  // Log Entry Helper
  function addLogEntry(message) {
    const now = new Date();
    const timestamp = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const entry = document.createElement('div');
    entry.className = 'logbook-entry';
    entry.textContent = `[${timestamp}] ${message}`;
    logbook.appendChild(entry);
    logbook.scrollTop = logbook.scrollHeight;
  }

  // Navigation Buttons
  launchButton?.addEventListener('click', () => {
    showScreen(missionBriefingScreen);
    addLogEntry('Mission briefing accessed.');
  });

  startMissionButton?.addEventListener('click', () => {
    showScreen(gameAreaScreen);
    addLogEntry('Explorer arrived on Mars.');
  });

  beginSimulationButton?.addEventListener('click', () => {
    showScreen(marsOpsScreen);
    addLogEntry('Training module: UNDERWAY. Mission 1 will deploy soon!');
  });

  // Mission Features
  scanTerrainButton?.addEventListener('click', () => {
    scanResultPanel.classList.remove('hidden');
    const results = [
      'Rock formation detected: basalt, high iron oxide content.',
      'Soil sample collected: traces of perchlorates found.',
      'Crater rim detected: possible ancient water flow.'
    ];
    const discovery = results[Math.floor(Math.random() * results.length)];
    document.getElementById('scan-discovery').textContent = discovery;
    addLogEntry(`Terrain scan complete. ${discovery}`);

    if (badgeScan.classList.contains('locked')) {
      badgeScan.classList.remove('locked');
      badgeScan.classList.add('unlocked');
      badgeScan.textContent = '🌋 Scan Master';
      addLogEntry('Badge unlocked: Scan Master!');
    }
  });

  deployDroneButton?.addEventListener('click', () => {
    droneResultPanel.classList.remove('hidden');
    const countdownEl = document.getElementById('drone-countdown');
    let count = 3;
    countdownEl.textContent = `Launching in ${count}...`;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        countdownEl.textContent = `Launching in ${count}...`;
      } else {
        clearInterval(interval);
        countdownEl.textContent = 'Drone launched.';
        document.getElementById('drone-log').textContent = 'Camera feed live.';
      }
    }, 1000);

    addLogEntry('Drone launched to Sector 13D. Awaiting results.');
    if (badgeDrone.classList.contains('locked')) {
      badgeDrone.classList.remove('locked');
      badgeDrone.classList.add('unlocked');
      badgeDrone.textContent = '🚁 Drone Pilot';
      addLogEntry('Badge unlocked: Drone Pilot!');
    }
  });

  viewBriefsButton?.addEventListener('click', () => {
    missionBriefsPanel.classList.remove('hidden');
    addLogEntry('Mission briefs accessed.');
    if (badgeBriefs.classList.contains('locked')) {
      badgeBriefs.classList.remove('locked');
      badgeBriefs.classList.add('unlocked');
      badgeBriefs.textContent = '📜 Mission Expert';
      addLogEntry('Badge unlocked: Mission Expert!');
    }
  });

  rechargeSuitButton?.addEventListener('click', () => {
    addLogEntry('Suit recharge complete. Explorer is stable.');
    alert('Suit recharge complete! Ready for action.');
  });

  // Close buttons for overlays
  closeBriefsButton?.addEventListener('click', () => {
    missionBriefsPanel.classList.add('hidden');
  });

  closeScanButton?.addEventListener('click', () => {
    scanResultPanel.classList.add('hidden');
  });

  closeDroneButton?.addEventListener('click', () => {
    droneResultPanel.classList.add('hidden');
  });

  // Initial boot log
  showScreen(titleScreen);
  addLogEntry('Explorer system initialized.');
});