// Get the start button element
const startButton = document.getElementById('startButton');

// Add event listener to the start button
startButton.addEventListener('click', () => {
  // Go fullscreen
  document.documentElement.requestFullscreen();

  // Hide the start button
  startButton.style.display = 'none';

  // Play the music
  const audio = new Audio('music.mp3');
  audio.play();

  // Define the timeline
  const timeline = [
    { time: 00, singers: ['nelsonned', 'mariliamendonça'] },
    { time: 01, singers: [] },
    { time: 21.377, singers: ['mariliamendonça'] },
    { time: 23.305, singers: ['nelsonned', 'mariliamendonça'] },
    { time: 25.407, singers: ['mariliamendonça'] },
    { time: 28.561, singers: ['nelsonned'] },
    { time: 34.869, singers: [] },
    { time: 35.921, singers: ['nelsonned'] },
    { time: 42.053, singers: [] },
    { time: 43.630, singers: ['nelsonned'] },
    { time: 47.310, singers: ['nelsonned', 'mariliamendonça'] },
    { time: 50.114, singers: [] },
    { time: 52.041, singers: ['mariliamendonça'] },
    { time: '1:09.038', singers: ['nelsonned', 'mariliamendonça'] },
    { time: '1:13.769', singers: [] },
    { time: '1:14.294', singers: ['nelsonned', 'mariliamendonça'] },
    { time: '1:19.376', singers: [] },
    { time: '1:21.479', singers: ['mariliamendonça'] }
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
    const currentTime = audio.currentTime;

    // Find the timelineundefinedentry for the current time
    const currentEntry = timeline.find((entry) => {
      if (typeof entry.time === 'number') {
        // Handle entries with only seconds
        return Math.floor(entry.time) === Math.floor(currentTime);
      } else if (typeof entry.time === 'string') {
        if (entry.time.includes(':')) {
          // Handle entries with minutes and seconds
          const [minutes, seconds] = entry.time.split(':');
          const entryTime = parseInt(minutes) * 60 + parseInt(seconds);
          return Math.floor(entryTime) === Math.floor(currentTime);
        } else {
          // Handle entries with milliseconds
          return Math.floor(entry.time * 1000) === Math.floor(currentTime * 1000);
        }
      }
    });

    if (currentEntry) {
      updateActiveSingers(currentEntry.singers);
    }
  };

  // Add event listener to check the time and update the active singers
  audio.addEventListener('timeupdate', checkTimeAndUpdateSingers);
});
