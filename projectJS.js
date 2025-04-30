function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function generatePlan() {
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const goal = document.getElementById('userGoal').value.trim();

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const meals = {};
  days.forEach(day => {
    meals[day] = {
      breakfast: document.querySelector(`input[name="${day}_breakfast"]`).value.trim(),
      morningsnack:    document.querySelector(`input[name="${day}_morningsnack"]`).value.trim(),
      lunch:     document.querySelector(`input[name="${day}_lunch"]`).value.trim(),
      eveningsnack:    document.querySelector(`input[name="${day}_eveningsnack"]`).value.trim(),
      dinner:    document.querySelector(`input[name="${day}_dinner"]`).value.trim()
    };
  });

  const newWin = window.open('', '_blank');
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>My Weekly Meal Plan</title>
      <style>
        body { font-family: monospace; padding: 1em; }
        table { width: 100%; border-collapse: collapse; margin-top: 1em; }
        th, td { border: 1px solid #000000; padding: 0.5em; text-align: left; }
        th { background: #ddd; }
      </style>
    </head>
    <body>
      <h1>${name}'s Meal Plan</h1>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Weekly Goal:</strong> ${goal}</p>
      <table>
        <thead>
          <tr>
            <th>Day</th><th>Breakfast</th><th>Morning Snack</th><th>Lunch</th><th>Evening Snack</th><th>Dinner</th>
          </tr>
        </thead>
        <tbody>
  `;

  days.forEach(day => {
    const m = meals[day];
    html += `
      <tr>
        <td>${day}</td>
        <td>${m.breakfast}</td>
        <td>${m.morningsnack}</td>
        <td>${m.lunch}</td>
        <td>${m.eveningsnack}</td>
        <td>${m.dinner}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  newWin.document.write(html);
  newWin.document.close();
}

function clearPlanner() {
  document.querySelectorAll('#mealForm input[type="text"]').forEach(input => {
    input.value = '';
  });
}

function printPlanner() {
  window.print();
}

function downloadPlanner() {
  const name = document.getElementById('userName').value.trim() || 'Unnamed';
  const email = document.getElementById('userEmail').value.trim() || 'no-email';
  const goal = document.getElementById('userGoal').value.trim() || '—';

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  let content = `${name}'s Weekly Meal Plan\nEmail: ${email}\nGoal: ${goal}\n\n`;

  days.forEach(day => {
    const b = document.querySelector(`input[name="${day}_breakfast"]`).value.trim() || '—';
    const s1= document.querySelector(`input[name="${day}_morningsnack"]`).value.trim() || '—';
    const l = document.querySelector(`input[name="${day}_lunch"]`).value.trim() || '—';
    const s2= document.querySelector(`input[name="${day}_eveningsnack"]`).value.trim() || '—';
    const d = document.querySelector(`input[name="${day}_dinner"]`).value.trim() || '—';
    content += `${day}: Breakfast(${b}) • Morning Snack(${s1}) • Lunch(${l}) • Evening Snack(${s2}) • Dinner(${d})\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'meal_plan.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
