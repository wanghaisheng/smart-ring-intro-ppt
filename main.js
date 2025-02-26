// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Store chart instances globally so we can destroy them when needed
let charts = {
  marketTrend: null,
  tcmGrowth: null,
  organChart: null,
  marketSize: null,
  ageDist: null,
  globalShare: null,
  competitor: null,
  pulseAnalysis: null,
  elementChart: null, 
  userProgress: null,
  corporateHealth: null,
  clinical: null,
  algoProgress: null,
  globalExpansion: null,
  algoAccuracy: null,
  signalChart: null,
  marketShareChart: null,
  investmentReturnChart: null,
  patientSatisfactionChart: null,
  medicineCostChart: null
};

// Initialize Three.js Ring Model
const initRing3D = () => {
  const container = document.getElementById('ring-3d');
  if (!container) return;
  
  // Clear any existing content
  container.innerHTML = '';
  
  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.error('THREE.js is not loaded');
    container.innerHTML = '<div style="color: var(--accent-gold); text-align: center; padding: 2rem;">智能戒指 3D 模型</div>';
    return;
  }
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  // Create ring geometry
  const geometry = new THREE.TorusGeometry(5, 1, 16, 100);
  const material = new THREE.MeshPhongMaterial({ 
    color: 0xffd700,
    specular: 0x009688,
    shininess: 100
  });
  const ring = new THREE.Mesh(geometry, material);
  scene.add(ring);
  
  // Add lights
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  
  camera.position.z = 15;
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    ring.rotation.x += 0.01;
    ring.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();
};

// Create a fallback visualization if chart.js is not available
const createFallbackChart = (canvasId, title) => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw title
  ctx.fillStyle = '#ffd700';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title || '数据可视化', canvas.width / 2, canvas.height / 2);
  
  // Draw border
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
  ctx.lineWidth = 2;
  ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
};

