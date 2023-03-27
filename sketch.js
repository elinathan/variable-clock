import './style.css';

const bg = '#EDD6C3';
const timeColor = '#0032FF';

// Set the background color of the body
document.body.style.backgroundColor = bg;

// Create and add the time and date elements
const time = document.createElement('p');
time.style.color = timeColor;
document.body.appendChild(time);

const dateTime = document.createElement('h1');
document.body.appendChild(dateTime);

// Set the initial title of the page to the current time
updateTimeInTitle();

// Set the frame rate to 4 frames per second
const frameRate = 4;

function updateTime() {
  // Update the time and date display
  time.innerHTML = timeString(false);
  dateTime.innerHTML = displayTime(timeString(true));

  // Schedule the next time update
  setTimeout(updateTime, 1000 / frameRate);
}

function updateWidth() {
  // Adjust the font width based on the window dimensions
  const fontWidth = 350 * window.innerWidth / window.innerHeight;
  time.style.fontVariationSettings = `'wdth' ${fontWidth}`;

  // Schedule the next width update
  requestAnimationFrame(updateWidth);
}

// Start the update loops
updateTime();
updateWidth();

function timeString(isSmall) {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const colonBlink = colonBlinkOpacity(isSmall, now.getSeconds());

  return `${hours}<span style='font-feature-settings: "aalt"; opacity: ${colonBlink};'>:</span>${minutes}`;
}

function colonBlinkOpacity(isSmall, seconds) {
  if (seconds % 2 === 0) {
    return '1';
  } else if (isSmall) {
    return '0.5';
  } else {
    return '0.8';
  }
}

function displayTime(time) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  const dayOfWeek = daysOfWeek[now.getDay()];
  const monthOfYear = monthsOfYear[now.getMonth()];
  const dayOfMonth = now.getDate().toString();
  const ordinal = getOrdinalSuffix(dayOfMonth);
  const year = now.getFullYear();

  return `The time is ${time} on ${dayOfWeek} <span id="no-wrap">${monthOfYear} ${dayOfMonth}<span id="ordinal">${ordinal}</span></span>, ${year}`;
}

function getOrdinalSuffix(day) {
  const suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  return suffixes[day % 10];
}

// Update the page title
function updateTimeInTitle() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.title = `${hours}:${minutes}`;
}

// Call the function to update the page title every second
setInterval(updateTimeInTitle, 1000);

