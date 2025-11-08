/* GLOBAL REFERENCES */

const incompleteTasksDisplay = document.querySelector(".tasks.incomplete");
const completeTasksDisplay = document.querySelector(".tasks.complete");
const eventsDisplay = document.querySelector(".events");
const timersDisplay = document.querySelector(".timers");

// Add event listeners to elements

document.querySelectorAll("header button").forEach( (button) => {
  button.addEventListener("click", clearCardsList)
});

document.addEventListener("keyup", (e) => {
  if (e.key === "q") {
    createTask(
      "Finish English homework",
      "Due date: 31/11/2025",
      "Make sure to finish trigonometric equations",
    );
  }
  if (e.key === "e") {
    createEvent(
      "Science test at tuition",
      "Control And Coordination",
      "Thermodynamics",
      "Carbon And Its Compounds",
    );
  }
  if (e.key === "t") {
    createTimer("05:00", "Break");
  }
});

/* TASKS SECTION FUNCTIONS */

// Create task to add to display
function createTask (name, ...notes) {
  createCard("task", name, notes);
}

// Switch task between Incomplete and Complete tasks displays
function switchTask () {
  const task = this.closest(".task"); // Get task card from the button which was clicked

  // Swap this button's text between Complete and Incomplete
  this.textContent = (this.textContent === "Complete") ? "Incomplete" : "Complete";

  // Swap the task card's container based on what the button says
  this.textContent === "Complete"
  ? incompleteTasksDisplay.appendChild(task)
  : completeTasksDisplay.appendChild(task);
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

function createCard (type, nameOrTime, notes = null) {
  // Create card div and assign its type
  const card = document.createElement("div");
  card.classList.add("card", type);
  
  if (type === "task" || type === "event") {
    // Add heading
    const nameDisplay = document.createElement("h2");
    nameDisplay.textContent = nameOrTime;
    
    // Add list of notes
    const notesList = document.createElement("ul");
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note;
      notesList.appendChild(li);
    });

    const buttons = document.createElement("div");
  
    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => { removeCard(card) } );
    buttons.appendChild(deleteButton);
  
    // Add complete button if it's a task
    if (type === "task") {
      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.addEventListener("click", switchTask);
      buttons.appendChild(completeButton);
    }
      
    // Add all created elements to task card
    card.appendChild(nameDisplay);
    card.appendChild(notesList);
    card.appendChild(buttons);
  }
  else if (type === "timer") {
    // Add start button
    const startButton = document.createElement("button");
    startButton.textContent = "▶️";

    // Add content container
    const content = document.createElement("div");

    // Add time display
    const time = document.createElement("h2");
    time.textContent = nameOrTime;
    content.appendChild(time);

    // Add name display
    const span = document.createElement("span");
    span.textContent = notes;
    content.appendChild(span);

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❎";
    deleteButton.addEventListener("click", () => { removeCard(card) } );

    // Add everything to timer card
    card.appendChild(startButton);
    card.appendChild(content);
    card.appendChild(deleteButton);
  }

  // Identify appropriate display
  let display = null;
  switch (type) {
    case "task": display = incompleteTasksDisplay; break;
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