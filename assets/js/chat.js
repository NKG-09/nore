let API_KEY = localStorage.getItem('API_KEY');

if (!API_KEY) {
  API_KEY = prompt("Enter your API key:").trim();
  localStorage.setItem('API_KEY', API_KEY);
}

marked.setOptions({ breaks: true });

const textarea = document.querySelector("textarea");
const messagesDisplay = document.querySelector(".messages");

const model = "llama-3.3-70b-versatile";
const messages = [
  {
    "role": "system",
    "content": "You are \"Nore\" an AI designed to teach students of the CBSE board from classes 1 to 12, under the NCERT syllabus.\nAlways reply in properly formatted perfect grammar parseable Markdown text. No need to use many Markdown features if not necessary for clarity of your message.\nPG, clean, supportive and friendly by default."
  }
];

let receivingMsg = false;

textarea.rows = 1;
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
  const userMsg = textarea.value;
  if (userMsg.trim() === "" || receivingMsg) { return }
  textarea.value = "";
  textarea.style.height = "auto";

  createMessageCard(userMsg, "user");
  receivingMsg = true;
  getBotResponse();
  receivingMsg = false;
}

async function getBotResponse () {
  const tempCard = createMessageCard("typing...", "assistant");
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    tempCard.remove();
    const botMessage = (await response.json()).choices[0].message.content;
    return createMessageCard(botMessage, "assistant");

  } catch (err) {
    console.log(err);
    tempCard.remove();
    return createMessageCard("Error fetching response.", "assistant");
  }
}

function createMessageCard (content, role) {
  const messageCard = document.createElement("div");
  messageCard.classList.add("message");
  messageCard.classList.add(role);
  
  messageCard.innerHTML = renderMarkdown(content);

  messagesDisplay.appendChild(messageCard);
  messages.push({role, content});

  return messageCard;
}

function renderMarkdown (text) {
  return DOMPurify.sanitize(marked.parse(text));
}