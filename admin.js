document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const errorMsg = document.getElementById("loginError");

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("isAdminLoggedIn", "true");
    window.location.href = "admin-dashboard.html";
  } else {
    errorMsg.textContent = "Invalid credentials! Try admin / 1234.";
  }
});
