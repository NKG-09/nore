[...document.querySelectorAll(".open-conversations")].forEach(button => {
  button.addEventListener("click", () => {
    [...document.querySelectorAll(".planner .conversations")].forEach(display =>
      display.classList.toggle("hidden")
    );
  });
});