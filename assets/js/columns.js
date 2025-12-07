const tasksDisplays = [...document.querySelectorAll(".tasks")];
const eventsDisplays = [...document.querySelectorAll(".events")];
const timersDisplays = [...document.querySelectorAll(".timers")];

let tasks = [];
let events = [];
let timers = [];

renderData();

function renderData () {
  tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
  events = JSON.parse(localStorage.getItem('events')) ?? [];
  timers = JSON.parse(localStorage.getItem('timers')) ?? [];

  tasks.forEach((task) => createCard(task));
  events.forEach((event) => createCard(event));
  timers.forEach((timer) => createCard(timer));
}

function saveData () {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('events', JSON.stringify(events));
  localStorage.setItem('timers', JSON.stringify(timers));
}

function clearColumn (type) {
  const arr = {
    "task": tasks,
    "event": events,
    "timers": timers,
  }[type];
  arr.length = 0;
  renderData();
}

/* TASKS SECTION FUNCTIONS */

// Create task to add to display
function createTask (name, complete, ...notes) {
  const task = {type:"task", name, complete, notes};
  createCard(task);
  tasks.push(task);
  saveData();
}

// Switch task between Incomplete and Complete tasks displays
function toggleTaskComplete (task, data) {
  task.classList.toggle("task-complete");
  data.complete = !data.complete;
  saveData();
}

/* EVENTS SECTION FUNCTIONS */

function createEvent (name, ...notes) {
  const event = {type:"event", name, notes};
  createCard(event);
  events.push(event);
  saveData();
}

/* CLOCK SECTION FUNCTIONS */

function createTimer (time, name) {
  const timer = {type:"timer", time, name};
  createCard(timer);
  timers.push(timer);
  saveData();
}

/* CARDS MANAGEMENT */

