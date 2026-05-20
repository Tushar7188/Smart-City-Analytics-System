// Initialize Lucide Icons
lucide.createIcons();

// Data Configuration
const colors = {
  cyan: '#00d4ff',
  mint: '#00ffb0',
  red: '#ff4d6d',
  amber: '#ffb830',
  violet: '#7c6fff',
  bgDark: '#05080f',
  glowBorder: 'rgba(0, 212, 255, 0.12)',
  textMuted: '#94a3b8'
};

Chart.defaults.color = colors.textMuted;
Chart.defaults.font.family = "'DM Mono', monospace";

// Initialize 24-hour Activity Chart (Multi-line)
const ctxActivity = document.getElementById('activityChart').getContext('2d');
const activityChart = new Chart(ctxActivity, {
  type: 'line',
  data: {
    labels: Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`),
    datasets: [
      {
        label: 'Traffic Volume',
        data: Array.from({length: 24}, () => Math.floor(Math.random() * 100) + 20),
        borderColor: colors.cyan,
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0
      },
      {
        label: 'Power Grid Load',
        data: Array.from({length: 24}, () => Math.floor(Math.random() * 60) + 40),
        borderColor: colors.violet,
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', align: 'end' }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' } }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    }
  }
});

// Initialize Pollution Bar Chart
const ctxPollution = document.getElementById('pollutionChart').getContext('2d');
const pollutionChart = new Chart(ctxPollution, {
  type: 'bar',
  data: {
    labels: ['North', 'South', 'East', 'West', 'Central'],
    datasets: [{
      label: 'AQI Level',
      data: [35, 82, 45, 28, 112],
      backgroundColor: [
        colors.mint, colors.amber, colors.mint, colors.mint, colors.red
      ],
      borderWidth: 0,
      borderRadius: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  }
});

// Mock Ticker Data
const tickerItems = [
  "SYS_MSG: GRID STABLE //",
  "TRAFFIC_ALERT: CONGESTION ON SECTOR 4 //",
  "AQI_UPDATE: CITY WIDE AVERAGE 42 (GOOD) //",
  "POWER_LOG: SUBSTATION 9 OPERATING AT 92% CAPACITY //",
  "CRITICAL_INCIDENT: FIRE REPORTED IN WAREHOUSE DISTRICT //"
];

const tickerContainer = document.getElementById('data-ticker');
// Double the items for seamless scrolling
const allTickerItems = [...tickerItems, ...tickerItems].map(text => {
  return `<span class="ticker-item"><i data-lucide="radio"></i> ${text}</span>`;
}).join('');
tickerContainer.innerHTML = allTickerItems;
lucide.createIcons(); // Re-init icons inside ticker

// Mock Alert Feed
const alerts = [
  { time: '10:42', msg: 'High congestion detected on Main St.', severity: 'amber' },
  { time: '10:15', msg: 'Power node 3 offline for maintenance.', severity: 'violet' },
  { time: '09:55', msg: 'Air quality degradation in East Zone.', severity: 'amber' },
  { time: '09:30', msg: 'Unidentified vehicle cluster at Port.', severity: 'red' },
];

const alertContainer = document.getElementById('alerts-container');
alerts.forEach(alert => {
  const el = document.createElement('div');
  el.className = `alert-item border-${alert.severity}`;
  el.innerHTML = `
    <div class="alert-header">
      <span class="alert-time">${alert.time}</span>
      <span class="${alert.severity}">[${alert.severity.toUpperCase()}]</span>
    </div>
    <div class="alert-msg">${alert.msg}</div>
  `;
  alertContainer.appendChild(el);
});

// Mock Complaints
const complaints = [
  { category: 'Potholes', value: 75 },
  { category: 'Noise', value: 45 },
  { category: 'Sanitation', value: 30 },
];
const complaintContainer = document.getElementById('complaints-container');
complaints.forEach(comp => {
  const el = document.createElement('div');
  el.className = 'complaint-row';
  el.innerHTML = `
    <span style="width: 80px">${comp.category}</span>
    <div class="comp-bar-container">
      <div class="comp-bar" style="width: ${comp.value}%"></div>
    </div>
    <span>${comp.value}</span>
  `;
  complaintContainer.appendChild(el);
});

// Mock Utilities
const nodes = [
  { id: 'N-01', status: 90 },
  { id: 'N-02', status: 45 },
  { id: 'N-03', status: 12 },
  { id: 'N-04', status: 98 },
];
const utilsContainer = document.getElementById('utility-nodes');
nodes.forEach(node => {
  let color = colors.mint;
  if (node.status > 85) color = colors.red;
  else if (node.status > 70) color = colors.amber;

  const el = document.createElement('div');
  el.className = 'node';
  el.innerHTML = `
    <span class="node-label">${node.id}</span>
    <div class="node-status">
      <div class="node-bar" style="width: ${node.status}%; background-color: ${color}"></div>
    </div>
  `;
  utilsContainer.appendChild(el);
});

// Mock Drill-Down Data
const mockData = {
  overview: {
    traffic: Array.from({length: 24}, () => Math.floor(Math.random() * 100) + 20),
    power: Array.from({length: 24}, () => Math.floor(Math.random() * 60) + 40),
    pollution: [35, 82, 45, 28, 112]
  },
  traffic: {
    traffic: Array.from({length: 24}, () => Math.floor(Math.random() * 150) + 80),
    power: Array.from({length: 24}, () => Math.floor(Math.random() * 40) + 30),
    pollution: [65, 42, 85, 38, 92]
  },
  environment: {
    traffic: Array.from({length: 24}, () => Math.floor(Math.random() * 60) + 20),
    power: Array.from({length: 24}, () => Math.floor(Math.random() * 50) + 20),
    pollution: [15, 32, 25, 18, 52]
  },
  utilities: {
    traffic: Array.from({length: 24}, () => Math.floor(Math.random() * 80) + 40),
    power: Array.from({length: 24}, () => Math.floor(Math.random() * 90) + 60),
    pollution: [25, 42, 35, 48, 62]
  },
  critical: {
    traffic: Array.from({length: 24}, () => Math.floor(Math.random() * 120) + 50),
    power: Array.from({length: 24}, () => Math.floor(Math.random() * 80) + 50),
    pollution: [85, 92, 75, 68, 122]
  }
};

// Interactive Elements Setup
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    
    const target = e.target.dataset.target;
    
    // Drill-down logic to update charts
    if (mockData[target]) {
      activityChart.data.datasets[0].data = mockData[target].traffic;
      activityChart.data.datasets[1].data = mockData[target].power;
      activityChart.update();
      
      pollutionChart.data.datasets[0].data = mockData[target].pollution;
      pollutionChart.update();
    }
  });
});

document.querySelectorAll('.kpi-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const target = e.currentTarget.dataset.module;
    // Activate corresponding tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    let tabToActivate = document.querySelector(`.tab[data-target="${target}"]`);
    
    // Map 'critical' to 'overview' tab visually if 'critical' tab doesn't exist
    if (!tabToActivate && target === 'critical') {
      tabToActivate = document.querySelector(`.tab[data-target="overview"]`);
    }
    
    if (tabToActivate) {
      tabToActivate.classList.add('active');
    }
    
    // Update charts
    if (mockData[target]) {
      activityChart.data.datasets[0].data = mockData[target].traffic;
      activityChart.data.datasets[1].data = mockData[target].power;
      activityChart.update();
      
      pollutionChart.data.datasets[0].data = mockData[target].pollution;
      pollutionChart.update();
    }
    
    // Animate to indicate click
    e.currentTarget.style.transform = 'scale(0.98)';
    setTimeout(() => {
      e.currentTarget.style.transform = '';
    }, 150);
  });
});

// Live Data Simulation
setInterval(() => {
  // Update KPI values slightly
  const vehiclesEl = document.getElementById('kpi-vehicles');
  let currentV = parseInt(vehiclesEl.innerText.replace(/,/g, ''));
  currentV += Math.floor(Math.random() * 50) - 25;
  vehiclesEl.innerText = currentV.toLocaleString();

  // Randomly update chart last point
  const lastIndex = activityChart.data.datasets[0].data.length - 1;
  activityChart.data.datasets[0].data[lastIndex] += Math.floor(Math.random() * 10) - 5;
  activityChart.update('none');
}, 3000);

// Form Handling
const incidentForm = document.getElementById('incident-form');
const modulePills = document.querySelectorAll('.module-pill');
const severityBtns = document.querySelectorAll('.severity-btn');
const impactSlider = document.getElementById('impact-slider');
const impactValue = document.getElementById('impact-value');
const selectedModuleInput = document.getElementById('selected-module');
const selectedSeverityInput = document.getElementById('selected-severity');
const formError = document.getElementById('form-error');

// Module Pill Selection
modulePills.forEach(pill => {
  pill.addEventListener('click', () => {
    modulePills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    selectedModuleInput.value = pill.dataset.module;
  });
});

// Severity Button Selection
severityBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    severityBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSeverityInput.value = btn.dataset.severity;
  });
});

// Impact Slider Update
impactSlider.addEventListener('input', () => {
  impactValue.textContent = impactSlider.value;
});

// Form Validation
function validateForm(formData) {
  const errors = [];

  // Check required fields
  if (!formData.get('reporter-name')?.trim()) {
    errors.push('Reporter name is required');
  }
  if (!formData.get('reporter-phone')?.trim()) {
    errors.push('Phone/ID is required');
  }
  if (!formData.get('ward-zone')) {
    errors.push('Ward/Zone selection is required');
  }
  if (!formData.get('module')) {
    errors.push('Module type is required');
  }
  if (!formData.get('location')?.trim()) {
    errors.push('Location is required');
  }
  if (!formData.get('incident-date')) {
    errors.push('Incident date is required');
  }
  if (!formData.get('incident-time')) {
    errors.push('Incident time is required');
  }
  if (!formData.get('description')?.trim()) {
    errors.push('Description is required');
  }
  if (!formData.get('severity')) {
    errors.push('Severity level is required');
  }

  return errors;
}

// Form Submission
incidentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  formError.textContent = '';

  // Get form data
  const formData = new FormData(incidentForm);

  // Validate form
  const errors = validateForm(formData);
  if (errors.length > 0) {
    formError.textContent = errors.join(', ');
    return;
  }

  // Collect checked conditions
  const conditions = [];
  document.querySelectorAll('input[name="conditions"]:checked').forEach(cb => {
    conditions.push(cb.value);
  });

  // Prepare complete report data
  const reportData = {
    reporter: {
      name: formData.get('reporter-name'),
      phone: formData.get('reporter-phone'),
      zone: formData.get('ward-zone')
    },
    module: formData.get('module'),
    incident: {
      location: formData.get('location'),
      date: formData.get('incident-date'),
      time: formData.get('incident-time'),
      description: formData.get('description')
    },
    severity: formData.get('severity'),
    impact: formData.get('impact'),
    conditions: conditions,
    timestamp: new Date().toISOString()
  };

  // Disable submit button during processing
  const submitBtn = incidentForm.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Processing...';
  lucide.createIcons();

  try {
    // Simulate AI analysis (in production, this would call an actual AI API)
    console.log('Submitting report for AI analysis:', reportData);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI response
    const aiResponse = {
      recommendedAuthority: getRecommendedAuthority(reportData.module, reportData.severity),
      priorityLevel: reportData.severity.toUpperCase(),
      estimatedResponseTime: getEstimatedResponseTime(reportData.severity),
      suggestedActions: getSuggestedActions(reportData.module, reportData.conditions),
      reportId: 'RPT-' + Date.now()
    };

    console.log('AI Analysis Result:', aiResponse);

    // Show success message
    formError.textContent = '';
    formError.style.color = 'var(--mint)';
    formError.textContent = `Report submitted successfully! ID: ${aiResponse.reportId}. Authority: ${aiResponse.recommendedAuthority}`;

    // Reset form
    incidentForm.reset();
    modulePills.forEach(p => p.classList.remove('active'));
    severityBtns.forEach(b => b.classList.remove('active'));
    document.querySelectorAll('input[name="conditions"]').forEach(cb => cb.checked = false);
    impactValue.textContent = '50';
    selectedModuleInput.value = '';
    selectedSeverityInput.value = '';

    // Reset error color after 5 seconds
    setTimeout(() => {
      formError.style.color = 'var(--red)';
      formError.textContent = '';
    }, 5000);

  } catch (error) {
    console.error('Error submitting report:', error);
    formError.textContent = 'Error submitting report. Please try again.';
  } finally {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i data-lucide="send"></i> Submit Report';
    lucide.createIcons();
  }
});

// Helper functions for AI response simulation
function getRecommendedAuthority(module, severity) {
  const authorities = {
    traffic: 'Traffic Control Department',
    pollution: 'Environmental Protection Agency',
    crime: 'Police Department',
    complaint: 'Municipal Corporation',
    utility: 'Public Works Department'
  };
  return authorities[module] || 'City Administration';
}

function getEstimatedResponseTime(severity) {
  const times = {
    low: '24-48 hours',
    medium: '12-24 hours',
    high: '4-12 hours',
    critical: 'Immediate (under 2 hours)'
  };
  return times[severity] || '24-48 hours';
}

function getSuggestedActions(module, conditions) {
  const actions = {
    traffic: ['Deploy traffic wardens', 'Set up diversion routes', 'Clear obstructions'],
    pollution: ['Send inspection team', 'Monitor air quality', 'Issue compliance notice'],
    crime: ['Dispatch patrol unit', 'Secure area', 'Begin investigation'],
    complaint: ['Assign field officer', 'Document evidence', 'Schedule follow-up'],
    utility: ['Dispatch maintenance crew', 'Assess infrastructure', 'Restore services']
  };
  return actions[module] || ['Review incident', 'Assign appropriate department', 'Monitor situation'];
}
