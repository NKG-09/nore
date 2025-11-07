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

document.addEventListener("keyup", (e) => {
  if (e.key === "w" && incompleteTasksDisplay.childNodes.length) {
    switchTask([...incompleteTasksDisplay.childNodes].at(0));
  }
  if (e.key === "e" && completeTasksDisplay.childNodes.length) {
    switchTask([...completeTasksDisplay.childNodes].at(0));
  }
  if (e.key === "r" && incompleteTasksDisplay.childNodes.length) {
    removeTask([...incompleteTasksDisplay.childNodes].at(0));
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

  task.appendChild(heading);
  task.appendChild(paraList);

  incompleteTasksDisplay.appendChild(task);
}

function switchTask (task) {
  if (task.parentElement === incompleteTasksDisplay) {
    completeTasksDisplay.appendChild(task);
  }
  else {
    incompleteTasksDisplay.appendChild(task);
  }
}

function clearTasks (tasksDisplay) {
  tasksDisplay.innerHTML = "";
}

function removeTask (task) {
  task.remove();
}