/* GLOBAL REFERENCES */

const incompleteTasksDisplay = document.querySelector("#tasks .incomplete");
const completeTasksDisplay = document.querySelector("#tasks .complete");
const eventsDisplay = document.querySelector("#events .event-items");

// Add event listeners to elements

document.querySelectorAll("#tasks .heading button").forEach( (button) => { 
  button.addEventListener("click", (e) => {
    if (e.target.previousElementSibling.textContent === "Incomplete") { clearTasks(incompleteTasksDisplay); }
    if (e.target.previousElementSibling.textContent === "Complete") { clearTasks(completeTasksDisplay); }
  })
});

document.querySelector("#events .heading button").addEventListener("click", clearEvents);

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
});

/* TASKS SECTION FUNCTIONS */

// Create task to add to display
function createTask (headingText, ...paras) {
  const task = document.createElement("div");
  task.classList.add("task");
  
  // Add heading
  const heading = document.createElement("h2");
  heading.textContent = headingText;

  // Add paragraphs
  const paraList = document.createElement("ul");
  
  paras.forEach((para) => {
    const li = document.createElement("li");
    li.textContent = para;
    paraList.appendChild(li);
  });

  // Add buttons for delete and completion
  const buttonsContainer = document.createElement("div");

  // Delete
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => { removeTask(task) } );
  buttonsContainer.appendChild(deleteButton);

  // Complete
  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.addEventListener("click", switchTask);
  buttonsContainer.appendChild(completeButton);

  // Add all created elements to task card
  task.appendChild(heading);
  task.appendChild(paraList);
  task.appendChild(buttonsContainer);

  // Add task card to display
  incompleteTasksDisplay.appendChild(task);
}

// Switch task between Incomplete and Complete tasks displays
function switchTask (e) {
  const task = e.target.closest(".task"); // Get task card from the button which was clicked
  
  // Switch task card's display
  // Switch text of the switching button as appropriate
  if (task.parentElement === incompleteTasksDisplay) {
    task.querySelector("button:nth-child(2)").textContent = "Incomplete";
    completeTasksDisplay.appendChild(task);
  }
  else {
    task.querySelector("button:nth-child(2)").textContent = "Complete";
    incompleteTasksDisplay.appendChild(task);
  }
}

// Clear all tasks of a particular display
function clearTasks (tasksDisplay) {
  tasksDisplay.innerHTML = "";
}

// Remove a task
function removeTask (task) {
  task.remove();
}

/* EVENTS SECTION FUNCTIONS */

function createEvent (headingText, ...paras) {
  const event = document.createElement("div");
  event.classList.add("event");
  
  // Add heading
  const heading = document.createElement("h2");
  heading.textContent = headingText;

  // Add paragraphs
  const paraList = document.createElement("ul");
  
  paras.forEach((para) => {
    const li = document.createElement("li");
    li.textContent = para;
    paraList.appendChild(li);
  });

  // Add button for delete
  const buttonsContainer = document.createElement("div");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => { removeEvent(event) } );
  buttonsContainer.appendChild(deleteButton);

  // Add all created elements to task card
  event.appendChild(heading);
  event.appendChild(paraList);
  event.appendChild(buttonsContainer);

  // Add task card to display
  eventsDisplay.appendChild(event);
}

function clearEvents () {
  eventsDisplay.innerHTML = "";
}

function removeEvent (event) {
  event.remove();
}