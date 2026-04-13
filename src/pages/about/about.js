import { gsap } from "../../lib/index";
import template from "./about.html?raw";
import ENTER from "../../animations/Enter";
import { initMarquee } from "../../marquee";

const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const SCHEDULE = {
  SUNDAY: [
    { time: "12AM -10AM", name: "RESTREAM" },
    { time: "10AM -2PM", name: "MORNING FOG W/ AOIFE" },
    { time: "2PM -6PM", name: "DRIFT W/ EOIN" },
    { time: "6PM -9PM", name: "BELOW DECK W/ CÁIT" },
    { time: "9PM -12AM", name: "WAREHOUSE W/ CIARÁN" },
  ],
  MONDAY: [
    { time: "12AM -10AM", name: "RESTREAM" },
    { time: "10AM -12PM", name: "MORNING FOG W/ AOIFE" },
    { time: "12PM -2PM", name: "CONCRETE W/ PADRAIG" },
    { time: "2PM -4PM", name: "HARBOUR FREIGHT W/ RÓNÁN" },
    { time: "4PM -6PM", name: "DEEP CUTS W/ SÍOMHA" },
    { time: "6PM -8PM", name: "BELOW DECK W/ CÁIT" },
    { time: "8PM -10PM", name: "LOW FREQUENCY W/ MAEDBH" },
    { time: "10PM -12AM", name: "WAREHOUSE W/ CIARÁN" },
  ],
  TUESDAY: [
    { time: "12AM -10AM", name: "RESTREAM" },
    { time: "10AM -1PM", name: "DRIFT W/ EOIN" },
    { time: "1PM -4PM", name: "HARBOUR FREIGHT W/ RÓNÁN" },
    { time: "4PM -7PM", name: "DEEP CUTS W/ SÍOMHA" },
    { time: "7PM -10PM", name: "CONCRETE W/ PADRAIG" },
    { time: "10PM -12AM", name: "LOW FREQUENCY W/ MAEDBH" },
  ],
  WEDNESDAY: [
    { time: "12AM -10AM", name: "RESTREAM" },
    { time: "10AM -1PM", name: "MORNING FOG W/ AOIFE" },
    { time: "1PM -4PM", name: "BELOW DECK W/ CÁIT" },
    { time: "4PM -7PM", name: "HARBOUR FREIGHT W/ RÓNÁN" },
    { time: "7PM -10PM", name: "WAREHOUSE W/ CIARÁN" },
    { time: "10PM -12AM", name: "DEEP CUTS W/ SÍOMHA" },
  ],
  THURSDAY: [
    { time: "12AM -10AM", name: "RESTREAM" },
    { time: "10AM -1PM", name: "DRIFT W/ EOIN" },
    { time: "1PM -4PM", name: "CONCRETE W/ PADRAIG" },
    { time: "4PM -7PM", name: "LOW FREQUENCY W/ MAEDBH" },
    { time: "7PM -10PM", name: "DEEP CUTS W/ SÍOMHA" },
    { time: "10PM -12AM", name: "BELOW DECK W/ CÁIT" },
  ],
  FRIDAY: [
    { time: "12AM -10AM", name: "RESTREAM" },
    { time: "10AM -2PM", name: "MORNING FOG W/ AOIFE" },
    { time: "2PM -6PM", name: "HARBOUR FREIGHT W/ RÓNÁN" },
    { time: "6PM -9PM", name: "DEEP CUTS W/ SÍOMHA" },
    { time: "9PM -12AM", name: "WAREHOUSE W/ CIARÁN" },
  ],
  SATURDAY: [
    { time: "12AM -10AM", name: "RESTREAM" },
    { time: "10AM -2PM", name: "DRIFT W/ EOIN" },
    { time: "2PM -5PM", name: "CONCRETE W/ PADRAIG" },
    { time: "5PM -8PM", name: "LOW FREQUENCY W/ MAEDBH" },
    { time: "8PM -11PM", name: "BELOW DECK W/ CÁIT" },
    { time: "11PM -12AM", name: "WAREHOUSE W/ CIARÁN" },
  ],
};

function buildDayHTML(dayName, animClass, lineClass) {
  const shows = SCHEDULE[dayName];
  let html = `
    <li class="schedule-header-row">
      <p class="${animClass}">${dayName}</p>
      <div class="lines"><div class="inner_lines ${lineClass}"></div></div>
    </li>`;

  shows.forEach((show) => {
    html += `
    <li>
      <p class="${animClass}">${show.time}</p>
      <p class="${animClass}">${show.name}</p>
      <div class="lines"><div class="inner_lines ${lineClass}"></div></div>
    </li>`;
  });

  return html;
}

function renderSchedule(container) {
  const colLeft =
    container?.querySelector("#schedule-col-left") ||
    document.querySelector("#schedule-col-left");
  const colRight =
    container?.querySelector("#schedule-col-right") ||
    document.querySelector("#schedule-col-right");
  if (!colLeft || !colRight) return;

  const todayIndex = new Date().getDay();
  const day1Index = (todayIndex + 1) % 7;
  const day2Index = (todayIndex + 2) % 7;

  colLeft.innerHTML = buildDayHTML(DAYS[day1Index], "anim_p", "inner_linesleft");
  colRight.innerHTML =
    buildDayHTML(DAYS[day2Index], "anim_p2", "inner_linesright");
}

export default function SchedulePage() {
  return template;
}

export function init(options = {}) {
  const container =
    options.container ||
    document.querySelector('[data-transition="container"]');

  renderSchedule(container);
  initMarquee(container);

  const enterData = ENTER(container, 0.32);

  if (enterData?.splitInstance) {
    container._splitInstance = enterData.splitInstance;
  }
}

export function cleanup() {
  const container = document.querySelector('[data-transition="container"]');

  if (container?._splitInstance) {
    const h1 = container.querySelector("h1");

    if (h1) {
      gsap.set(h1.querySelectorAll(".char-wrapper > *"), {
        clearProps: "all",
      });
    }

    container._splitInstance = null;

    if (h1) {
      const wrappers = h1.querySelectorAll(".char-wrapper");
      wrappers.forEach((wrapper) => {
        const char = wrapper.firstChild;
        wrapper.parentNode.insertBefore(char, wrapper);
      });
    }
  }
}
