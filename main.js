document.addEventListener('DOMContentLoaded', () => {
  // Screens
  const titleScreen = document.getElementById('title-screen');
  const missionBriefingScreen = document.getElementById('mission-briefing-screen');
  const gameAreaScreen = document.getElementById('game-area-screen');
  const marsOpsScreen = document.getElementById('mars-ops-screen');
  const suitSimScreen = document.getElementById('suit-sim-screen');

  // Panels
  const missionBriefsPanel = document.getElementById('mission-briefs-panel');
  const scanResultPanel = document.getElementById('scan-result-panel');
  const droneResultPanel = document.getElementById('drone-result-panel');
  const soilSensorPanel = document.getElementById('soil-sensor-panel');

  // Buttons
  const launchButton = document.getElementById('launch-button');
  const startMissionButton = document.getElementById('start-mission-button');
  const beginSimulationButton = document.getElementById('begin-simulation-button');
  const enterSuitSimButton = document.getElementById('enter-suit-sim-button');
  const returnToOpsButton = document.getElementById('return-to-ops-button');
  const scanTerrainButton = document.getElementById('scan-terrain-button');
  const deployDroneButton = document.getElementById('deploy-drone-button');
  const viewBriefsButton = document.getElementById('view-briefs-button');
  const rechargeSuitButton = document.getElementById('recharge-suit-button');
  const closeBriefsButton = document.getElementById('close-briefs-button');
  const closeScanButton = document.getElementById('close-scan-button');
  const closeDroneButton = document.getElementById('close-drone-button');
  const deploySoilSensorButton = document.getElementById('deploy-soil-sensor-button');
  const cancelSoilSensorButton = document.getElementById('cancel-soil-sensor-button');

  // HUD Elements
  const missionCounter = document.getElementById('mission-counter');
  const oxygenLevel = document.getElementById('oxygen-level');
  const pressureReading = document.getElementById('pressure-reading');
  const missionMarker = document.getElementById('mission-marker');

  // R.O.V.E.R.
  const roverText = document.getElementById('rover-text');
  const roverSimText = document.getElementById('rover-sim-text');

  // Logbook
  const logbook = document.getElementById('logbook');

  // Badges
  const badgeScan = document.getElementById('badge-scan');
  const badgeDrone = document.getElementById('badge-drone');
  const badgeBriefs = document.getElementById('badge-briefs');

  // Map Zones
  const roverDock = document.getElementById('rover-dock');
  const habitatModule = document.getElementById('habitat-module');
  const powerArray = document.getElementById('power-array');
  const greenhouse = document.getElementById('greenhouse');

  // Mission logic
  let completedMissions = 0;
  const totalMissions = 3;

  function updateMissionCounter() {
    completedMissions++;
    missionCounter.textContent = `Missions Completed: ${completedMissions}/${totalMissions}`;
  }

  function showScreen(screen) {
    [titleScreen, missionBriefingScreen, gameAreaScreen, marsOpsScreen, suitSimScreen]
      .forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');
  }

  function addLogEntry(msg) {
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const entry = document.createElement('div');
    entry.className = 'logbook-entry';
    entry.textContent = `[${time}] ${msg}`;
    logbook.appendChild(entry);
    logbook.scrollTop = logbook.scrollHeight;
  }

  // ROVER message logic (OPS)
  const roverMessages = [
    'Try scanning the terrain to find resources!',
    'Mars has two moons, Phobos and Deimos!',
    'Let’s deploy a drone to explore further!',
    'Mission briefs have important tasks for us!'
  ];
  let messageIndex = 0;
  function updateRoverMessage() {
    roverText.textContent = roverMessages[messageIndex];
    messageIndex = (messageIndex + 1) % roverMessages.length;
  }

  // ROVER Sim messages
  const simMessages = [
    'Let’s explore the Rover Dock!',
    'Check the Habitat Module for supplies.',
    'The Power Array needs maintenance.',
    'The Greenhouse has plants to care for!'
  ];

  function updateRoverSimMessage(msg) {
    roverSimText.textContent = msg;
  }

  // HUD logic
  let oxygen = 100;
  let pressure = 0.6;
  function updateHUD() {
    oxygen = Math.max(0, oxygen - 0.2);
    pressure = 0.6 + (Math.random() * 0.1 - 0.05);
    oxygenLevel.textContent = `${Math.round(oxygen)}%`;
    pressureReading.textContent = `${pressure.toFixed(1)} kPa`;
    if (oxygen < 20) addLogEntry('Warning: Oxygen levels critical!');
  }

  // Core Events
  launchButton.onclick = () => {
    showScreen(missionBriefingScreen);
    addLogEntry('Mission briefing accessed.');
  };

  startMissionButton.onclick = () => {
    showScreen(gameAreaScreen);
    addLogEntry('Explorer arrived on Mars.');
  };

  beginSimulationButton.onclick = () => {
    showScreen(marsOpsScreen);
    addLogEntry('Training module underway. R.O.V.E.R. activated.');
    roverText.textContent = 'Welcome, Explorer! Let’s explore Mars together!';
    messageIndex = 0;
    setInterval(updateRoverMessage, 10000);
  };

  enterSuitSimButton.onclick = () => {
    showScreen(suitSimScreen);
    oxygen = 100;
    missionMarker.textContent = 'Explore Rover Dock';
    addLogEntry('Suit simulation activated. Mars Base Alpha online.');
    setInterval(updateHUD, 3000);
  };

  returnToOpsButton.onclick = () => {
    showScreen(marsOpsScreen);
    addLogEntry('Returned to Mars Ops Center.');
  };

  // OPS Missions
  scanTerrainButton.onclick = () => {
    scanResultPanel.classList.remove('hidden');
    const finds = [
      'Rock formation: high iron oxide.',
      'Soil sample: perchlorates found.',
      'Crater rim: possible water flow.'
    ];
    const find = finds[Math.floor(Math.random() * finds.length)];
    document.getElementById('scan-discovery').textContent = find;
    addLogEntry(`Scan complete: ${find}`);

    if (badgeScan.classList.contains('locked')) {
      badgeScan.classList.remove('locked');
      badgeScan.classList.add('unlocked');
      badgeScan.textContent = '🌋 Scan Master';
      addLogEntry('Badge unlocked: Scan Master!');
      updateMissionCounter();
    }
  };

  deployDroneButton.onclick = () => {
    droneResultPanel.classList.remove('hidden');
    const cd = document.getElementById('drone-countdown');
    cd.textContent = 'Launching in 3...';
    let i = 2;
    const interval = setInterval(() => {
      if (i === 0) {
        clearInterval(interval);
        cd.textContent = 'Drone launched.';
        document.getElementById('drone-log').textContent = 'Camera feed live.';
      } else {
        cd.textContent = `Launching in ${i--}...`;
      }
    }, 1000);

    addLogEntry('Drone launched to Sector 13D.');

    if (badgeDrone.classList.contains('locked')) {
      badgeDrone.classList.remove('locked');
      badgeDrone.classList.add('unlocked');
      badgeDrone.textContent = '🚁 Drone Pilot';
      addLogEntry('Badge unlocked: Drone Pilot!');
      updateMissionCounter();
    }
  };

  viewBriefsButton.onclick = () => {
    missionBriefsPanel.classList.remove('hidden');
    addLogEntry('Mission briefs accessed.');
    if (badgeBriefs.classList.contains('locked')) {
      badgeBriefs.classList.remove('locked');
      badgeBriefs.classList.add('unlocked');
      badgeBriefs.textContent = '📜 Mission Expert';
      addLogEntry('Badge unlocked: Mission Expert!');
      updateMissionCounter();
    }
  };

  rechargeSuitButton.onclick = () => {
    oxygen = 100;
    addLogEntry('Suit recharged. Oxygen restored.');
    alert('Suit recharge complete!');
  };

  // Map Interactions
  roverDock.onclick = () => {
    missionMarker.textContent = 'Explore Rover Dock';
    soilSensorPanel.classList.remove('hidden');
    updateRoverSimMessage('Anomaly detected at Rover Dock!');
    addLogEntry('Arrived at Rover Dock.');
  };

  habitatModule.onclick = () => {
    missionMarker.textContent = 'Check Habitat Module';
    updateRoverSimMessage(simMessages[1]);
    addLogEntry('Arrived at Habitat Module.');
  };

  powerArray.onclick = () => {
    missionMarker.textContent = 'Inspect Power Array';
    updateRoverSimMessage(simMessages[2]);
    addLogEntry('Arrived at Power Array.');
  };

  greenhouse.onclick = () => {
    missionMarker.textContent = 'Care for Greenhouse';
    updateRoverSimMessage(simMessages[3]);
    addLogEntry('Arrived at Greenhouse.');
  };

  // Soil Sensor
  deploySoilSensorButton.onclick = () => {
    soilSensorPanel.classList.add('hidden');
    addLogEntry('Soil sensor deployed...');
    setTimeout(() => {
      addLogEntry('Soil analysis: Iron oxide content HIGH.');
      const badge = document.createElement('span');
      badge.className = 'badge unlocked';
      badge.textContent = '🧪 Soil Analyst';
      document.querySelector('.badge-overview').appendChild(badge);
      addLogEntry('Badge unlocked: Soil Analyst!');
    }, 2000);
  };

  cancelSoilSensorButton.onclick = () => {
    soilSensorPanel.classList.add('hidden');
    addLogEntry('Soil sensor deployment canceled.');
  };

  // Panel Closes
  closeBriefsButton.onclick = () => missionBriefsPanel.classList.add('hidden');
  closeScanButton.onclick = () => scanResultPanel.classList.add('hidden');
  closeDroneButton.onclick = () => droneResultPanel.classList.add('hidden');

  // Startup
  showScreen(titleScreen);
  addLogEntry('Explorer system initialized.');
});