document.addEventListener('DOMContentLoaded', () => {
  const titleScreen = document.getElementById('title-screen');
  const missionBriefingScreen = document.getElementById('mission-briefing-screen');
  const gameAreaScreen = document.getElementById('game-area-screen');

  const launchButton = document.getElementById('launch-button');
  const startMissionButton = document.getElementById('start-mission-button');

  function showScreen(screenToShow) {
    titleScreen.classList.add('hidden');
    missionBriefingScreen.classList.add('hidden');
    gameAreaScreen.classList.add('hidden');
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

  showScreen(titleScreen);
});