function createCard (data) {
  // Create card div and assign its type
  const card = document.createElement("div");
  card.classList.add(data.type, "card");  
  
  // Add content container
  const content = document.createElement("div");
  content.innerHTML = DOMPurify.sanitize(
    data.type === "timer"
    ? `<h2>${data.time}</h2>` + `<span>${data.name}</span>`
    : `<h2>${data.name}</h2>` + data.notes.map(note => `<p>${note}</p>`).join('')
  );

  const buttons = document.createElement("div");
  
  if (data.type === "task") {
    // Add checkbox
    const checkbox = document.createElement("button");
    checkbox.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.4933 6.93502C18.8053 7.20743 18.8374 7.68122 18.565 7.99325L10.7079 16.9933C10.5654 17.1564 10.3594 17.25 10.1429 17.25C9.9263 17.25 9.72031 17.1564 9.57788 16.9933L6.43502 13.3933C6.16261 13.0812 6.19473 12.6074 6.50677 12.335C6.8188 12.0626 7.29259 12.0947 7.565 12.4068L10.1429 15.3596L17.435 7.00677C17.7074 6.69473 18.1812 6.66261 18.4933 6.93502Z" fill="#ffffff"/>
      </svg>
    `;
    checkbox.classList.add("task-checkbox");
    checkbox.addEventListener("click", () => { toggleTaskComplete(card, data) } );
    buttons.appendChild(checkbox);
    if (data.complete) { card.classList.add("task-complete"); }
  }
  
  if (data.type === "timer") {
    // Add start button
    const start = document.createElement("button");
    start.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.23832 3.04445C5.65196 2.1818 3.75 3.31957 3.75 5.03299L3.75 18.9672C3.75 20.6806 5.65196 21.8184 7.23832 20.9557L20.0503 13.9886C21.6499 13.1188 21.6499 10.8814 20.0503 10.0116L7.23832 3.04445ZM2.25 5.03299C2.25 2.12798 5.41674 0.346438 7.95491 1.72669L20.7669 8.6938C23.411 10.1317 23.411 13.8685 20.7669 15.3064L7.95491 22.2735C5.41674 23.6537 2.25 21.8722 2.25 18.9672L2.25 5.03299Z" fill="#ffffff"/>
      </svg>
    `;
    start.classList.add("start-button");
    buttons.appendChild(start);
  }

  // Add delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3094 2.25002H13.6908C13.9072 2.24988 14.0957 2.24976 14.2737 2.27819C14.977 2.39049 15.5856 2.82915 15.9146 3.46084C15.9978 3.62073 16.0573 3.79961 16.1256 4.00494L16.2373 4.33984C16.2562 4.39653 16.2616 4.41258 16.2661 4.42522C16.4413 4.90933 16.8953 5.23659 17.4099 5.24964C17.4235 5.24998 17.44 5.25004 17.5001 5.25004H20.5001C20.9143 5.25004 21.2501 5.58582 21.2501 6.00004C21.2501 6.41425 20.9143 6.75004 20.5001 6.75004H3.5C3.08579 6.75004 2.75 6.41425 2.75 6.00004C2.75 5.58582 3.08579 5.25004 3.5 5.25004H6.50008C6.56013 5.25004 6.5767 5.24998 6.59023 5.24964C7.10488 5.23659 7.55891 4.90936 7.73402 4.42524C7.73863 4.41251 7.74392 4.39681 7.76291 4.33984L7.87452 4.00496C7.94281 3.79964 8.00233 3.62073 8.08559 3.46084C8.41453 2.82915 9.02313 2.39049 9.72643 2.27819C9.90445 2.24976 10.093 2.24988 10.3094 2.25002ZM9.00815 5.25004C9.05966 5.14902 9.10531 5.04404 9.14458 4.93548C9.1565 4.90251 9.1682 4.86742 9.18322 4.82234L9.28302 4.52292C9.37419 4.24941 9.39519 4.19363 9.41601 4.15364C9.52566 3.94307 9.72853 3.79686 9.96296 3.75942C10.0075 3.75231 10.067 3.75004 10.3553 3.75004H13.6448C13.9331 3.75004 13.9927 3.75231 14.0372 3.75942C14.2716 3.79686 14.4745 3.94307 14.5842 4.15364C14.605 4.19363 14.626 4.2494 14.7171 4.52292L14.8169 4.82216L14.8556 4.9355C14.8949 5.04405 14.9405 5.14902 14.992 5.25004H9.00815Z" fill="#ffffff"/>
      <path d="M5.91509 8.45015C5.88754 8.03685 5.53016 7.72415 5.11686 7.7517C4.70357 7.77925 4.39086 8.13663 4.41841 8.54993L4.88186 15.5017C4.96736 16.7844 5.03642 17.8205 5.19839 18.6336C5.36679 19.4789 5.65321 20.185 6.2448 20.7385C6.8364 21.2919 7.55995 21.5308 8.4146 21.6425C9.23662 21.7501 10.275 21.7501 11.5606 21.75H12.4395C13.7251 21.7501 14.7635 21.7501 15.5856 21.6425C16.4402 21.5308 17.1638 21.2919 17.7554 20.7385C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9638 17.8206 19.0328 16.7844 19.1183 15.5017L19.5818 8.54993C19.6093 8.13663 19.2966 7.77925 18.8833 7.7517C18.47 7.72415 18.1126 8.03685 18.0851 8.45015L17.6251 15.3493C17.5353 16.6971 17.4713 17.6349 17.3307 18.3406C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8989 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8989 7.26958 19.6431C6.99617 19.3873 6.80583 19.025 6.66948 18.3406C6.52892 17.6349 6.46489 16.6971 6.37503 15.3493L5.91509 8.45015Z" fill="#ffffff"/>
      <path d="M9.42546 10.2538C9.83762 10.2125 10.2052 10.5133 10.2464 10.9254L10.7464 15.9254C10.7876 16.3376 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29503 16.4868 9.25381 16.0747L8.75381 11.0747C8.7126 10.6625 9.01331 10.295 9.42546 10.2538Z" fill="#ffffff"/>
      <path d="M14.5747 10.2538C14.9869 10.295 15.2876 10.6625 15.2464 11.0747L14.7464 16.0747C14.7052 16.4868 14.3376 16.7875 13.9255 16.7463C13.5133 16.7051 13.2126 16.3376 13.2538 15.9254L13.7538 10.9254C13.795 10.5133 14.1626 10.2125 14.5747 10.2538Z" fill="#ffffff"/>
    </svg>
  `;
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => { removeCard(card, data) } );
  buttons.appendChild(deleteButton);

  // Add everything to card
  card.appendChild(content);
  buttons.childNodes.forEach(button => button.classList.add("circle-button"));
  card.appendChild(buttons);

  let displays = null;
  switch (data.type) {
    case "task": displays = tasksDisplays; break;
    case "event": displays = eventsDisplays; break;
    case "timer": displays = timersDisplays; break;
  }

  // Add card to appropriate display
  displays.forEach(display => display.appendChild(card));
}

function removeCard (card, data) {
  const arr = {
    "task": tasks,
    "event": events,
    "timer": timers,
  }[data.type];
  const index = arr.findIndex(item => item == data);
  arr.splice(index, 1);
  card.remove();
  saveData();
}