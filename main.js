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
      console.log("Launch button clicked");
      showScreen(missionBriefingScreen);
    });
  }

  if (startMissionButton) {
    startMissionButton.addEventListener('click', () => {
      console.log("Start Mission clicked");
      showScreen(gameAreaScreen);
    });
  }

  if (startSimulationButton) {
    startSimulationButton.addEventListener('click', () => {
      console.log("Simulation started!");
      alert("Training module: UNDERWAY.\nMission 1 will deploy soon!");
    });
  }

  showScreen(titleScreen);
});