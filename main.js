document.addEventListener('DOMContentLoaded', () => {
    // Get references to all screens
    const titleScreen = document.getElementById('title-screen');
    const missionBriefingScreen = document.getElementById('mission-briefing-screen');
    const gameAreaScreen = document.getElementById('game-area-screen');

    // Get references to the buttons
    const launchButton = document.getElementById('launch-button');
    const startMissionButton = document.getElementById('start-mission-button');

    // Function to show a specific screen and hide others
    function showScreen(screenToShow) {
        // Hide all screens first
        titleScreen.classList.add('hidden');
        missionBriefingScreen.classList.add('hidden');
        gameAreaScreen.classList.add('hidden');

        // Then show the desired screen
        screenToShow.classList.remove('hidden');
    }

    // Event Listener for the "Launch Mission" button (on the title screen)
    if (launchButton) {
        launchButton.addEventListener('click', () => {
            showScreen(missionBriefingScreen); // Go to the mission briefing
        });
    }

    // Event Listener for the "Start Mission" button (on the mission briefing screen)
    if (startMissionButton) {
        startMissionButton.addEventListener('click', () => {
            showScreen(gameAreaScreen); // Go to the game area
            console.log("Game started! Actual game logic will be loaded here.");
        });
    }

    // Initially show the title screen when the page loads
    showScreen(titleScreen);
});