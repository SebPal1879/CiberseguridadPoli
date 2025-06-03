document.querySelectorAll('.accordion-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('open');
  });
});

function loadQuizHistory() {
    const tableBody = document.getElementById('quiz-history-body');
    tableBody.innerHTML = '';

    quizHistoryData.forEach((entry) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${entry.user}</td>
        <td>${entry.score.toFixed(1)}</td>
        <td>${new Date(entry.attempt_date).toLocaleDateString()}</td>
        <td>${entry.quiz}</td>
      `;

      tableBody.appendChild(row);
    });
  }
