/* GLOBAL REFERENCES */

const tasksDisplay = document.querySelector(".tasks");
const eventsDisplay = document.querySelector(".events");
const timersDisplay = document.querySelector(".timers");

// Add some default elements
if (tasksDisplay) {
  createTask(
    "Finish English homework", 
    "Due date: 31/11/2025",    
    "Complete the assigned reading on 'The Great Gatsby'.",
    "Write a 1-page summary of the key themes in the novel."
  );
  createTask(
    "Prepare for Math test", 
    "Due date: 05/12/2025",    
    "Review chapters 4-6 of Algebra and Geometry.",
    "Focus on solving quadratic equations and circle geometry problems."
  );
  createTask(
    "Write History essay", 
    "Due date: 02/12/2025",    
    "Research the causes of the French Revolution.",
    "Write a 2-page essay discussing the impact of the revolution on Europe."
  );
  createTask(
    "Complete Chemistry lab report", 
    "Due date: 03/12/2025",    
    "Write a report on the acid-base titration experiment.",
    "Include data analysis and conclusion based on your observations."
  );
  createTask(
    "Study for Biology quiz", 
    "Due date: 29/11/2025",    
    "Review notes on photosynthesis and cellular respiration.",
    "Prepare to answer questions on plant cell structure and function."
  );
  createTask(
    "Practice Spanish vocabulary", 
    "Due date: 01/12/2025",    
    "Go through 20 new vocabulary words and their meanings.",
    "Use each word in a sentence and review pronunciation."
  );
}

if (eventsDisplay) {
  createEvent(
    "Math test on Algebra",  
    "Algebra and Equations", 
    "Quadratic functions",
    "Polynomials"
  );
  createEvent(
    "History presentation on Ancient Rome", 
    "Roman Empire", 
    "Caesar and the Senate",
    "Roman culture and architecture"
  );
  createEvent(
    "Science project deadline",  
    "Physics: Laws of Motion", 
    "Force and acceleration",
    "Projectile motion experiment"
  );
  createEvent(
    "Chemistry quiz",  
    "Chemical Reactions", 
    "Balancing equations",
    "Types of chemical reactions"
  );
  createEvent(
    "Spanish oral exam",  
    "Spanish: Conversation Skills", 
    "Introduce yourself in Spanish",
    "Talk about your daily routine in Spanish"
  );
}

if (timersDisplay) {
  createTimer("05:00", "Take a short break"); 
  createTimer("25:00", "Pomodoro study session: Review math formulas");
  createTimer("15:00", "Flashcard review: Biology terms");
  createTimer("30:00", "Focus time: Write history essay");
  createTimer("10:00", "Quick Spanish vocabulary review");
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
function toggleTaskComplete (task) {
  task.classList.toggle("task-complete");
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
    const checkbox = document.createElement("button");
    checkbox.classList.add("task-checkbox");
    checkbox.addEventListener("click", () => { toggleTaskComplete(card) } );
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
    start.classList.add("start-button");
    buttons.appendChild(start);
  }

  // Add delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "";
  deleteButton.classList.add("delete-button");
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