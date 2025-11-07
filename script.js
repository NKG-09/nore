// References for each section

const incompleteTasksDisplay = document.querySelector("#tasks .incomplete");
const completeTasksDisplay = document.querySelector("#tasks .complete");

// Add event listeners to elements

document.querySelectorAll("#tasks .heading button").forEach( (button) => { 
  button.addEventListener("click", (e) => {
    if (e.target.previousElementSibling.textContent === "Incomplete") { clearTasks(incompleteTasksDisplay); }
    if (e.target.previousElementSibling.textContent === "Complete") { clearTasks(completeTasksDisplay); }
  })
});

document.addEventListener("keyup", (e) => {
  if (e.key === "q") {
    createTask(
      "Finish English homework",
      "Due date: 31/11/2025",
      "Make sure to finish trigonometric equations",
    );
  }
});

function createTask (headingText, ...paras) {
  const task = document.createElement("div");
  task.classList.add("task");
  
  const heading = document.createElement("h2");
  heading.textContent = headingText;

  const paraList = document.createElement("ul");
  
  paras.forEach((para) => {
    const li = document.createElement("li");
    li.textContent = para;
    paraList.appendChild(li);
  });

  const buttonsContainer = document.createElement("div");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => { removeTask(task) } );
  buttonsContainer.appendChild(deleteButton);

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.addEventListener("click", switchTask);
  buttonsContainer.appendChild(completeButton);

  task.appendChild(heading);
  task.appendChild(paraList);
  task.appendChild(buttonsContainer);

  incompleteTasksDisplay.appendChild(task);
}

function switchTask (e) {
  const task = e.target.closest(".task");
  if (task.parentElement === incompleteTasksDisplay) {
    task.querySelector("button:nth-child(2)").textContent = "Incomplete";
    completeTasksDisplay.appendChild(task);
  }
  else {
    task.querySelector("button:nth-child(2)").textContent = "Complete";
    incompleteTasksDisplay.appendChild(task);
  }
}

function clearTasks (tasksDisplay) {
  tasksDisplay.innerHTML = "";
}

function removeTask (task) {
  task.remove();
}