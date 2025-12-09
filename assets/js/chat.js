// Get API key
let API_KEY = localStorage.getItem("API_KEY") ?? prompt("Enter your API key:").trim();
localStorage.setItem("API_KEY", API_KEY);

/* Libary configuration */
marked.setOptions({ breaks: true });

/* Chat settings */
let userMsg = "";

const messages = [];
const defaultPrompt = {
  "role": "system",
  "content": "You are \"Nore\" an AI designed to teach students of the CBSE board from classes 1 to 12, under the NCERT syllabus.\nAlways reply in properly formatted perfect grammar parseable Markdown text. No need to use many Markdown features if not necessary for clarity of your message.\nPG, clean, supportive and friendly by default."
};
const model = "llama-3.3-70b-versatile";

/* UI components */
const textareas = [...document.querySelectorAll("textarea")];
const messagesDisplays = [...document.querySelectorAll(".messages")];

textareas.forEach(textarea => {
  textarea.rows = 1;
  textarea.addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
    }
  });
  textarea.addEventListener("input", (e) => {
    userMsg = e.target.value;
    updateAllTextareas();
  });
});

function updateAllTextareas () {
  let previousHeight = null;
  textareas.forEach(textarea => {
    textarea.value = userMsg;
    textarea.style.height = "auto";
    if (textarea.scrollHeight) previousHeight = textarea.scrollHeight;
  });
  textareas.forEach(textarea => {textarea.style.height = previousHeight + "px"});
}

/* Sending messages and receiving reponses */
function addMessage(message) {
  messages.push(message);
  createMessageCard(message);
}


function createMessageCard (message) {
  const cards = [];
  messagesDisplays.forEach(messagesDisplay => {
    const messageCard = document.createElement("div");
    messageCard.classList.add(message.role, "message");

    messageCard.innerHTML = renderMarkdown(message.content);

    messagesDisplay.appendChild(messageCard);
    messagesDisplay.scrollTop = messagesDisplay.scrollHeight;

    cards.push(messageCard);
  });
  return cards;
}

async function sendMessage () {
  const content = userMsg;

  if (!content.trim() || !messages) return; // Return if invalid input

  // Update textareas
  textareas.forEach(textarea => {
    textarea.value = "";
    textarea.style.height = "auto";
  });

  addMessage({role: "user", content});
  await getBotResponse();
}

async function getBotResponse () {
  // Create a temporary card to let the user know the bot is typing
  const tempCards = createMessageCard({role: "assistant", content: "..."});

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({model, messages: [defaultPrompt, ...messages]}),
    });

    const botMessage = (await response.json()).choices[0].message;

    tempCards.forEach(tempCard => tempCard.remove());
    await addMessage(botMessage);
  } catch (err) {
    console.log(err);
    tempCards.forEach(tempCard => tempCard.remove());
    createMessageCard({role: "assistant", content: "Error fetching response."});
  }
}

/* Miscellaneous code */
function renderMarkdown (text) {
  return DOMPurify.sanitize(marked.parse(text));
}