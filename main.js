document.addEventListener('DOMContentLoaded', () => {
  // Get screens
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

  // Close buttons
  const closeBriefsButton = document.getElementById('close-briefs-button');
  const closeScanButton = document.getElementById('close-scan-button');
  const closeDroneButton = document.getElementById('close-drone-button');
  const closeWeatherButton = document.getElementById('close-weather-button');

  // Dashboard
  const missionCounter = document.getElementById('mission-counter');
  const roverMessage = document.getElementById('rover-message');

  // Badges
  const badgeScan = document.getElementById('badge-scan');
  const badgeDrone = document.getElementById('badge-drone');
  const badgeBriefs = document.getElementById('badge-briefs');
  const badgeWeather = document.getElementById('badge-weather');

  // Logbook
  const logbook = document.getElementById('logbook');

  let completedMissions = 0;
  let unlocked = {
    scan: false,
    drone: false,
    briefs: false,
    weather: false,
  };

  function showScreen(screen) {
    [titleScreen, missionBriefingScreen, gameAreaScreen, marsOpsScreen].forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');
  }

  function addLog(msg) {
    const now = new Date();
    const entry = document.createElement('div');
    entry.className = 'logbook-entry';
    entry.textContent = `[${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}] ${msg}`;
    logbook.appendChild(entry);
    logbook.scrollTop = logbook.scrollHeight;
  }

  function updateCounter() {
    const count = Object.values(unlocked).filter(v => v).length;
    missionCounter.textContent = `Missions Completed: ${count}/4`;
  }

  // ROVER messages
  const roverTips = [
    "Explorer, remember to scan the terrain!",
    "Recharge your suit to stay mission-ready.",
    "Deploy your recon drone for deeper scans.",
    "Explore the weather station to predict Mars storms!"
  ];
  let tipIndex = 0;

  function cycleRoverMessage() {
    roverMessage.textContent = roverTips[tipIndex];
    tipIndex = (tipIndex + 1) % roverTips.length;
    setTimeout(cycleRoverMessage, 12000);
  }

  // === Events ===
  launchButton?.addEventListener('click', () => {
    showScreen(missionBriefingScreen);
    addLog("Mission briefing accessed.");
  });

  startMissionButton?.addEventListener('click', () => {
    showScreen(gameAreaScreen);
    addLog("Explorer arrived on Mars.");
  });

  beginSimulationButton?.addEventListener('click', () => {
    showScreen(marsOpsScreen);
    addLog("Training module: UNDERWAY. Mars Ops Center unlocked.");
    setTimeout(cycleRoverMessage, 2000);
    updateCounter();
  });

  scanTerrainButton?.addEventListener('click', () => {
    scanResultPanel.classList.remove('hidden');
    const discoveries = [
      "Cave opening spotted near southern ridge.",
      "Soil sample collected: traces of perchlorates found.",
      "Rock formation detected: basalt, high iron oxide content."
    ];
    const result = discoveries[Math.floor(Math.random() * discoveries.length)];
    document.getElementById("scan-discovery").textContent = result;
    addLog(`Scan complete: ${result}`);

    if (!unlocked.scan) {
      unlocked.scan = true;
      badgeScan.classList.remove('locked');
      badgeScan.classList.add('unlocked');
      badgeScan.textContent = '🌋 Scan Master';
      addLog('Badge unlocked: 🌋 Scan Master');
      updateCounter();
    }
  });

  deployDroneButton?.addEventListener('click', () => {
    droneResultPanel.classList.remove('hidden');
    let countdown = 3;
    const countdownElement = document.getElementById('drone-countdown');
    countdownElement.textContent = `Launching in ${countdown}...`;
    const interval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        countdownElement.textContent = `Launching in ${countdown}...`;
      } else {
        clearInterval(interval);
        countdownElement.textContent = "Recon drone deployed to Sector 13D.";
        document.getElementById('drone-log').textContent = "Camera feed active.";
        addLog("Recon drone deployed to Sector 13D.");
      }
    }, 1000);

    if (!unlocked.drone) {
      unlocked.drone = true;
      badgeDrone.classList.remove('locked');
      badgeDrone.classList.add('unlocked');
      badgeDrone.textContent = '🚁 Drone Pilot';
      addLog('Badge unlocked: 🚁 Drone Pilot');
      updateCounter();
    }
  });

  viewBriefsButton?.addEventListener('click', () => {
    missionBriefsPanel.classList.remove('hidden');
    addLog("Mission briefs accessed.");

    if (!unlocked.briefs) {
      unlocked.briefs = true;
      badgeBriefs.classList.remove('locked');
      badgeBriefs.classList.add('unlocked');
      badgeBriefs.textContent = '📜 Mission Expert';
      addLog('Badge unlocked: 📜 Mission Expert');
      updateCounter();
    }
  });

  rechargeSuitButton?.addEventListener('click', () => {
    alert("Suit recharge complete! Ready for action.");
    addLog("Suit recharge complete.");
  });

  analyzeWeatherButton?.addEventListener('click', () => {
    weatherPanel.classList.remove('hidden');
    const weatherFacts = [
      "Temperature: -65°C. Wind Speed: 30 km/h. Sandstorm Risk: High.",
      "Temperature: -72°C. Calm winds. Sandstorm Risk: Low.",
      "Temperature: -60°C. Dust in atmosphere. Solar panel performance reduced."
    ];
    const weatherData = weatherFacts[Math.floor(Math.random() * weatherFacts.length)];
    document.getElementById('weather-data').textContent = weatherData;
    addLog(`Weather data collected. ${weatherData}`);
    addLog("Solar panels adjusted. Base Alpha protected.");

    if (!unlocked.weather) {
      unlocked.weather = true;
      badgeWeather.classList.remove('locked');
      badgeWeather.classList.add('unlocked');
      badgeWeather.textContent = '☁️ Weather Watcher';
      addLog('Badge unlocked: ☁️ Weather Watcher');
      updateCounter();
    }
  });

  // Close panel events
  closeBriefsButton?.addEventListener('click', () => missionBriefsPanel.classList.add('hidden'));
  closeScanButton?.addEventListener('click', () => scanResultPanel.classList.add('hidden'));
  closeDroneButton?.addEventListener('click', () => droneResultPanel.classList.add('hidden'));
  closeWeatherButton?.addEventListener('click', () => weatherPanel.classList.add('hidden'));

  // Initialize
  showScreen(titleScreen);
  addLog("Explorer system initialized.");
});