// Initialize Organ Stats Chart
const initOrganChart = () => {
  const organChart = document.getElementById('organChart');
  if (!organChart) return;

  // Destroy existing chart if it exists
  if (charts.organChart) {
    charts.organChart.destroy();
    charts.organChart = null;
  }

  // Check if Chart.js is loaded
  if (typeof Chart === 'undefined') {
    createFallbackChart('organChart', '脏腑能量指数');
    return;
  }

  try {
    const ctx = organChart.getContext('2d');
    charts.organChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['肝', '心', '脾', '肺', '肾'],
        datasets: [{
          label: '脏腑能量指数',
          data: [80, 65, 90, 75, 70],
          backgroundColor: 'rgba(0, 150, 136, 0.5)',
          borderColor: 'rgba(255, 215, 0, 1)',
          borderWidth: 2,
          pointBackgroundColor: '#ffd700',
          pointBorderColor: '#000',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#ffd700'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 1)',
              backdropColor: 'transparent',
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            pointLabels: {
              color: 'rgba(255, 255, 255, 1)',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgba(255, 255, 255, 1)',
              font: {
                size: 14,
                weight: 'bold'
              },
              boxWidth: 15,
              padding: 20
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error initializing organ chart:', error);
    createFallbackChart('organChart', '脏腑能量指数');
  }
};

// Animate Taiji and circuit patterns
const taijiAnimation = () => {
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded');
    return;
  }
  
  gsap.to('.taiji', {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none'
  });

  gsap.to('.circuit-path1, .circuit-path2', {
    strokeDashoffset: 20,
    duration: 2,
    repeat: -1,
    ease: 'none'
  });
};

// Initialize market trend charts
const updateMarketCharts = () => {
  // Market trend chart
  const marketTrendCtx = document.getElementById('marketTrendChart');
  if (marketTrendCtx) {
    // Destroy existing chart if it exists
    if (charts.marketTrend) {
      charts.marketTrend.destroy();
      charts.marketTrend = null;
    }

    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('marketTrendChart', '市场趋势');
      return;
    }

    try {
      charts.marketTrend = new Chart(marketTrendCtx.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          datasets: [
            {
              label: '国内市场规模（亿元）',
              data: [5000, 6200, 7800, 9500, 11500, 14000],
              borderColor: 'rgba(0, 150, 136, 1)',
              backgroundColor: 'rgba(0, 150, 136, 0.3)',
              borderWidth: 3,
              tension: 0.4,
              fill: true
            },
            {
              label: '海外市场规模（亿元）',
              data: [1000, 1500, 2300, 3500, 5200, 7800],
              borderColor: 'rgba(255, 215, 0, 1)',
              backgroundColor: 'rgba(255, 215, 0, 0.3)',
              borderWidth: 3,
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                },
                padding: 20
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 16,
                weight: 'bold'
              },
              bodyFont: {
                size: 14
              },
              padding: 15
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing market trend chart:', error);
      createFallbackChart('marketTrendChart', '市场趋势');
    }
  }

  // TCM Growth chart
  const tcmGrowthCtx = document.getElementById('tcmGrowthChart');
  if (tcmGrowthCtx) {
    // Destroy existing chart if it exists
    if (charts.tcmGrowth) {
      charts.tcmGrowth.destroy();
      charts.tcmGrowth = null;
    }

    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('tcmGrowthChart', '中医养生市场增长');
      return;
    }

    try {
      charts.tcmGrowth = new Chart(tcmGrowthCtx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          datasets: [{
            label: '中医养生市场规模（亿元）',
            data: [5000, 6200, 7800, 9500, 11500, 14000],
            backgroundColor: 'rgba(255, 215, 0, 0.8)',
            borderColor: 'rgba(255, 215, 0, 1)',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 16,
                weight: 'bold'
              },
              bodyFont: {
                size: 14
              },
              padding: 15
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing TCM growth chart:', error);
      createFallbackChart('tcmGrowthChart', '中医养生市场增长');
    }
  }
};

// Initialize detail pages
const initDetailPages = () => {
  // Initialize background section details
  const trendStats = [
    { label: '中医养生市场规模', value: '1.2', unit: '万亿' },
    { label: '智能硬件年增速', value: '25', unit: '%' },
    { label: '用户满意度', value: '92', unit: '%' }
  ];

  const statsContainer = document.querySelector('.trend-stats');
  if (statsContainer) {
    statsContainer.innerHTML = '';
    trendStats.forEach(stat => {
      const statElement = document.createElement('div');
      statElement.className = 'stat-item fade-in';
      statElement.innerHTML = `
        <div class="stat-value">${stat.value}<span>${stat.unit}</span></div>
        <div class="stat-label">${stat.label}</div>
      `;
      statsContainer.appendChild(statElement);
    });
  }
};

// Initialize technology charts
const initTechnologyCharts = () => {
  // Pulse Analysis Visualization
  const pulseCtx = document.getElementById('pulseAnalysisChart');
  if (pulseCtx) {
    // Destroy existing chart if it exists
    if (charts.pulseAnalysis) {
      charts.pulseAnalysis.destroy();
      charts.pulseAnalysis = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('pulseAnalysisChart', '脉搏波形分析');
      return;
    }
    
    try {
      charts.pulseAnalysis = new Chart(pulseCtx, {
        type: 'line',
        data: {
          labels: Array.from({length: 20}, (_, i) => i),
          datasets: [{
            label: '脉搏波形',
            data: Array.from({length: 20}, () => Math.random() * 30 + 60),
            borderColor: 'rgba(255, 215, 0, 1)',
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 12
              }
            }
          },
          scales: {
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing pulse analysis chart:', error);
      createFallbackChart('pulseAnalysisChart', '脉搏波形分析');
    }
  }

  // Five Elements Energy Chart
  const elementCtx = document.getElementById('elementChart');
  if (elementCtx) {
    // Destroy existing chart if it exists
    if (charts.elementChart) {
      charts.elementChart.destroy();
      charts.elementChart = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('elementChart', '五行能量评估');
      return;
    }
    
    try {
      charts.elementChart = new Chart(elementCtx, {
        type: 'radar',
        data: {
          labels: ['金', '木', '水', '火', '土'],
          datasets: [{
            label: '五行能量',
            data: [85, 65, 75, 90, 70],
            backgroundColor: 'rgba(255, 215, 0, 0.5)',
            borderColor: 'rgba(255, 215, 0, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 215, 0, 1)',
            pointBorderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: 'rgba(255, 255, 255, 0.3)' },
              grid: { color: 'rgba(255, 255, 255, 0.3)' },
              pointLabels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              ticks: { 
                beginAtZero: true,
                color: '#fff',
                backdropColor: 'transparent',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 12
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing element chart:', error);
      createFallbackChart('elementChart', '五行能量评估');
    }
  }
};

// Initialize Technology Charts Part 2
const initTechnologyCharts2 = () => {
  // Algorithm Accuracy Progress
  const algoCtx = document.getElementById('algoAccuracyChart');
  if (algoCtx) {
    // Destroy existing chart if it exists
    if (charts.algoAccuracy) {
      charts.algoAccuracy.destroy();
      charts.algoAccuracy = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('algoAccuracyChart', '算法准确率');
      return;
    }
    
    try {
      charts.algoAccuracy = new Chart(algoCtx, {
        type: 'line',
        data: {
          labels: ['V1.0', 'V1.5', 'V2.0', 'V2.5', 'V3.0'],
          datasets: [{
            label: '算法准确率',
            data: [75, 82, 86, 89, 92],
            borderColor: 'rgba(0, 150, 136, 1)',
            backgroundColor: 'rgba(0, 150, 136, 0.3)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing algorithm accuracy chart:', error);
      createFallbackChart('algoAccuracyChart', '算法准确率');
    }
  }

  // Signal Processing Visualization
  const signalCtx = document.getElementById('signalProcessingChart');
  if (signalCtx) {
    // Destroy existing chart if it exists
    if (charts.signalChart) {
      charts.signalChart.destroy();
      charts.signalChart = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('signalProcessingChart', '信号处理');
      return;
    }
    
    try {
      charts.signalChart = new Chart(signalCtx, {
        type: 'line',
        data: {
          labels: Array.from({length: 30}, (_, i) => i),
          datasets: [{
            label: '原始信号',
            data: Array.from({length: 30}, (_, i) => Math.sin(i/3) * 50 + 50 + Math.random() * 10),
            borderColor: 'rgba(255, 215, 0, 0.5)',
            borderDash: [5, 5],
            tension: 0.4
          }, {
            label: '处理后信号',
            data: Array.from({length: 30}, (_, i) => Math.sin(i/3) * 50 + 50),
            borderColor: 'rgba(255, 215, 0, 1)',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          scales: {
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing signal processing chart:', error);
      createFallbackChart('signalProcessingChart', '信号处理');
    }
  }
};

// Initialize market analysis section
const initMarketAnalysis = () => {
  // Market size comparison chart
  const marketSizeCtx = document.getElementById('marketSizeChart');
  if (marketSizeCtx) {
    // Destroy existing chart if it exists
    if (charts.marketSize) {
      charts.marketSize.destroy();
      charts.marketSize = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('marketSizeChart', '市场规模');
      return;
    }
    
    try {
      charts.marketSize = new Chart(marketSizeCtx, {
        type: 'line',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024(E)', '2025(E)', '2026(E)'],
          datasets: [{
            label: '中医养生市场规模（亿元）',
            data: [5000, 6200, 7800, 9500, 11500, 14000, 17000],
            borderColor: 'rgba(255, 215, 0, 1)',
            backgroundColor: 'rgba(255, 215, 0, 0.3)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 16,
                weight: 'bold'
              },
              bodyFont: {
                size: 14
              },
              padding: 15
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing market size chart:', error);
      createFallbackChart('marketSizeChart', '市场规模');
    }
  }

  // User age distribution chart
  const ageDistCtx = document.getElementById('ageDistributionChart');
  if (ageDistCtx) {
    // Destroy existing chart if it exists
    if (charts.ageDist) {
      charts.ageDist.destroy();
      charts.ageDist = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('ageDistributionChart', '用户年龄分布');
      return;
    }
    
    try {
      charts.ageDist = new Chart(ageDistCtx, {
        type: 'doughnut',
        data: {
          labels: ['18-25岁', '26-35岁', '36-45岁', '45岁以上'],
          datasets: [{
            data: [15, 40, 30, 15],
            backgroundColor: [
              'rgba(2, 136, 209, 0.9)',
              'rgba(0, 150, 136, 0.9)',
              'rgba(255, 215, 0, 0.9)',
              'rgba(156, 39, 176, 0.9)'
            ],
            borderColor: [
              'rgba(2, 136, 209, 1)',
              'rgba(0, 150, 136, 1)',
              'rgba(255, 215, 0, 1)',
              'rgba(156, 39, 176, 1)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                },
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 16,
                weight: 'bold'
              },
              bodyFont: {
                size: 14
              },
              padding: 15
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing age distribution chart:', error);
      createFallbackChart('ageDistributionChart', '用户年龄分布');
    }
  }
};

// Initialize additional market analysis charts
const initMarketAnalysis3 = () => {
  // Market Share Chart
  const marketShareCtx = document.getElementById('marketShareChart');
  if (marketShareCtx) {
    // Destroy existing chart if it exists
    if (charts.marketShareChart) {
      charts.marketShareChart.destroy();
      charts.marketShareChart = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('marketShareChart', '市场份额');
      return;
    }
    
    try {
      charts.marketShareChart = new Chart(marketShareCtx, {
        type: 'pie',
        data: {
          labels: ['智能穿戴设备', '健康监测应用', '其他健康设备', '脉康宝潜在市场'],
          datasets: [{
            data: [30, 25, 25, 20],
            backgroundColor: [
              'rgba(2, 136, 209, 0.9)',
              'rgba(0, 150, 136, 0.9)',
              'rgba(255, 215, 0, 0.9)',
              'rgba(156, 39, 176, 0.9)'
            ],
            borderColor: [
              'rgba(2, 136, 209, 1)',
              'rgba(0, 150, 136, 1)',
              'rgba(255, 215, 0, 1)',
              'rgba(156, 39, 176, 1)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                },
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 12
              },
              padding: 12
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing market share chart:', error);
      createFallbackChart('marketShareChart', '市场份额');
    }
  }

  // Investment Return Chart
  const investmentReturnCtx = document.getElementById('investmentReturnChart');
  if (investmentReturnCtx) {
    // Destroy existing chart if it exists
    if (charts.investmentReturnChart) {
      charts.investmentReturnChart.destroy();
      charts.investmentReturnChart = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('investmentReturnChart', '投资回报率');
      return;
    }
    
    try {
      charts.investmentReturnChart = new Chart(investmentReturnCtx, {
        type: 'bar',
        data: {
          labels: ['第一年', '第二年', '第三年', '第四年', '第五年'],
          datasets: [{
            label: '投资回报率 (%)',
            data: [15, 35, 60, 85, 120],
            backgroundColor: [
              'rgba(255, 215, 0, 0.6)',
              'rgba(255, 215, 0, 0.7)',
              'rgba(255, 215, 0, 0.8)',
              'rgba(255, 215, 0, 0.9)',
              'rgba(255, 215, 0, 1.0)'
            ],
            borderColor: 'rgba(255, 255, 255, 0.8)',
            borderWidth: 2,
            borderRadius: 6,
            hoverBackgroundColor: 'rgba(255, 215, 0, 1.0)',
            hoverBorderColor: '#fff',
            hoverBorderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 16,
                weight: 'bold'
              },
              bodyFont: {
                size: 14
              },
              callbacks: {
                label: function(context) {
                  return '回报率: ' + context.parsed.y + '%';
                }
              },
              padding: 15,
              displayColors: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { 
                color: 'rgba(255, 255, 255, 0.3)',
                drawBorder: true
              },
              ticks: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                },
                callback: function(value) {
                  return value + '%';
                }
              }
            },
            x: {
              grid: { 
                color: 'rgba(255, 255, 255, 0.2)',
                display: false
              },
              ticks: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing investment return chart:', error);
      createFallbackChart('investmentReturnChart', '投资回报率');
    }
  }
};

// Initialize additional market analysis charts for healthcare benefits
const initMarketAnalysis4 = () => {
  // Patient Satisfaction Chart
  const patientSatisfactionCtx = document.getElementById('patientSatisfactionChart');
  if (patientSatisfactionCtx) {
    // Destroy existing chart if it exists
    if (charts.patientSatisfactionChart) {
      charts.patientSatisfactionChart.destroy();
      charts.patientSatisfactionChart = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('patientSatisfactionChart', '患者满意度');
      return;
    }
    
    try {
      charts.patientSatisfactionChart = new Chart(patientSatisfactionCtx, {
        type: 'bar',
        data: {
          labels: ['传统方式', '脉康宝辅助'],
          datasets: [{
            label: '患者满意度评分',
            data: [65, 90],
            backgroundColor: [
              'rgba(2, 136, 209, 0.6)',
              'rgba(0, 150, 136, 0.6)'
            ],
            borderColor: [
              'var(--tech-blue)',
              'var(--primary-green)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 100,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing patient satisfaction chart:', error);
      createFallbackChart('patientSatisfactionChart', '患者满意度');
    }
  }

  // Medicine Cost Reduction Chart
  const medicineCostCtx = document.getElementById('medicineCostChart');
  if (medicineCostCtx) {
    // Destroy existing chart if it exists
    if (charts.medicineCostChart) {
      charts.medicineCostChart.destroy();
      charts.medicineCostChart = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('medicineCostChart', '药物使用量变化');
      return;
    }
    
    try {
      charts.medicineCostChart = new Chart(medicineCostCtx, {
        type: 'line',
        data: {
          labels: ['第1个月', '第3个月', '第6个月', '第9个月', '第12个月'],
          datasets: [{
            label: '药物使用量',
            data: [100, 85, 70, 60, 50],
            borderColor: 'rgba(255, 215, 0, 1)',
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return '药物使用量: ' + context.parsed.y + '%';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                callback: function(value) {
                  return value + '%';
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing medicine cost chart:', error);
      createFallbackChart('medicineCostChart', '药物使用量变化');
    }
  }
};

// Initialize market analysis part 2
const initMarketAnalysis2 = () => {
  // Global market share chart
  const globalShareCtx = document.getElementById('globalShareChart');
  if (globalShareCtx) {
    // Destroy existing chart if it exists
    if (charts.globalShare) {
      charts.globalShare.destroy();
      charts.globalShare = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('globalShareChart', '全球市场份额');
      return;
    }
    
    try {
      charts.globalShare = new Chart(globalShareCtx, {
        type: 'bar',
        data: {
          labels: ['中国', '东南亚', '北美', '欧洲', '其他'],
          datasets: [{
            label: '2023年市场份额',
            data: [60, 20, 10, 5, 5],
            backgroundColor: 'rgba(0, 150, 136, 0.6)'
          }, {
            label: '2025年目标份额',
            data: [40, 25, 20, 10, 5],
            backgroundColor: 'rgba(2, 136, 209, 0.6)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                callback: function(value) {
                  return value + '%';
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing global share chart:', error);
      createFallbackChart('globalShareChart', '全球市场份额');
    }
  }

  // Competitor comparison radar chart
  const competitorCtx = document.getElementById('competitorChart');
  if (competitorCtx) {
    // Destroy existing chart if it exists
    if (charts.competitor) {
      charts.competitor.destroy();
      charts.competitor = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('competitorChart', '竞品对比');
      return;
    }
    
    try {
      charts.competitor = new Chart(competitorCtx, {
        type: 'radar',
        data: {
          labels: ['技术创新', '市场占有率', '品牌认知度', '用户满意度', '成本效益'],
          datasets: [{
            label: '脉康宝',
            data: [90, 65, 70, 85, 80],
            borderColor: 'rgba(0, 150, 136, 1)',
            backgroundColor: 'rgba(0, 150, 136, 0.2)'
          }, {
            label: '主要竞品',
            data: [70, 80, 85, 75, 70],
            borderColor: 'rgba(2, 136, 209, 1)',
            backgroundColor: 'rgba(2, 136, 209, 0.2)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          scales: {
            r: {
              angleLines: { color: 'rgba(255, 255, 255, 0.3)' },
              grid: { color: 'rgba(255, 255, 255, 0.3)' },
              pointLabels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              ticks: { 
                beginAtZero: true,
                color: '#fff',
                backdropColor: 'transparent',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing competitor chart:', error);
      createFallbackChart('competitorChart', '竞品对比');
    }
  }
};

// Initialize use case charts
const initUseCaseCharts = () => {
  // User Progress Chart
  const userProgressCtx = document.getElementById('userProgressChart');
  if (userProgressCtx) {
    // Destroy existing chart if it exists
    if (charts.userProgress) {
      charts.userProgress.destroy();
      charts.userProgress = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('userProgressChart', '用户进度');
      return;
    }
    
    try {
      charts.userProgress = new Chart(userProgressCtx, {
        type: 'line',
        data: {
          labels: ['Day 1', 'Day 7', 'Day 14', 'Day 21', 'Day 30'],
          datasets: [{
            label: '肝火指数',
            data: [85, 80, 75, 70, 65],
            borderColor: 'rgba(0, 150, 136, 1)',
            backgroundColor: 'rgba(0, 150, 136, 0.3)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing user progress chart:', error);
      createFallbackChart('userProgressChart', '用户进度');
    }
  }

  // Corporate Health Chart
  const corporateHealthCtx = document.getElementById('corporateHealthChart');
  if (corporateHealthCtx) {
    // Destroy existing chart if it exists
    if (charts.corporateHealth) {
      charts.corporateHealth.destroy();
      charts.corporateHealth = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('corporateHealthChart', '企业健康管理');
      return;
    }
    
    try {
      charts.corporateHealth = new Chart(corporateHealthCtx, {
        type: 'bar',
        data: {
          labels: ['压力指数', '疲劳度', '免疫力', '睡眠质量'],
          datasets: [{
            label: '干预前',
            data: [75, 80, 60, 65],
            backgroundColor: 'rgba(2, 136, 209, 0.5)'
          }, {
            label: '干预后',
            data: [60, 65, 75, 80],
            backgroundColor: 'rgba(0, 150, 136, 0.5)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing corporate health chart:', error);
      createFallbackChart('corporateHealthChart', '企业健康管理');
    }
  }
};

// Initialize research charts
const initResearchCharts = () => {
  // Clinical Research Chart
  const clinicalCtx = document.getElementById('clinicalChart');
  if (clinicalCtx) {
    // Destroy existing chart if it exists
    if (charts.clinical) {
      charts.clinical.destroy();
      charts.clinical = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('clinicalChart', '临床研究');
      return;
    }
    
    try {
      charts.clinical = new Chart(clinicalCtx, {
        type: 'bar',
        data: {
          labels: ['脉诊', '舌诊', '证型', '总体'],
          datasets: [{
            label: '准确率',
            data: [92, 88, 85, 89],
            backgroundColor: 'rgba(255, 215, 0, 0.5)',
            borderColor: 'rgba(255, 215, 0, 1)',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing clinical chart:', error);
      createFallbackChart('clinicalChart', '临床研究');
    }
  }

  // Algorithm Progress Chart
  const algoCtx = document.getElementById('algoProgressChart');
  if (algoCtx) {
    // Destroy existing chart if it exists
    if (charts.algoProgress) {
      charts.algoProgress.destroy();
      charts.algoProgress = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('algoProgressChart', '算法进展');
      return;
    }
    
    try {
      charts.algoProgress = new Chart(algoCtx, {
        type: 'line',
        data: {
          labels: ['V1.0', 'V1.5', 'V2.0', 'V2.5', 'V3.0'],
          datasets: [{
            label: '算法准确率',
            data: [75, 80, 85, 88, 90],
            borderColor: 'rgba(255, 215, 0, 1)',
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing algorithm progress chart:', error);
      createFallbackChart('algoProgressChart', '算法进展');
    }
  }
};

// Initialize global expansion map
const initGlobalMap = () => {
  const mapCtx = document.getElementById('globalExpansionMap');
  if (mapCtx) {
    // Destroy existing chart if it exists
    if (charts.globalExpansion) {
      charts.globalExpansion.destroy();
      charts.globalExpansion = null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      createFallbackChart('globalExpansionMap', '全球扩张规划');
      return;
    }
    
    try {
      charts.globalExpansion = new Chart(mapCtx, {
        type: 'bubble',
        data: {
          datasets: [{
            label: '市场布局 (2024)',
            data: [
              { x: 120, y: 30, r: 30 }, // China
              { x: 100, y: 10, r: 15 }, // SE Asia
            ],
            backgroundColor: 'rgba(0, 150, 136, 0.6)'
          }, {
            label: '市场布局 (2025)',
            data: [
              { x: 120, y: 30, r: 25 }, // China
              { x: 100, y: 10, r: 20 }, // SE Asia
              { x: 0, y: 40, r: 15 }, // Europe
              { x: -100, y: 40, r: 15 } // North America
            ],
            backgroundColor: 'rgba(255, 215, 0, 0.6)'
          }, {
            label: '市场布局 (2026)',
            data: [
              { x: 120, y: 30, r: 20 }, // China
              { x: 100, y: 10, r: 15 }, // SE Asia
              { x: 0, y: 40, r: 15 }, // Europe
              { x: -100, y: 40, r: 15 }, // North America
              { x: 50, y: -30, r: 10 }, // Australia
              { x: -60, y: -20, r: 10 } // South America
            ],
            backgroundColor: 'rgba(2, 136, 209, 0.6)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { 
                color: '#fff',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          scales: {
            x: {
              min: -180,
              max: 180,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            y: {
              min: -90,
              max: 90,
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              ticks: { 
                color: '#fff',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing global expansion map:', error);
      createFallbackChart('globalExpansionMap', '全球扩张规划');
    }
  }
};

// Initialize the feature animations
const initFeatureAnimations = () => {
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded');
    return;
  }
  
  gsap.from('.feature-ring', {
    scrollTrigger: {
      trigger: '.features-container',
      start: 'top center'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2
  });

  gsap.from('.feature-item', {
    scrollTrigger: {
      trigger: '.feature-details',
      start: 'top center'
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1
  });

  gsap.from('.spec-card', {
    scrollTrigger: {
      trigger: '.specs-grid',
      start: 'top center'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1
  });
};

// Destroy all existing charts
const destroyAllCharts = () => {
  Object.keys(charts).forEach(key => {
    if (charts[key]) {
      try {
        charts[key].destroy();
      } catch (error) {
        console.error(`Error destroying chart ${key}:`, error);
      }
      charts[key] = null;
    }
  });
};

// Add presentation navigation logic
class Presentation {
  constructor() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    
    // Create navigation controls
    this.createControls();
    
    // Initialize first slide
    this.showSlide(0);
    
    // Add event listeners
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
    document.addEventListener('click', this.handleClick.bind(this));
    
    // Handle window resize events
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  createControls() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    // Create slide counter
    const counter = document.createElement('div');
    counter.className = 'slide-counter';
    document.body.appendChild(counter);
    
    // Create navigation buttons
    const navControls = document.createElement('div');
    navControls.className = 'nav-controls';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'nav-button';
    prevButton.textContent = '←';
    prevButton.onclick = () => this.prevSlide();
    
    const nextButton = document.createElement('button');
    nextButton.className = 'nav-button';
    nextButton.textContent = '→';
    nextButton.onclick = () => this.nextSlide();
    
    navControls.appendChild(prevButton);
    navControls.appendChild(nextButton);
    document.body.appendChild(navControls);
    
    this.progressBar = progressBar;
    this.counter = counter;
  }
  
  showSlide(index) {
    // Destroy all existing charts before showing new slide
    destroyAllCharts();
    
    // Remove active class from all slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.display = 'none';
    });
    
    // Show current slide
    this.slides[index].classList.add('active');
    this.slides[index].style.display = 'flex';
    
    // Update progress bar and counter
    const progress = ((index + 1) / this.totalSlides) * 100;
    this.progressBar.style.width = `${progress}%`;
    this.counter.textContent = `${index + 1} / ${this.totalSlides}`;
    
    // Initialize charts based on current slide content
    const currentSlide = this.slides[index];
    const slideId = currentSlide.id;
    
    this.initializeChartsBySlideId(slideId);
  }
  
  initializeChartsBySlideId(slideId) {
    switch(slideId) {
      case 'landing':
        initOrganChart();
        initRing3D();
        taijiAnimation();
        break;
        
      case 'background':
        initDetailPages();
        break;

      case 'tcm-revival':
        const tcmGrowthCtx = document.getElementById('tcmGrowthChart');
        if (tcmGrowthCtx) {
          try {
            if (typeof Chart !== 'undefined') {
              charts.tcmGrowth = new Chart(tcmGrowthCtx.getContext('2d'), {
                type: 'bar',
                data: {
                  labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                  datasets: [{
                    label: '中医养生市场规模（亿元）',
                    data: [5000, 6200, 7800, 9500, 11500, 14000],
                    backgroundColor: 'rgba(255, 215, 0, 0.8)',
                    borderColor: 'rgba(255, 215, 0, 1)',
                    borderWidth: 2
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: { 
                        color: '#fff',
                        font: {
                          size: 14,
                          weight: 'bold'
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: 'rgba(255, 255, 255, 0.2)' },
                      ticks: { 
                        color: '#fff',
                        font: {
                          size: 12,
                          weight: 'bold'
                        }
                      }
                    },
                    x: {
                      grid: { color: 'rgba(255, 255, 255, 0.2)' },
                      ticks: { 
                        color: '#fff',
                        font: {
                          size: 12,
                          weight: 'bold'
                        }
                      }
                    }
                  }
                }
              });
            } else {
              createFallbackChart('tcmGrowthChart', '中医养生市场增长');
            }
          } catch (error) {
            console.error('Error initializing TCM growth chart:', error);
            createFallbackChart('tcmGrowthChart', '中医养生市场增长');
          }
        }
        break;
        
      // Keep the rest of the switch statement the same
      case 'background-additional':
        // No specific charts to initialize for this slide
        break;
        
      case 'background-part2':
        updateMarketCharts();
        break;
        
      case 'market':
        initMarketAnalysis();
        break;
        
      case 'market-part15':
        // Handle age distribution chart specifically
        const ageDistCtx = document.getElementById('ageDistributionChart');
        if (ageDistCtx) {
          if (charts.ageDist) {
            charts.ageDist.destroy();
            charts.ageDist = null;
          }
          
          try {
            if (typeof Chart !== 'undefined') {
              charts.ageDist = new Chart(ageDistCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                  labels: ['18-25岁', '26-35岁', '36-45岁', '45岁以上'],
                  datasets: [{
                    data: [15, 40, 30, 15],
                    backgroundColor: [
                      'rgba(2, 136, 209, 0.9)',
                      'rgba(0, 150, 136, 0.9)',
                      'rgba(255, 215, 0, 0.9)',
                      'rgba(156, 39, 176, 0.9)'
                    ]
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: { 
                        color: '#fff',
                        font: {
                          size: 14,
                          weight: 'bold'
                        },
                        padding: 20
                      }
                    }
                  }
                }
              });
            } else {
              createFallbackChart('ageDistributionChart', '用户年龄分布');
            }
          } catch (error) {
            console.error('Error initializing age distribution chart:', error);
            createFallbackChart('ageDistributionChart', '用户年龄分布');
          }
        }
        break;
        
      case 'market-part2':
        initMarketAnalysis2();
        break;
        
      case 'market-part25':
        // Handle competitor chart specifically
        const competitorCtx = document.getElementById('competitorChart');
        if (competitorCtx) {
          if (charts.competitor) {
            charts.competitor.destroy();
            charts.competitor = null;
          }
          
          try {
            if (typeof Chart !== 'undefined') {
              charts.competitor = new Chart(competitorCtx.getContext('2d'), {
                type: 'radar',
                data: {
                  labels: ['技术创新', '市场占有率', '品牌认知度', '用户满意度', '成本效益'],
                  datasets: [{
                    label: '脉康宝',
                    data: [90, 65, 70, 85, 80],
                    borderColor: 'rgba(0, 150, 136, 1)',
                    backgroundColor: 'rgba(0, 150, 136, 0.2)'
                  }, {
                    label: '主要竞品',
                    data: [70, 80, 85, 75, 70],
                    borderColor: 'rgba(2, 136, 209, 1)',
                    backgroundColor: 'rgba(2, 136, 209, 0.2)'
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: { 
                        color: '#fff',
                        font: {
                          size: 14,
                          weight: 'bold'
                        }
                      }
                    }
                  },
                  scales: {
                    r: {
                      angleLines: { color: 'rgba(255, 255, 255, 0.3)' },
                      grid: { color: 'rgba(255, 255, 255, 0.3)' },
                      pointLabels: { 
                        color: '#fff',
                        font: {
                          size: 14,
                          weight: 'bold'
                        }
                      },
                      ticks: { 
                        beginAtZero: true,
                        color: '#fff',
                        backdropColor: 'transparent',
                        font: {
                          size: 12,
                          weight: 'bold'
                        }
                      }
                    }
                  }
                }
              });
            } else {
              createFallbackChart('competitorChart', '竞品对比');
            }
          } catch (error) {
            console.error('Error initializing competitor chart:', error);
            createFallbackChart('competitorChart', '竞品对比');
          }
        }
        break;
        
      case 'market-part3':
        // No specific charts to initialize
        break;
        
      case 'market-part4':
        initMarketAnalysis3();
        break;
        
      case 'market-part5':
      case 'market-part55':
        initMarketAnalysis4();
        break;
        
      case 'technology':
        initTechnologyCharts();
        break;
        
      case 'technology-part15':
        // Handle element chart specifically
        const elementCtx = document.getElementById('elementChart');
        if (elementCtx) {
          if (charts.elementChart) {
            charts.elementChart.destroy();
            charts.elementChart = null;
          }
          
          try {
            if (typeof Chart !== 'undefined') {
              charts.elementChart = new Chart(elementCtx.getContext('2d'), {
                type: 'radar',
                data: {
                  labels: ['金', '木', '水', '火', '土'],
                  datasets: [{
                    label: '五行能量',
                    data: [85, 65, 75, 90, 70],
                    backgroundColor: 'rgba(255, 215, 0, 0.5)',
                    borderColor: 'rgba(255, 215, 0, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 215, 0, 1)',
                    pointBorderColor: '#fff'
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      angleLines: { color: 'rgba(255, 255, 255, 0.3)' },
                      grid: { color: 'rgba(255, 255, 255, 0.3)' },
                      pointLabels: { 
                        color: '#fff',
                        font: {
                          size: 14,
                          weight: 'bold'
                        }
                      },
                      ticks: { 
                        beginAtZero: true,
                        color: '#fff',
                        backdropColor: 'transparent',
                        font: {
                          size: 12,
                          weight: 'bold'
                        }
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      labels: { 
                        color: '#fff',
                        font: {
                          size: 14,
                          weight: 'bold'
                        }
                      }
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleFont: {
                        size: 14,
                        weight: 'bold'
                      },
                      bodyFont: {
                        size: 12
                      }
                    }
                  }
                }
              });
            } else {
              createFallbackChart('elementChart', '五行能量评估');
            }
          } catch (error) {
            console.error('Error initializing element chart:', error);
            createFallbackChart('elementChart', '五行能量评估');
          }
        }
        break;
        
      case 'technology-part2':
        initTechnologyCharts2();
        break;
        
      case 'technology-part25':
        // Handle signal processing chart specifically
        const signalCtx = document.getElementById('signalProcessingChart');
        if (signalCtx) {
          if (charts.signalChart) {
            charts.signalChart.destroy();
            charts.signalChart = null;
          }
          
          try {
            if (typeof Chart !== 'undefined') {
              charts.signalChart = new Chart(signalCtx.getContext('2d'), {
                type: 'line',
                data: {
                  labels: Array.from({length: 30}, (_, i) => i),
                  datasets: [{
                    label: '原始信号',
                    data: Array.from({length: 30}, (_, i) => Math.sin(i/3) * 50 + 50 + Math.random() * 10),
                    borderColor: 'rgba(255, 215, 0, 0.5)',
                    borderDash: [5, 5],
                    tension: 0.4
                  }, {
                    label: '处理后信号',
                    data: Array.from({length: 30}, (_, i) => Math.sin(i/3) * 50 + 50),
                    borderColor: 'rgba(255, 215, 0, 1)',
                    tension: 0.4
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: { 
                        color: '#fff',
                        font: {
                          size: 14,
                          weight: 'bold'
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      grid: { color: 'rgba(255, 255, 255, 0.2)' },
                      ticks: { 
                        color: '#fff',
                        font: {
                          size: 12,
                          weight: 'bold'
                        }
                      }
                    },
                    x: {
                      grid: { color: 'rgba(255, 255, 255, 0.2)' },
                      ticks: { 
                        color: '#fff',
                        font: {
                          size: 12,
                          weight: 'bold'
                        }
                      }
                    }
                  }
                }
              });
            } else {
              createFallbackChart('signalProcessingChart', '信号处理');
            }
          } catch (error) {
            console.error('Error initializing signal processing chart:', error);
            createFallbackChart('signalProcessingChart', '信号处理');
          }
        }
        break;
        
      case 'use-cases':
        initUseCaseCharts();
        break;
        
      case 'use-cases-part2':
        // Handle corporate health chart specifically
        const corporateHealthCtx = document.getElementById('corporateHealthChart');
        if (corporateHealthCtx) {
          if (charts.corporateHealth) {
            charts.corporateHealth.destroy();
            charts.corporateHealth = null;
          }
          
          try {
            if (typeof Chart !== 'undefined') {
              charts.corporateHealth = new Chart(corporateHealthCtx.getContext('2d'), {
                type: 'bar',
                data: {
                  labels: ['压力指数', '疲劳度', '免疫力', '睡眠质量'],
                  datasets: [{
                    label: '干预前',
                    data: [75, 80, 60, 65],
                    backgroundColor: 'rgba(2, 136, 209, 0.5)'
                  }, {
                    label: '干预后',
                    data: [60, 65, 75, 80],
                    backgroundColor: 'rgba(0, 150, 136, 0.5)'
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: { 
                        color: '#fff',
                        font: {
                          size: 14,
                          weight: 'bold'
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: 'rgba(255, 255, 255, 0.2)' },
                      ticks: { 
                        color: '#fff',
                        font: {
                          size: 12,
                          weight: 'bold'
                        }
                      }
                    },
                    x: {
                      grid: { color: 'rgba(255, 255, 255, 0.2)' },
                      ticks: { 
                        color: '#fff',
                        font: {
                          size: 12,
                          weight: 'bold'
                        }
                      }
                    }
                  }
                }
              });
            } else {
              createFallbackChart('corporateHealthChart', '企业健康管理');
            }
          } catch (error) {
            console.error('Error initializing corporate health chart:', error);
            createFallbackChart('corporateHealthChart', '企业健康管理');
          }
        }
        break;
        
      case 'research':
        initResearchCharts();
        break;
        
      case 'research-part2':
        // Handle algorithm progress chart specifically
        const algoCtx = document.getElementById('algoProgressChart');
        if (algoCtx) {
          if (charts.algoProgress) {
            charts.algoProgress.destroy();
            charts.algoProgress = null;
          }
          
          try {
            if (typeof Chart !== 'undefined') {
              charts.algoProgress = new Chart(algoCtx.getContext('2d'), {
                type: 'line',
                data: {
                  labels: ['V1.0', 'V1.5', 'V2.0', 'V2.5', 'V3.0'],
                  datasets: [{
                    label: '算法准确率',
                    data: [75, 80, 85, 88, 90],
                    borderColor: 'rgba(255, 215, 0, 1)',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: { 
                        color: '#fff',
                        font: {
                          size: 14,
                          weight: 'bold'
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: { color: 'rgba(255, 255, 255, 0.2)' },
                      ticks: { 
                        color: '#fff',
                        font: {
                          size: 12,
                          weight: 'bold'
                        }
                      }
                    },
                    x: {
                      grid: { color: 'rgba(255, 255, 255, 0.2)' },
                      ticks: { 
                        color: '#fff',
                        font: {
                          size: 12,
                          weight: 'bold'
                        }
                      }
                    }
                  }
                }
              });
            } else {
              createFallbackChart('algoProgressChart', '算法进展');
            }
          } catch (error) {
            console.error('Error initializing algorithm progress chart:', error);
            createFallbackChart('algoProgressChart', '算法进展');
          }
        }
        break;
        
      case 'global-vision':
        initGlobalMap();
        break;
        
      case 'product-features':
      case 'product-features-part2':
      case 'product-features-part15':
      case 'product-features-part25':
        initFeatureAnimations();
        break;
        
      default:
        // No specific initialization needed for other slides
        break;
    }
  }
  
  nextSlide() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.currentIndex++;
      this.showSlide(this.currentIndex);
    }
  }
  
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.showSlide(this.currentIndex);
    }
  }
  
  handleKeyPress(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
      this.nextSlide();
    } else if (event.key === 'ArrowLeft') {
      this.prevSlide();
    }
  }
  
  handleClick(event) {
    // If click is not on a button or control element
    if (!event.target.closest('.nav-controls') && 
        !event.target.closest('.nav-button') &&
        !event.target.closest('.slide-content')) {
      this.nextSlide();
    }
  }
  
  handleResize() {
    // Redraw charts on window resize
    const currentSlide = this.slides[this.currentIndex];
    if (currentSlide) {
      const slideId = currentSlide.id;
      
      // Destroy all charts
      destroyAllCharts();
      
      // Re-initialize based on current slide
      this.initializeChartsBySlideId(slideId);
    }
  }
}

// Initialize presentation when document is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize presentation navigation
  const presentation = new Presentation();
  
  // Initialize first slide
  presentation.showSlide(0);
});