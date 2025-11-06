const incompleteTasksDisplay = document.querySelector("#tasks .incomplete");
const completeTasksDisplay = document.querySelector("#tasks .complete");

document.addEventListener("click", () => {
  createTask(
    "Finish English homework",
    "Due date: 31/11/2025",
    "Make sure to finish trigonometric equations",
  );
});

document.addEventListener("keyup", (e) => {
  if (e.key === "e" && incompleteTasksDisplay.childNodes.length) {
    switchTask([...incompleteTasksDisplay.childNodes].at(0));
  }
  if (e.key === "r" && completeTasksDisplay.childNodes.length) {
    switchTask([...completeTasksDisplay.childNodes].at(0));
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