const textarea = document.querySelector("textarea");
const messages = document.querySelector(".messages");

textarea.rows = 1;

// updateTextareaHeight();

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
  if (textarea.value.trim() === "") { return }

  const message = createMessageCard(textarea.value, false);
  messages.appendChild(message);

  textarea.style.height = "auto";
  getBotResponse().scrollIntoView({ behavior: "smooth", block: "start" });
  textarea.value = "";
}

function getBotResponse () {
  const botMessage = `
# Lorem Ipsum Markdown Example

## Introduction

Lorem ipsum dolor sit amet, **consectetur adipiscing elit**, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. *Ut enim ad minim veniam*, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  

> "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." – Lorem Ipsum

## Features

- **Bold text**: Lorem ipsum dolor sit amet, **bold text example**.
- *Italic text*: Sed do eiusmod tempor *italic text example*.
- \`Inline code\`: Excepteur sint occaecat cupidatat non proident, \`inline code example\`.
- [Links](https://example.com): Sunt in culpa qui officia deserunt mollit anim id est laborum.

## Nested Lists

1. First item
   - Subitem A
   - Subitem B
2. Second item
   - Subitem C
   - Subitem D

## Code Block

\`\`\`python
def lorem_ipsum(n):
    for i in range(n):
        print("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
  `;
  const botMsg = createMessageCard(botMessage, true);
  messages.appendChild(botMsg);
  return botMsg;
}

function createMessageCard (message, botMsg) {
  const messageCard = document.createElement("div");
  messageCard.classList.add((!botMsg ? "user-message" : "bot-message"));
  
  messageCard.innerHTML = renderMarkdown(message);

  return messageCard;
}

function renderMarkdown (text) {
  return DOMPurify.sanitize(marked.parse(text));
}