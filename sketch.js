import './style.css'
import p5 from 'p5';

// p5
const p5Function = (p) => {
  let time;
  let img;
  let dateTime;
  const bg = "#EDD6C3";
  document.title = `${p.hour().toString().padStart(2, '0')}:${p.minute().toString().padStart(2, '0')}`;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(bg); //D74532
    time = p.createP(timeString(false));
    time.style('color', '#0032FF'); //#F19B38
    dateTime = p.createElement('h1', displayTime(timeString(true)));
    p.frameRate(4);
    console.log(p.select("p"));
    console.log(p.windowWidth);
  }

  p.draw = () => {
    p.background(bg); //D74532
    // p.image(img, 0, 0);
    time.html(timeString(false)); //:${pad(p.second(), 2)}
    dateTime.html(displayTime(timeString(true)));
    const fontWidth = 350 * p.windowWidth / p.windowHeight;
    time.style('font-variation-settings', `'wdth' ${fontWidth}`);
  }

  // resize the canvas when the window is resized
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

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

// create a new instance of p5 and pass in the function
new p5(p5Function);

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

function updateTimeInTitle() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.title = `${hours}:${minutes}`;
}

setInterval(updateTimeInTitle, 1000); // call the function every second to update the time
