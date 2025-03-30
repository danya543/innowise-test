document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "🌞" : "🌙";

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "🌞" : "🌙";

    localStorage.setItem("theme", newTheme);
  });
});
