document.addEventListener('DOMContentLoaded', () => {
  const titleScreen = document.getElementById('title-screen');
  const missionBriefingScreen = document.getElementById('mission-briefing-screen');
  const gameAreaScreen = document.getElementById('game-area-screen');

  const launchButton = document.getElementById('launch-button');
  const startMissionButton = document.getElementById('start-mission-button');
  const startSimulationButton = document.getElementById('start-simulation-button');

  function showScreen(screenToShow) {
    [titleScreen, missionBriefingScreen, gameAreaScreen].forEach(screen => {
      screen.classList.add('hidden');
    });
    screenToShow.classList.remove('hidden');
  }

  if (launchButton) {
    launchButton.addEventListener('click', () => {
      showScreen(missionBriefingScreen);
    });
  }

  if (startMissionButton) {
    startMissionButton.addEventListener('click', () => {
      showScreen(gameAreaScreen);
    });
  }

  if (startSimulationButton) {
    startSimulationButton.addEventListener('click', () => {
      alert("Simulation starting soon!");
    });
  }

  showScreen(titleScreen);
});