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
  const message = createMessageCard(textarea.value, false);
  messages.appendChild(message);

  textarea.style.height = "auto";
  getBotResponse().scrollIntoView({ behavior: "smooth", block: "start" });
  textarea.value = "";
}

function getBotResponse () {
  const botMsg = createMessageCard("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu dui non metus semper ultricies vitae in magna. Integer vel diam et nunc pharetra tincidunt. Nulla pharetra justo vel vehicula finibus. Sed feugiat non ligula sed maximus. Cras vel ante vel sapien blandit pellentesque non nec nisi. Etiam vehicula commodo libero, quis rutrum lectus tristique at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur, velit eget commodo egestas, nisl felis porta metus, et elementum elit nunc ut nibh. Maecenas nulla lorem, venenatis vitae finibus non, sodales eu mauris. Proin ultricies arcu in erat lobortis, vitae bibendum enim viverra. Vestibulum vel ligula ac lectus mattis ullamcorper a ut lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus vehicula lacus non lorem imperdiet, in mattis purus cursus. Vivamus laoreet vehicula neque a dignissim. Praesent erat enim, pulvinar convallis molestie a, aliquet ac velit. Morbi fermentum mattis urna vel sagittis. Cras lacinia blandit mi, at vehicula lectus accumsan et. Cras sit amet vulputate elit. Vivamus ac viverra risus, id sagittis turpis. Duis ut vestibulum ex. Suspendisse consequat ex sit amet ipsum pellentesque, eget ultrices augue luctus. Vivamus placerat sit amet leo sit amet tincidunt. Mauris nec elit sit.", true);
  messages.appendChild(botMsg);
  return botMsg;
}

function createMessageCard (message, botMsg) {
  const messageCard = document.createElement("div");
  messageCard.classList.add((!botMsg ? "user-message" : "bot-message"));
  
  const para = document.createElement("p");
  para.textContent = message;
  messageCard.appendChild(para);

  return messageCard;
}