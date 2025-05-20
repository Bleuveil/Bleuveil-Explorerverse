document.addEventListener('DOMContentLoaded', () => {
    // Screens
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

    // Dashboard elements
    const missionCounter = document.getElementById('mission-counter');
    const badgeScan = document.getElementById('badge-scan');
    const badgeDrone = document.getElementById('badge-drone');
    const badgeBriefs = document.getElementById('badge-briefs');
    const roverText = document.getElementById('rover-text');
    const logbook = document.getElementById('logbook');

    // Mission tracking
    let completedMissions = 0;
    const totalMissions = 3;

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
        completedMissions++;
        missionCounter.textContent = `Missions Completed: ${completedMissions}/${totalMissions}`;
    }

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
            addLogEntry('R.O.V.E.R. activated. Ready to assist Explorer.');
            roverText.textContent = 'Welcome, Explorer! I’m R.O.V.E.R., your mission assistant.';
            setInterval(updateRoverMessage, 10000);
        });
    }

    if (scanTerrainButton) {
        scanTerrainButton.addEventListener('click', () => {
            scanResultPanel.classList.remove('hidden');
            const discoveries = [
                'Basalt rock formation detected.',
                'Soil sample collected: traces of perchlorates found.',
                'Crater rim detected: possible ancient water flow.'
            ];
            const result = discoveries[Math.floor(Math.random() * discoveries.length)];
            document.getElementById('scan-discovery').textContent = result;
            addLogEntry(`Terrain scan complete. ${result}`);

            if (badgeScan.classList.contains('locked')) {
                badgeScan.classList.remove('locked');
                badgeScan.classList.add('unlocked');
                badgeScan.textContent = '🌋 Scan Master';
                addLogEntry('Badge unlocked: Scan Master!');
                updateMissionCounter();
            }
        });
    }

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

            addLogEntry('Recon drone deployed to Sector 13D.');

            if (badgeDrone.classList.contains('locked')) {
                badgeDrone.classList.remove('locked');
                badgeDrone.classList.add('unlocked');
                badgeDrone.textContent = '🚁 Drone Pilot';
                addLogEntry('Badge unlocked: Drone Pilot!');
                updateMissionCounter();
            }
        });
    }

    if (viewBriefsButton) {
        viewBriefsButton.addEventListener('click', () => {
            missionBriefsPanel.classList.remove('hidden');
            addLogEntry('Mission briefs reviewed.');

            if (badgeBriefs.classList.contains('locked')) {
                badgeBriefs.classList.remove('locked');
                badgeBriefs.classList.add('unlocked');
                badgeBriefs.textContent = '📜 Mission Expert';
                addLogEntry('Badge unlocked: Mission Expert!');
                updateMissionCounter();
            }
        });
    }

    if (rechargeSuitButton) {
        rechargeSuitButton.addEventListener('click', () => {
            addLogEntry('Suit recharged. Explorer is stable.');
            alert('Suit recharge complete! Ready for action.');
        });
    }

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

    showScreen(titleScreen);
    addLogEntry('Explorer system initialized.');
});