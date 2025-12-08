// Get API key
let API_KEY = localStorage.getItem("API_KEY") ?? prompt("Enter your API key:").trim();
localStorage.setItem("API_KEY", API_KEY);

/* Libary configuration */
marked.setOptions({ breaks: true });

/* Chat settings */
let chat = null;

// Set previous chat if available or set to null to create new chat
let previousChat = localStorage.getItem("previousChat") ?? null;

const defaultPrompt = {
  "role": "system",
  "content": "You are \"Nore\" an AI designed to teach students of the CBSE board from classes 1 to 12, under the NCERT syllabus.\nAlways reply in properly formatted perfect grammar parseable Markdown text. No need to use many Markdown features if not necessary for clarity of your message.\nPG, clean, supportive and friendly by default."
};

const model = "llama-3.3-70b-versatile";

/* UI components */
const textarea = document.querySelector("textarea");
const messagesDisplay = document.querySelector(".messages");

textarea.rows = 1;
textarea.addEventListener("keyup", (e) =>
  e.key === "Enter" && !e.shiftKey && sendMessage()
);
textarea.addEventListener("input", updateTextareaHeight);

function updateTextareaHeight () {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

/* Chat storage management */
const db = new Dexie("ChatDB");
db.version(1).stores( {chats: '++id, title'} );

// Load previous chat or create new one
Dexie.waitFor(loadOrCreateChat(previousChat));

async function loadOrCreateChat(id = null) {
  if (id == null) {
    // Create new chat
    const newId = await db.chats.add({ title: "New Chat", messages: [defaultPrompt] });
    previousChat = newId;
    chat = await db.chats.get(newId);
  } else {
    // Load chat
    previousChat = id;
    chat = await db.chats.get(id);
    if (!chat) return await loadOrCreateChat(null);
  }
  localStorage.setItem("previousChat", previousChat);
  renderChat();
  return chat;
}

// To be run whenever chat is updated
async function saveChat() {
  if (!chat) return;
  await db.chats.put(chat);
}

// Load message cards on starting a chat
function renderChat () {
  messagesDisplay.innerHTML = "";
  chat.messages.forEach(message => createMessageCard(message));
  messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
}

/* Sending messages and receiving reponses */

async function sendMessage () {
  const content = textarea.value;

  if (!content.trim() || !chat) return; // Return if invalid input

  // Update textarea
  textarea.value = "";
  textarea.style.height = "auto";

  await addMessage({role: "user", content});
  await getBotResponse();
}

async function getBotResponse () {
  // Create a temporary card to let the user know the bot is typing
  const tempCard = createMessageCard({role: "assistant", content: "..."});

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({model, messages: chat.messages}),
    });

    const botMessage = (await response.json()).choices[0].message;

    tempCard.remove();
    return await addMessage(botMessage);
  } catch (err) {
    console.log(err);
    tempCard.remove();
    return createMessageCard({role: "assistant", content: "Error fetching response."});
  }
}

// Add message to database
async function addMessage (message) {
  chat.messages.push(message);
  await saveChat();
  return createMessageCard(message);
}

// Create message card to display (does not add to database)
function createMessageCard (message) {
  const messageCard = document.createElement("div");
  messageCard.classList.add(message.role, "message");

  messageCard.innerHTML = renderMarkdown(message.content);

  messagesDisplay.appendChild(messageCard);
  messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
  return messageCard;
}

/* Miscellaneous code */
function renderMarkdown (text) {
  return DOMPurify.sanitize(marked.parse(text));
}