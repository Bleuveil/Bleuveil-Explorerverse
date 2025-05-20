document.addEventListener('DOMContentLoaded', () => {
  // Screen references
  const titleScreen = document.getElementById('title-screen');
  const missionBriefingScreen = document.getElementById('mission-briefing-screen');
  const gameAreaScreen = document.getElementById('game-area-screen');
  const marsOpsScreen = document.getElementById('mars-ops-screen');

  // Buttons
  const launchButton = document.getElementById('launch-button');
  const startMissionButton = document.getElementById('start-mission-button');
  const beginSimulationButton = document.getElementById('begin-simulation-button');

  const scanTerrainButton = document.getElementById('scan-terrain-button');
  const deployDroneButton = document.getElementById('deploy-drone-button');
  const viewBriefsButton = document.getElementById('view-briefs-button');
  const rechargeSuitButton = document.getElementById('recharge-suit-button');
  const analyzeWeatherButton = document.getElementById('analyze-weather-button');

  // Panels
  const missionBriefsPanel = document.getElementById('mission-briefs-panel');
  const scanResultPanel = document.getElementById('scan-result-panel');
  const droneResultPanel = document.getElementById('drone-result-panel');
  const weatherPanel = document.getElementById('weather-panel');

  // Close buttons
  const closeBriefsButton = document.getElementById('close-briefs-button');
  const closeScanButton = document.getElementById('close-scan-button');
  const closeDroneButton = document.getElementById('close-drone-button');
  const closeWeatherButton = document.getElementById('close-weather-button');

  // Dashboard elements
  const missionCounter = document.getElementById('mission-counter');
  const roverMessage = document.getElementById('rover-message');

  // Logbook
  const logbook = document.getElementById('logbook');

  // Badges
  const badgeScan = document.getElementById('badge-scan');
  const badgeDrone = document.getElementById('badge-drone');
  const badgeBriefs = document.getElementById('badge-briefs');
  const badgeWeather = document.getElementById('badge-weather');

  let missionsCompleted = 0;

  function showScreen(screenToShow) {
    [titleScreen, missionBriefingScreen, gameAreaScreen, marsOpsScreen].forEach(screen => {
      screen.classList.add('hidden');
    });
    screenToShow.classList.remove('hidden');
  }

  function addLogEntry(message) {
    const now = new Date();
    const timestamp = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const entry = document.createElement('div');
    entry.className = 'logbook-entry';
    entry.textContent = `[${timestamp}] ${message}`;
    logbook.appendChild(entry);
    logbook.scrollTop = logbook.scrollHeight;
  }

  function unlockBadge(badgeEl, name) {
    if (badgeEl.classList.contains('locked')) {
      badgeEl.classList.remove('locked');
      badgeEl.classList.add('unlocked');
      badgeEl.textContent = name;
      missionsCompleted++;
      updateDashboard();
      addLogEntry(`Badge unlocked: ${name}`);
    }
  }

  function updateDashboard() {
    if (missionCounter) {
      missionCounter.textContent = `Missions Completed: ${missionsCompleted}/4`;
    }
  }

  function cycleRoverMessages() {
    const messages = [
      "Explorer, remember to scan the terrain!",
      "Did you know? Mars has the largest dust storms in the solar system!",
      "Recharge your suit to stay mission-ready.",
      "Try deploying a recon drone to sector 13D!"
    ];
    let index = 0;
    setInterval(() => {
      roverMessage.textContent = messages[index];
      index = (index + 1) % messages.length;
    }, 10000);
  }

  // Navigation buttons
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
    addLogEntry('Training module: ACTIVE. Welcome to the Ops Center.');
  });

  // Mission Buttons
  scanTerrainButton?.addEventListener('click', () => {
    scanResultPanel.classList.remove('hidden');
    const discoveries = [
      'Basalt ridge detected. Magnetic resonance active.',
      'Dust deposit found: moderate perchlorates present.',
      'Cave opening spotted near southern ridge.'
    ];
    const result = discoveries[Math.floor(Math.random() * discoveries.length)];
    document.getElementById('scan-discovery').textContent = result;
    unlockBadge(badgeScan, '🌋 Scan Master');
    addLogEntry(`Scan complete: ${result}`);
  });

  deployDroneButton?.addEventListener('click', () => {
    droneResultPanel.classList.remove('hidden');
    const countdownEl = document.getElementById('drone-countdown');
    const droneLog = document.getElementById('drone-log');
    let countdown = 3;
    countdownEl.textContent = `Launching in ${countdown}...`;
    const interval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        countdownEl.textContent = `Launching in ${countdown}...`;
      } else {
        clearInterval(interval);
        countdownEl.textContent = 'Drone launched.';
        droneLog.textContent = 'Recon feed active.';
        unlockBadge(badgeDrone, '🚁 Drone Pilot');
        addLogEntry('Recon drone deployed to Sector 13D.');
      }
    }, 1000);
  });

  viewBriefsButton?.addEventListener('click', () => {
    missionBriefsPanel.classList.remove('hidden');
    unlockBadge(badgeBriefs, '📜 Mission Expert');
    addLogEntry('Mission briefs accessed.');
  });

  rechargeSuitButton?.addEventListener('click', () => {
    addLogEntry('Suit recharge complete.');
    alert('Suit recharge complete!');
  });

  analyzeWeatherButton?.addEventListener('click', () => {
    weatherPanel.classList.remove('hidden');
    const facts = [
      'Temperature: -70°C. Wind: 30 km/h. Dust storm: HIGH.',
      'Temp: -65°C. Wind: 22 km/h. Skies: CLEAR.',
      'Temp: -80°C. Wind: 40 km/h. Dust storm: SEVERE.'
    ];
    const reading = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('weather-data').textContent = reading;
    unlockBadge(badgeWeather, '☁️ Weather Watcher');
    addLogEntry(`Weather data retrieved: ${reading}`);
  });

  // Panel closes
  closeBriefsButton?.addEventListener('click', () => missionBriefsPanel.classList.add('hidden'));
  closeScanButton?.addEventListener('click', () => scanResultPanel.classList.add('hidden'));
  closeDroneButton?.addEventListener('click', () => droneResultPanel.classList.add('hidden'));
  closeWeatherButton?.addEventListener('click', () => weatherPanel.classList.add('hidden'));

  // Initial load
  showScreen(titleScreen);
  addLogEntry('BLEUVEIL Explorerverse initialized.');
  cycleRoverMessages();
});