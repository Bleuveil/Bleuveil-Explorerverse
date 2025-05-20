document.addEventListener('DOMContentLoaded', () => {
  const titleScreen = document.getElementById('title-screen');
  const briefingScreen = document.getElementById('mission-briefing-screen');
  const opsCenter = document.getElementById('mars-ops-center');

  const launchBtn = document.getElementById('launch-button');
  const startMissionBtn = document.getElementById('start-mission-button');

  function showScreen(screen) {
    titleScreen.classList.add('hidden');
    briefingScreen.classList.add('hidden');
    opsCenter.classList.add('hidden');
    screen.classList.remove('hidden');
  }

  launchBtn.addEventListener('click', () => {
    showScreen(briefingScreen);
  });

  startMissionBtn.addEventListener('click', () => {
    showScreen(opsCenter);
  });
});

function showOpsMessage(message) {
  alert("Ops Center: " + message);
}