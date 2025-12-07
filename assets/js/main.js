const navButtons = [...document.querySelectorAll(".nav-button")];
const pages = [...document.querySelectorAll(".page")];

navButtons.forEach((button, i) => {
  button.addEventListener("click", () => switchPage(i));
});

switchPage(localStorage.getItem('lastPage') ?? 0);

function switchPage (pageIndex) {
  pages.forEach(page => page.classList.add("hidden"));
  pages[pageIndex].classList.remove("hidden");
  document.title = ["Dashboard", "Chat", "Planner", "Mood", "Settings"][pageIndex];
  localStorage.setItem('lastPage', '' + pageIndex);
}