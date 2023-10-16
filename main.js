// Get the start button element
const startButton = document.getElementById('startButton');

// Add event listener to the start button
startButton.addEventListener('click', () => {
  // Go fullscreen
  document.documentElement.requestFullscreen();

  // Play the music
  const audio = new Audio('music.mp3');
  audio.play();

  // Define the timeline
  const timeline = [
    { time: 00, singers: ['nelsonned', 'mariliamendonça'] },
    { time: 01, singers: [] },
    { time: 21, singers: ['mariliamendonça'] },
    { time: 23, singers: ['nelsonned', 'mariliamendonça'] },
    { time: 25, singers: ['mariliamendonça'] },
    { time: 28, singers: ['nelsonned'] },
    { time: 35, singers: [] },
    { time: 36, singers: ['nelsonned'] },
    { time: 47, singers: ['nelsonned', 'mariliamendonça'] }
  ];

  // Function to update the active singers
  const updateActiveSingers = (activeSingers) => {
    const nelsonnedDiv = document.querySelector('.nelsonned');
    const mariliamendonçaDiv = document.querySelector('.mariliamendonça');

    // Remove active class from all singers
    nelsonnedDiv.classList.remove('active');
    mariliamendonçaDiv.classList.remove('active');

    // Add active class to the specified singers
    activeSingers.forEach((singer) => {
      if (singer === 'nelsonned') {
        nelsonnedDiv.classList.add('active');
      } else if (singer === 'mariliamendonça') {
        mariliamendonçaDiv.classList.add('active');
      }
    });
  };

  // Function to check the current time and update the active singers accordingly
  const checkTimeAndUpdateSingers = () => {
    const currentTime = Math.floor(audio.currentTime);

    // Find the timeline entry for the current time
    const currentEntry = timeline.find((entry) => entry.time === currentTime);

    if (currentEntry) {
      updateActiveSingers(currentEntry.singers);
    }
  };

  // Add event listener to check the time and update the active singers
  audio.addEventListener('timeupdate', checkTimeAndUpdateSingers);
});
