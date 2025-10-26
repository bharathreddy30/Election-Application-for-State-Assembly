const electionResults = JSON.parse(localStorage.getItem("electionResults")) || [];

function groupByState(results) {
  const grouped = {};
  results.forEach(r => {
    if (!grouped[r.state]) grouped[r.state] = {};
    if (!grouped[r.state][r.constituency]) grouped[r.state][r.constituency] = [];
    grouped[r.state][r.constituency].push({
      candidate: r.candidate,
      votes: Number(r.votes)
    });
  });
  return grouped;
}

const electionData = groupByState(electionResults);
const stateSelect = document.getElementById('stateSelect');
const constituencySelect = document.getElementById('constituencySelect');
const candidateList = document.getElementById('candidateList');
const constNameHeading = document.getElementById('constName');
const chartCanvas = document.getElementById('resultsChart');
let chartInstance;

// Populate states dropdown
Object.keys(electionData).forEach(state => {
  const opt = document.createElement('option');
  opt.value = state;
  opt.textContent = state;
  stateSelect.appendChild(opt);
});

stateSelect.addEventListener('change', function(){
  constituencySelect.innerHTML = '<option value="">--Select--</option>';
  candidateList.innerHTML = '';
  constNameHeading.textContent = 'Constituency: —';
  if (chartInstance) chartInstance.destroy();

  const selectedState = this.value;
  if (selectedState && electionData[selectedState]) {
    Object.keys(electionData[selectedState]).forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      constituencySelect.appendChild(opt);
    });
  }
});

constituencySelect.addEventListener('change', function(){
  const selectedState = stateSelect.value;
  const selectedConst = this.value;
  constNameHeading.textContent = `Constituency: ${selectedConst}`;
  candidateList.innerHTML = '';

  if (selectedState && selectedConst && electionData[selectedState][selectedConst]) {
    const list = electionData[selectedState][selectedConst];
    const labels = list.map(i => i.candidate);
    const votes = list.map(i => i.votes);

    list.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.candidate}: ${item.votes} votes`;
      candidateList.appendChild(li);
    });

    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Votes',
          data: votes,
          backgroundColor: '#119a0cff'
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }
});
