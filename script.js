/* GLOBAL REFERENCES */

const tasksDisplay = document.querySelector(".tasks");
const eventsDisplay = document.querySelector(".events");
const timersDisplay = document.querySelector(".timers");

// Add some default elements
for (let i = 0; i < 10; i++) {
  if (tasksDisplay) {
    createTask(
      "Finish English homework",
      "Due date: 31/11/2025",
      "Make sure to finish trigonometric equations",
    );
  }
  if (eventsDisplay) {
    createEvent(
      "Science test at tuition",
      "Control And Coordination",
      "Thermodynamics",
      "Carbon And Its Compounds",
    );
  }
  if (timersDisplay) {
    createTimer("05:00", "Break");
  }
}

// Add event listeners to elements
document.querySelectorAll("header button").forEach( (button) => {
  button.addEventListener("click", clearCardsList)
});

/* TASKS SECTION FUNCTIONS */

// Create task to add to display
function createTask (name, ...notes) {
  createCard("task", name, notes);
}

// Switch task between Incomplete and Complete tasks displays
function switchTask (task) {
  this.checked
  ? tasksDisplay.prepend(task)
  : tasksDisplay.appendChild(task);
}

/* EVENTS SECTION FUNCTIONS */

function createEvent (name, ...notes) {
  createCard("event", name, notes);
}

/* CLOCK SECTION FUNCTIONS */

function createTimer (time, name) {
  createCard("timer", time, name);
}

/* CARDS MANAGEMENT */

function createCard (type, name, notes = null) {
  // Create card div and assign its type
  const card = document.createElement("div");
  card.classList.add(type, "card");
  
  // Add content container
  const content = document.createElement("div");
  const buttons = document.createElement("div");
  
  // Add heading
  const nameDisplay = document.createElement("h2");
  nameDisplay.textContent = name;
  content.appendChild(nameDisplay);
  
  if (type === "task") {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", () => { switchTask(card) } );
    buttons.appendChild(checkbox);
  }
  
  if (type !== "timer") {
    // Add list of notes
    const notesList = document.createElement("ul");
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note;
      notesList.appendChild(li);
    });
    content.appendChild(notesList);
  }
  else {
    const note = document.createElement("span");
    note.textContent = notes;
    content.appendChild(note);

    // Add start button
    const start = document.createElement("button");
    start.textContent = "▶️";
    buttons.appendChild(start);
  }

  // Add delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "";
  deleteButton.addEventListener("click", () => { removeCard(card) } );
  buttons.appendChild(deleteButton);

  // Add everything to card
  card.appendChild(content);
  card.appendChild(buttons);

  let display = null;
  switch (type) {
    case "task": display = tasksDisplay; break;
    case "event": display = eventsDisplay; break;
    case "timer": display = timersDisplay; break;
  }

  // Add card to appropriate display
  display.appendChild(card);
}

function removeCard (card) {
  card.remove();
}

function clearCardsList () {
  this.closest("header").nextElementSibling.innerHTML = "";
}