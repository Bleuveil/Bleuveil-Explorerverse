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
  const weatherPanel = document.getElementById('weather-panel');

  // Buttons
  const launchButton = document.getElementById('launch-button');
  const startMissionButton = document.getElementById('start-mission-button');
  const beginSimulationButton = document.getElementById('begin-simulation-button');
  const scanTerrainButton = document.getElementById('scan-terrain-button');
  const deployDroneButton = document.getElementById('deploy-drone-button');
  const viewBriefsButton = document.getElementById('view-briefs-button');
  const rechargeSuitButton = document.getElementById('recharge-suit-button');
  const analyzeWeatherButton = document.getElementById('analyze-weather-button');
  const closeBriefsButton = document.getElementById('close-briefs-button');
  const closeScanButton = document.getElementById('close-scan-button');
  const closeDroneButton = document.getElementById('close-drone-button');
  const closeWeatherButton = document.getElementById('close-weather-button');

  // Badges
  const badgeScan = document.getElementById('badge-scan');
  const badgeDrone = document.getElementById('badge-drone');
  const badgeBriefs = document.getElementById('badge-briefs');
  const badgeWeather = document.getElementById('badge-weather');

  // Dashboard
  const missionCountDisplay = document.getElementById('mission-count');
  const roverMessage = document.getElementById('rover-message');

  // Logbook
  const logbook = document.getElementById('logbook');

  let completedMissions = new Set();

  function showScreen(screenToShow) {
    [titleScreen, missionBriefingScreen, gameAreaScreen, marsOpsScreen].forEach(screen =>
      screen.classList.add('hidden')
    );
    screenToShow.classList.remove('hidden');
  }

  function addLogEntry(message) {
    const now = new Date();
    const timestamp = `[${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}]`;
    const entry = document.createElement('div');
    entry.textContent = `${timestamp} ${message}`;
    logbook.appendChild(entry);
    logbook.scrollTop = logbook.scrollHeight;
  }

  function updateMissionCount() {
    missionCountDisplay.textContent = `Missions Completed: ${completedMissions.size}/4`;
  }

  function unlockBadge(badgeElement, label, id) {
    if (badgeElement.classList.contains('locked')) {
      badgeElement.classList.remove('locked');
      badgeElement.classList.add('unlocked');
      badgeElement.textContent = label;
      addLogEntry(`Badge unlocked: ${label}`);
    }
    completedMissions.add(id);
    updateMissionCount();
  }

  if (launchButton) {
    launchButton.addEventListener('click', () => {
      showScreen(missionBriefingScreen);
      addLogEntry('Mission briefing accessed.');
    });
  }

  if (startMissionButton) {
    startMissionButton.addEventListener('click', () => {
      showScreen(gameAreaScreen);
      addLogEntry('Explorer arrived on Mars.');
    });
  }

  if (beginSimulationButton) {
    beginSimulationButton.addEventListener('click', () => {
      showScreen(marsOpsScreen);
      addLogEntry('Training module: UNDERWAY. Awaiting mission selection...');
      updateMissionCount();
      setTimeout(() => {
        roverMessage.textContent = 'Explorer, remember to scan the terrain!';
      }, 1000);
    });
  }

  if (scanTerrainButton) {
    scanTerrainButton.addEventListener('click', () => {
      scanResultPanel.classList.remove('hidden');
      const discoveries = [
        'Rock formation detected: basalt, high iron oxide content.',
        'Soil sample collected: traces of perchlorates found.',
        'Cave opening spotted near southern ridge.'
      ];
      const result = discoveries[Math.floor(Math.random() * discoveries.length)];
      document.getElementById('scan-discovery').textContent = result;
      addLogEntry(`Scan complete: ${result}`);
      unlockBadge(badgeScan, '🌋 Scan Master', 'scan');
    });
  }

  if (deployDroneButton) {
    deployDroneButton.addEventListener('click', () => {
      droneResultPanel.classList.remove('hidden');
      const countdown = document.getElementById('drone-countdown');
      const feed = document.getElementById('drone-log');
      let counter = 3;
      countdown.textContent = `Launching in ${counter}...`;
      const interval = setInterval(() => {
        counter--;
        if (counter > 0) {
          countdown.textContent = `Launching in ${counter}...`;
        } else {
          clearInterval(interval);
          countdown.textContent = 'Drone launched!';
          feed.textContent = 'Recon drone deployed to Sector 13D.';
        }
      }, 1000);
      addLogEntry('Recon drone deployed to Sector 13D.');
      unlockBadge(badgeDrone, '🚁 Drone Pilot', 'drone');
    });
  }

  if (viewBriefsButton) {
    viewBriefsButton.addEventListener('click', () => {
      missionBriefsPanel.classList.remove('hidden');
      addLogEntry('Mission briefs accessed.');
      unlockBadge(badgeBriefs, '📜 Mission Expert', 'briefs');
    });
  }

  if (rechargeSuitButton) {
    rechargeSuitButton.addEventListener('click', () => {
      addLogEntry('Suit recharge complete.');
      alert('Suit recharge complete! Ready for action.');
    });
  }

  if (analyzeWeatherButton) {
    analyzeWeatherButton.addEventListener('click', () => {
      weatherPanel.classList.remove('hidden');
      const temp = Math.floor(Math.random() * 100) - 100;
      const wind = Math.floor(Math.random() * 100);
      const risk = ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)];
      const message = `Temperature: ${temp}°C\nWind Speed: ${wind} km/h\nSandstorm Risk: ${risk}`;
      document.getElementById('weather-data').textContent = message;
      addLogEntry(`Weather data collected. Risk: ${risk}`);
      unlockBadge(badgeWeather, '⛅ Weather Watcher', 'weather');
    });
  }

  // Close buttons
  if (closeBriefsButton) {
    closeBriefsButton.addEventListener('click', () => {
      missionBriefsPanel.classList.add('hidden');
    });
  }

  if (closeScanButton) {
    closeScanButton.addEventListener('click', () => {
      scanResultPanel.classList.add('hidden');
    });
  }

  if (closeDroneButton) {
    closeDroneButton.addEventListener('click', () => {
      droneResultPanel.classList.add('hidden');
    });
  }

  if (closeWeatherButton) {
    closeWeatherButton.addEventListener('click', () => {
      weatherPanel.classList.add('hidden');
    });
  }

  // ROVER message cycle
  const roverMessages = [
    'Explorer, remember to scan the terrain!',
    'Tip: Drones work best near Sector 13D.',
    'Mission briefs contain vital clues.',
    'Watch out for dust storms near Base Alpha!',
    'Mars is cold! Check the weather often.'
  ];

  let roverIndex = 0;
  setInterval(() => {
    if (marsOpsScreen && !marsOpsScreen.classList.contains('hidden')) {
      roverMessage.textContent = roverMessages[roverIndex];
      roverIndex = (roverIndex + 1) % roverMessages.length;
    }
  }, 8000);

  // Init
  showScreen(titleScreen);
  addLogEntry('BLEUVEIL system initialized.');
});