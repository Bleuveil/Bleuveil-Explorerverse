// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', { scope: './' })
    .then(() => console.log("Service Worker Registered"))
    .catch((err) => console.error("Service Worker Registration Failed: ", err));
}

// App Logic
document.addEventListener("DOMContentLoaded", () => {
  const launchButton = document.getElementById("launch-button");
  const titleScreen = document.querySelector(".title-screen");
  const missionScreen = document.querySelector(".mission-screen");
  const missionText = document.getElementById("mission-text");

  // Simulate Mission Briefing
  const missionBriefing = [
    "Mission Objective: Establish Mars Base Alpha.",
    "Safety Check: Air quality nominal.",
    "Exploration Area: Quadrant 42B.",
    "Good luck, Explorer!"
  ];

  launchButton.addEventListener("click", () => {
    titleScreen.classList.add("hidden");
    missionScreen.classList.remove("hidden");

    let index = 0;
    const interval = setInterval(() => {
      if (index < missionBriefing.length) {
        missionText.innerHTML += `<p>${missionBriefing[index]}</p>`;
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
  });
});
