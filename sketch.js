import './style.css';
import p5 from 'p5';

// define a p5 sketch function
const p5Function = (p) => {
  // declare variables
  let time;
  let dateTime;
  const bg = "#EDD6C3";

  // set the initial title of the page to the current time
  document.title = `${p.hour().toString().padStart(2, '0')}:${p.minute().toString().padStart(2, '0')}`;

  // set up the p5 canvas
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(bg);
    // create a <p> element to display the time
    time = p.createP(timeString(false));
    time.style('color', '#0032FF');
    // create an <h1> element to display the full date and time
    dateTime = p.createElement('h1', displayTime(timeString(true)));
    // set the frame rate to 4 frames per second
    p.frameRate(4);
  }

  // draw loop
  p.draw = () => {
    p.background(bg);
    // update the time and date display
    time.html(timeString(false));
    dateTime.html(displayTime(timeString(true)));
    // adjust the font width based on the canvas dimensions
    const fontWidth = 350 * p.windowWidth / p.windowHeight;
    time.style('font-variation-settings', `'wdth' ${fontWidth}`);
  }

  // resize the canvas when the window is resized
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  // function to generate the time string with a blinking colon
  function timeString(isSmall) {
    return `${p.hour().toString().padStart(2, '0')}<span style='font-feature-settings: "aalt"; opacity: ${colonBlink(isSmall)};'>:</span>${p.minute().toString().padStart(2, '0')}`
  }

  // function to blink the colon in the time
  // if the second is even, the colon is opaque, otherwise it is transparent
  function colonBlink(isSmall) {
    if (p.second() % 2 === 0) {
      return "1";
    } else if (isSmall) {
      return "0.5";
    } else {
      return "0.8";
    }
  }
}

// create a new instance of p5 and pass in the sketch function
new p5(p5Function);

// function to generate the full date and time string
function displayTime(time) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  const dayOfWeek = daysOfWeek[now.getDay()];
  const monthOfYear = monthsOfYear[now.getMonth()];
  const dayOfMonth = now.getDate().toString();
  const ordinal = getOrdinalSuffix(dayOfMonth);
  const year = now.getFullYear();
  // return the full date and time string
  return `The time is ${time} on ${dayOfWeek} <span id="no-wrap">${monthOfYear} ${dayOfMonth}<span id="ordinal">${ordinal}</span></span>, ${year}`;
}

// function to get the ordinal suffix for a day of the month
function getOrdinalSuffix(day) {
  // array of suffixes for day of the month
  const suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
  // special case for days 11-13
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  // return the appropriate suffix based on the last digit of the day
  return suffixes[day % 10];
}

// function to update the page title with the current time
function updateTimeInTitle() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  // set the title to the current time in the format "HH:MM"
  document.title = `${hours}:${minutes}`;
}

// call the function to update the page title every second
setInterval(updateTimeInTitle, 1000);
