const textarea = document.querySelector("textarea");
const messages = document.querySelector(".messages");

updateTextareaHeight();

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    sendMessage();
  }
});

textarea.addEventListener("input", updateTextareaHeight);

function updateTextareaHeight () {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

function sendMessage () {
  messages.appendChild(createMessageCard(textarea.value, false));

  updateTextareaHeight();
  getBotResponse();
  textarea.value = "";
  messages.scrollTop = messages.scrollHeight;
}

function getBotResponse () {
  messages.appendChild(createMessageCard("idk man dont ask me", true));
}

function createMessageCard (message, botMsg) {
  const messageCard = document.createElement("div");
  messageCard.classList.add("message");
  
  const msgDiv = document.createElement("div");
  msgDiv.classList.add((!botMsg ? "user-message" : "bot-message"));
  msgDiv.textContent = message;
  messageCard.appendChild(msgDiv);

  return messageCard;
}