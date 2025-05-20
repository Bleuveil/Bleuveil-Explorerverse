document.addEventListener('DOMContentLoaded', () => {
    // Get references to all screens
    const titleScreen = document.getElementById('title-screen');
    const missionBriefingScreen = document.getElementById('mission-briefing-screen');
    const gameAreaScreen = document.getElementById('game-area-screen');
    const marsOpsScreen = document.getElementById('mars-ops-screen');

    // Get references to overlay panels
    const missionBriefsPanel = document.getElementById('mission-briefs-panel');
    const scanResultPanel = document.getElementById('scan-result-panel');
    const droneResultPanel = document.getElementById('drone-result-panel');

    // Get references to buttons
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

    // Get references to badges and logbook
    const badgeScan = document.getElementById('badge-scan');
    const badgeDrone = document.getElementById('badge-drone');
    const badgeBriefs = document.getElementById('badge-briefs');
    const logbook = document.getElementById('logbook');

    // Function to show a specific screen and hide others
    function showScreen(screenToShow) {
        // Hide all screens first
        titleScreen.classList.add('hidden');
        missionBriefingScreen.classList.add('hidden');
        gameAreaScreen.classList.add('hidden');
        marsOpsScreen.classList.add('hidden');

        // Then show the desired screen
        screenToShow.classList.remove('hidden');
    }

    // Function to add a logbook entry with timestamp
    function addLogEntry(message) {
        const now = new Date();
        const timestamp = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        const entry = document.createElement('div');
        entry.className = 'logbook-entry';
        entry.textContent = `[${timestamp}] ${message}`;
        logbook.appendChild(entry);
        logbook.scrollTop = logbook.scrollHeight; // Auto-scroll to bottom
    }

    // Event Listener for "Launch Mission" button
    if (launchButton) {
        launchButton.addEventListener('click', () => {
            showScreen(missionBriefingScreen);
            addLogEntry('Mission briefing accessed.');
        });
    }

    // Event Listener for "Start Mission" button
    if (startMissionButton) {
        startMissionButton.addEventListener('click', () => {
            showScreen(gameAreaScreen);
            addLogEntry('Explorer arrived on Mars.');
        });
    }

    // Event Listener for "Begin Simulation" button
    if (beginSimulationButton) {
        beginSimulationButton.addEventListener('click', () => {
            showScreen(marsOpsScreen);
            addLogEntry('Training module: UNDERWAY. Mission 1 will deploy soon!');
        });
    }

    // Event Listener for "Scan Terrain" button
    if (scanTerrainButton) {
        scanTerrainButton.addEventListener('click', () => {
            scanResultPanel.classList.remove('hidden');
            const discoveries = [
                'Rock formation detected: basalt, high iron oxide content.',
                'Soil sample collected: traces of perchlorates found.',
                'Crater rim detected: possible ancient water flow.'
            ];
            const discovery = discoveries[Math.floor(Math.random() * discoveries.length)];
            document.getElementById('scan-discovery').textContent = discovery;
            addLogEntry(`Terrain scan complete. ${discovery}`);

            // Unlock Scan Master badge after first scan
            if (badgeScan.classList.contains('locked')) {
                badgeScan.classList.remove('locked');
                badgeScan.classList.add('unlocked');
                badgeScan.textContent = '🌋 Scan Master';
                addLogEntry('Badge unlocked: Scan Master!');
            }
        });
    }

    // Event Listener for "Deploy Drone" button
    if (deployDroneButton) {
        deployDroneButton.addEventListener('click', () => {
            droneResultPanel.classList.remove('hidden');
            const countdownElement = document.getElementById('drone-countdown');
            let countdown = 3;
            countdownElement.textContent = `Launching in ${countdown}...`;
            const interval = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    countdownElement.textContent = `Launching in ${countdown}...`;
                } else {
                    clearInterval(interval);
                    countdownElement.textContent = 'Drone launched.';
                    document.getElementById('drone-log').textContent = 'Camera feed live.';
                }
            }, 1000);
            addLogEntry('Drone launched to Sector 13D. Awaiting results.');

            // Unlock Drone Pilot badge after first deployment
            if (badgeDrone.classList.contains('locked')) {
                badgeDrone.classList.remove('locked');
                badgeDrone.classList.add('unlocked');
                badgeDrone.textContent = '🚁 Drone Pilot';
                addLogEntry('Badge unlocked: Drone Pilot!');
            }
        });
    }

    // Event Listener for "View Mission Briefs" button
    if (viewBriefsButton) {
        viewBriefsButton.addEventListener('click', () => {
            missionBriefsPanel.classList.remove('hidden');
            addLogEntry('Mission briefs accessed.');

            // Unlock Mission Expert badge after first view
            if (badgeBriefs.classList.contains('locked')) {
                badgeBriefs.classList.remove('locked');
                badgeBriefs.classList.add('unlocked');
                badgeBriefs.textContent = '📜 Mission Expert';
                addLogEntry('Badge unlocked: Mission Expert!');
            }
        });
    }

    // Event Listener for "Recharge Suit" button
    if (rechargeSuitButton) {
        rechargeSuitButton.addEventListener('click', () => {
            addLogEntry('Suit recharge complete. Explorer is stable.');
            alert('Suit recharge complete! Ready for action.');
        });
    }

    // Event Listeners for closing panels
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

    // Initially show the title screen
    showScreen(titleScreen);
    addLogEntry('Explorer system initialized.');
});