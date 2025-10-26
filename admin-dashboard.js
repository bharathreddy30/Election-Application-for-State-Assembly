const form = document.getElementById("resultForm");
const savedResults = document.getElementById("savedResults");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const state = document.getElementById("state").value.trim();
  const constituency = document.getElementById("constituency").value.trim();
  const candidate = document.getElementById("candidate").value.trim();
  const votes = document.getElementById("votes").value.trim();

  const result = { state, constituency, candidate, votes };

  const existing = JSON.parse(localStorage.getItem("electionResults")) || [];
  existing.push(result);
  localStorage.setItem("electionResults", JSON.stringify(existing));

  showSavedResults();
  form.reset();
});

function showSavedResults() {
  savedResults.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("electionResults")) || [];
  data.forEach((r, i) => {
    const li = document.createElement("li");
    li.textContent = `${r.state} - ${r.constituency}: ${r.candidate} (${r.votes} votes)`;
    savedResults.appendChild(li);
  });
}

showSavedResults();
