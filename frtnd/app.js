// Simple emission factors
const emissionFactors = {
  commute: {
    car: 0.21,        // kg CO₂/km
    bus: 0.1,
    train: 0.07,
    plane: 0.25
  },
  food: {
    beef: 3,
    chicken: 1.2,
    fish: 1,
    vegetables: 0.1,
    dairy: 0.5
  },
  electricity: {
    grid: 0.6,        // kg CO₂/kWh
    renewable: 0.1,
    solar: 0.05
  }
};

// Track emissions per day
let emissionsHistory = [];
const ctx = document.getElementById('emissionsChart').getContext('2d');
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'CO₂e (kg) per entry',
      data: [],
      fill: true,
      borderColor: 'rgba(102,126,234,1)',
      backgroundColor: 'rgba(102,126,234,0.1)'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

document.getElementById('activityForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Gather inputs
  const commute = parseFloat(document.getElementById('commute').value) || 0;
  const commuteType = document.getElementById('commuteType').value;
  const food = parseFloat(document.getElementById('food').value) || 0;
  const foodType = document.getElementById('foodType').value;
  const electricity = parseFloat(document.getElementById('electricity').value) || 0;
  const electricityType = document.getElementById('electricityType').value;

  // Calculate emissions
  let commuteCO2 = commute * emissionFactors.commute[commuteType];
  let foodCO2 = food * emissionFactors.food[foodType];
  let elecCO2 = electricity * emissionFactors.electricity[electricityType];
  let totalCO2 = commuteCO2 + foodCO2 + elecCO2;

  // Save to history and update UI
  const today = new Date().toLocaleDateString();
  emissionsHistory.push({date: today, emissions: totalCO2});
  document.getElementById('emissionsTotal').textContent = totalCO2.toFixed(2);

  // Update chart
  chart.data.labels.push(today + ' #' + emissionsHistory.length);
  chart.data.datasets[0].data.push(totalCO2);
  chart.update();

  // Reset form
  this.reset();
});



