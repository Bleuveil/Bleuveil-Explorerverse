document.addEventListener('DOMContentLoaded', () => {
    const titleScreen = document.getElementById('title-screen');
    const missionBriefingScreen = document.getElementById('mission-briefing-screen');
    const gameAreaScreen = document.getElementById('game-area-screen');
    const marsOpsScreen = document.getElementById('mars-ops-screen');

    const missionBriefsPanel = document.getElementById('mission-briefs-panel');
    const scanResultPanel = document.getElementById('scan-result-panel');
    const droneResultPanel = document.getElementById('drone-result-panel');
    const weatherPanel = document.getElementById('weather-panel');

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
    const adjustPanelsButton = document.getElementById('adjust-panels-button');

    const badgeScan = document.getElementById('badge-scan');
    const badgeDrone = document.getElementById('badge-drone');
    const badgeBriefs = document.getElementById('badge-briefs');
    const badgeWeather = document.getElementById('badge-weather');

    const missionCounter = document.getElementById('mission-counter');
    const roverMessage = document.getElementById('rover-message');

    const logbook = document.getElementById('logbook');
    const scanDiscovery = document.getElementById('scan-discovery');
    const droneCountdown = document.getElementById('drone-countdown');
    const droneLog = document.getElementById('drone-log');
    const weatherDataText = document.getElementById('weather-data');

    function showScreen(screen) {
        [titleScreen, missionBriefingScreen, gameAreaScreen, marsOpsScreen].forEach(s => s.classList.add('hidden'));
        screen.classList.remove('hidden');
    }

    function addLogEntry(message) {
        const now = new Date();
        const time = `[${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}]`;
        const entry = document.createElement('div');
        entry.className = 'logbook-entry';
        entry.textContent = `${time} ${message}`;
        logbook.appendChild(entry);
        logbook.scrollTop = logbook.scrollHeight;
    }

    function updateMissionCounter() {
        let completed = 0;
        if (badgeScan.classList.contains('unlocked')) completed++;
        if (badgeDrone.classList.contains('unlocked')) completed++;
        if (badgeBriefs.classList.contains('unlocked')) completed++;
        if (badgeWeather.classList.contains('unlocked')) completed++;
        missionCounter.textContent = `Missions Completed: ${completed}/4`;
    }

    function updateRoverMessage() {
        const messages = [
            'Explorer, remember to scan the terrain!',
            'Recon drone is ready to launch!',
            'Have you checked your mission briefs?',
            'Solar panels need protection from sandstorms!'
        ];
        const random = messages[Math.floor(Math.random() * messages.length)];
        roverMessage.textContent = random;
    }

    setInterval(updateRoverMessage, 8000);

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
            addLogEntry('Training module: UNDERWAY. Mission 1 will deploy soon!');
            updateMissionCounter();
            updateRoverMessage();
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
            const discovery = discoveries[Math.floor(Math.random() * discoveries.length)];
            scanDiscovery.textContent = discovery;
            addLogEntry(`Scan complete: ${discovery}`);
            if (badgeScan.classList.contains('locked')) {
                badgeScan.classList.remove('locked');
                badgeScan.classList.add('unlocked');
                badgeScan.textContent = '🌋 Scan Master';
                addLogEntry('Badge unlocked: 🌋 Scan Master');
                updateMissionCounter();
            }
        });
    }

    if (deployDroneButton) {
        deployDroneButton.addEventListener('click', () => {
            droneResultPanel.classList.remove('hidden');
            let countdown = 3;
            droneCountdown.textContent = `Launching in ${countdown}...`;
            const interval = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    droneCountdown.textContent = `Launching in ${countdown}...`;
                } else {
                    clearInterval(interval);
                    droneCountdown.textContent = 'Recon drone deployed to Sector 13D.';
                    droneLog.textContent = 'Camera feed: signal stable.';
                }
            }, 1000);
            addLogEntry('Recon drone deployed to Sector 13D.');
            if (badgeDrone.classList.contains('locked')) {
                badgeDrone.classList.remove('locked');
                badgeDrone.classList.add('unlocked');
                badgeDrone.textContent = '🚁 Drone Pilot';
                addLogEntry('Badge unlocked: 🚁 Drone Pilot');
                updateMissionCounter();
            }
        });
    }

    if (viewBriefsButton) {
        viewBriefsButton.addEventListener('click', () => {
            missionBriefsPanel.classList.remove('hidden');
            addLogEntry('Mission briefs accessed.');
            if (badgeBriefs.classList.contains('locked')) {
                badgeBriefs.classList.remove('locked');
                badgeBriefs.classList.add('unlocked');
                badgeBriefs.textContent = '📜 Mission Expert';
                addLogEntry('Badge unlocked: 📜 Mission Expert');
                updateMissionCounter();
            }
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
            const data = [
                'Temperature: -65°C. Wind Speed: 30 km/h. Sandstorm Risk: High.',
                'Temperature: -70°C. Wind Speed: 15 km/h. Sandstorm Risk: Low.',
                'Temperature: -60°C. Wind Speed: 50 km/h. Sandstorm Risk: Moderate.'
            ];
            const selected = data[Math.floor(Math.random() * data.length)];
            weatherDataText.textContent = selected;
            addLogEntry(`Weather data collected. ${selected}`);
        });
    }

    if (adjustPanelsButton) {
        adjustPanelsButton.addEventListener('click', () => {
            addLogEntry('Solar panels adjusted for storm protection.');
            if (badgeWeather.classList.contains('locked')) {
                badgeWeather.classList.remove('locked');
                badgeWeather.classList.add('unlocked');
                badgeWeather.textContent = '☁️ Weather Watcher';
                addLogEntry('Badge unlocked: ☁️ Weather Watcher');
                updateMissionCounter();
            }
        });
    }

    if (closeBriefsButton) closeBriefsButton.addEventListener('click', () => missionBriefsPanel.classList.add('hidden'));
    if (closeScanButton) closeScanButton.addEventListener('click', () => scanResultPanel.classList.add('hidden'));
    if (closeDroneButton) closeDroneButton.addEventListener('click', () => droneResultPanel.classList.add('hidden'));
    if (closeWeatherButton) closeWeatherButton.addEventListener('click', () => weatherPanel.classList.add('hidden'));

    showScreen(titleScreen);
    addLogEntry('Explorer system initialized.');
});