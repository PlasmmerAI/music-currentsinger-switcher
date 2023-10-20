// Get the start button element
const startButton = document.getElementById('startButton');

// Add event listener to the start button
startButton.addEventListener('click', () => {
  // Go fullscreen
  document.documentElement.requestFullscreen();

  // Hide the start button
  startButton.style.display = 'none';
  
  // Add a 5 seconds delay with a regressive counter div
  const delayDiv = document.createElement('div');
  delayDiv.style.position = 'absolute';
  delayDiv.style.top = '50%';
  delayDiv.style.left = '50%';
  delayDiv.style.transform = 'translate(-50%, -50%)';
  delayDiv.style.fontSize = '5rem';
  delayDiv.style.color = 'white';
  document.body.appendChild(delayDiv);

  let delay = 5;
  const delayInterval = setInterval(() => {
    delay--;
    delayDiv.textContent = delay;
    if (delay === 0) {
      clearInterval(delayInterval);
      delayDiv.style.display = 'none';
      // Execute a function to run the rest of the scripts (such as const timeline) and the music:
      afterdelayrun();
    }
  }, 1000);

function afterdelayrun() {
  // Define the timeline
  const timeline = [
    { time: 00, singers: ['singer1', 'singer2'] },
    { time: 01, singers: [] },
    { time: 13.117, singers: ['singer2'] },
    { time: '1:01.253', singers: ['singer1'] },
    { time: '1:02.781', singers: ['singer1', 'singer2'] },
    { time: '1:15.898', singers: [] },
    { time: '1:18.954', singers: ['singer1', 'singer2'] },
    { time: '1:23.029', singers: ['singer1'] },
    { time: '1:26.977', singers: ['singer2'] },
    { time: '1:34.108', singers: ['singer1', 'singer2'] },
    { time: '1:38.565', singers: ['singer2'] },
    { time: '2:17.024', singers: ['singer1', 'singer2'] },
    { time: '2:20.717', singers: ['singer1'] },
    { time: '2:23.391', singers: ['singer2'] },
    { time: '2:26.957', singers: ['singer1', 'singer2'] },
    { time: '2:32.178', singers: ['singer1'] },
    { time: '2:33.324', singers: ['singer1', 'singer2'] },
    { time: '2:38.163', singers: ['singer1'] },
    { time: '2:39.564', singers: ['singer1', 'singer2'] },
    { time: '2:41.601', singers: ['singer1'] },
    { time: '2:47.587', singers: ['singer2'] },
    { time: '2:54.336', singers: ['singer1', 'singer2'] },
    { time: '3:02.486', singers: ['singer2'] },
    { time: '3:06.052', singers: ['singer1', 'singer2'] },
    { time: '3:18.404', singers: [] },
    { time: '3:19.550', singers: ['singer2'] },
    { time: '3:23.371', singers: ['singer1', 'singer2'] },
    { time: '3:27.828', singers: ['singer2'] },
    { time: '3:31.775', singers: ['singer1', 'singer2'] },
    { time: '3:46.420', singers: ['singer2'] },
    { time: '4:00.046', singers: ['singer1', 'singer2'] },
    { time: '4:02.084', singers: ['singer1'] },
    { time: '4:03.102', singers: ['singer1', 'singer2'] },
    { time: '4:05.013', singers: ['singer1'] },
    { time: '4:08.196', singers: ['singer1', 'singer2'] },
    { time: '4:10.488', singers: ['singer2'] },
    { time: '4:12.399', singers: ['singer1'] },
    { time: '4:14.309', singers: ['singer1', 'singer2'] },
    { time: '4:16.346', singers: ['singer1'] },
    { time: '4:19.657', singers: ['singer1', 'singer2'] },
    { time: '4:21.313', singers: ['singer1'] },
    { time: '4:21.695', singers: ['singer1', 'singer2'] },
    { time: '4:24.496', singers: ['singer2'] },
    { time: '4:29.972', singers: ['singer1', 'singer2'] },
    { time: '4:31.373', singers: ['singer2'] },
    { time: '4:34.557', singers: ['singer1', 'singer2'] },
    { time: '4:47.037', singers: [] },
    { time: '4:48.183', singers: ['singer2'] },
    { time: '4:56.715', singers: [] }
  ];

  // Function to update the active singers
  const updateActiveSingers = (activeSingers) => {
    const singer1Div = document.querySelector('.singer1');
    const singer2Div = document.querySelector('.singer2');

    // Remove active class from all singers
    singer1Div.classList.remove('active');
    singer2Div.classList.remove('active');

    // Add active class to the specified singers
    activeSingers.forEach((singer) => {
      if (singer === 'singer1') {
        singer1Div.classList.add('active');
      } else if (singer === 'singer2') {
        singer2Div.classList.add('active');
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
  
  // Play the music
  const audio = new Audio('music.mp3');
  audio.play();

  // Add event listener to check the time and update the active singers
  audio.addEventListener('timeupdate', checkTimeAndUpdateSingers);
}
});
