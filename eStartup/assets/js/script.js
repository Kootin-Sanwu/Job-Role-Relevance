// // Define chart variables
// let charts = {};
// const reloadButtons = {
//   barChart1: document.getElementById('reloadButton1'),
//   barChart2: document.getElementById('reloadButton2'),
//   barChart3: document.getElementById('reloadButton3'),
// };

// const urls = [
//   "https://example.com/page1",
//   "https://example.com/page2",
//   "https://example.com/page3",
// ];

// // Function to create a chart
// async function fetchDataAndRenderChart(chartId) {
//   try {
//     const response = await fetch('../data/Processed_Job_Role_Data.json');
//     const data = await response.json();

//     const labels = data.map(item => item['Role Name']);
//     const values = data.map(item => item['Role Relevance Score']);

//     const canvas = document.getElementById(chartId);
//     if (!canvas) {
//       console.error(`Canvas with ID '${chartId}' not found`);
//       return;
//     }

//     const ctx = canvas.getContext('2d');
//     const gradient = ctx.createLinearGradient(0, 0, 0, 400);
//     gradient.addColorStop(0, 'rgb(146, 61, 65)');
//     gradient.addColorStop(1, 'rgb(146, 61, 65)');

//     const chartData = {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Role Relevance Score (%)',
//           data: values,
//           backgroundColor: gradient,
//           barThickness: 75,
//           borderWidth: 0,
//           hoverBackgroundColor: gradient,
//           hoverBorderWidth: 0,
//         },
//       ],
//     };

//     const chartOptions = {
//       responsive: true,
//       animation: {
//         duration: 2000,
//         easing: 'easeOutBounce',
//         delay: function (context) {
//           return context.dataIndex * 200;
//         },
//       },
//       plugins: {
//         legend: {
//           display: false,
//         },
//         tooltip: {
//           enabled: true,
//           backgroundColor: '#333',
//           titleColor: 'white',
//           bodyColor: 'white',
//           titleFont: { family: 'Times New Roman', size: 16 },
//           bodyFont: { family: 'Times New Roman', size: 16 },
//           animation: { duration: 200 },
//         },
//       },
//       scales: {
//         x: {
//           ticks: {
//             color: 'black',
//             font: { family: 'Times New Roman', size: 16 },
//             callback: function (value) {
//               return this.getLabelForValue(value).split('\n');
//             },
//           },
//           grid: { display: false },
//         },
//         y: {
//           ticks: {
//             color: 'black',
//             font: { family: 'Times New Roman', size: 20 },
//             stepSize: 10,
//           },
//           grid: { display: false },
//         },
//       },
//       elements: {
//         bar: {
//           borderRadius: 8,
//           borderSkipped: false,
//         },
//       },
//     };

//     // Destroy existing chart before re-creating it
//     if (charts[chartId]) {
//       charts[chartId].destroy();
//     }

//     // Create new Chart instance
//     charts[chartId] = new Chart(ctx, {
//       type: 'bar',
//       data: chartData,
//       options: chartOptions,
//     });

//   } catch (error) {
//     console.error(`Error loading data for chart ${chartId}:`, error);
//   }
// }

// // Initialize both charts
// fetchDataAndRenderChart('barChart1');
// fetchDataAndRenderChart('barChart2');
// fetchDataAndRenderChart('barChart3');

// // Add event listeners for reload buttons
// Object.keys(reloadButtons).forEach(chartId => {
//   if (reloadButtons[chartId]) {
//     reloadButtons[chartId].addEventListener('click', () => {
//       fetchDataAndRenderChart(chartId);
//     });
//   }
// });






// Select all canvas elements and buttons
// const ctx1 = document.getElementById('barChart1').getContext('2d');
// const ctx2 = document.getElementById('barChart2').getContext('2d');
// const ctx3 = document.getElementById('barChart3').getContext('2d');

// const reloadButton1 = document.getElementById('reloadButton1');
// const reloadButton2 = document.getElementById('reloadButton2');
// const reloadButton3 = document.getElementById('reloadButton3');

// let barChart1 = null;
// let lineChart2 = null;
// let lineChart3 = null;

// async function fetchDataAndRenderCharts() {
//   try {
//     const response = await fetch('../data/Processed_Job_Role_Data.json');
//     const data = await response.json();

//     const labels = data.map(item => item['Role Name']);
//     const values = data.map(item => item['Role Relevance Score']);

//     // Gradient for bar chart
//     const gradient1 = ctx1.createLinearGradient(0, 0, 0, 400);
//     gradient1.addColorStop(0, 'rgb(146, 61, 65)');
//     gradient1.addColorStop(1, 'rgb(146, 61, 65)');

//     // Data and options for Bar Chart (Chart 1)
//     const barChartData = {
//       labels: labels,
//       datasets: [{
//         label: 'Role Relevance Score (%)',
//         data: values,
//         backgroundColor: gradient1,
//         barThickness: 75,
//         borderWidth: 0,
//         hoverBackgroundColor: gradient1,
//         hoverBorderWidth: 0,
//       }],
//     };

//     const barChartOptions = {
//       responsive: true,
//       scales: {
//         x: {
//           ticks: {
//             color: 'black',
//             font: { family: 'Times New Roman', size: 16 },
//             callback: function (value, index, values) {
//               return this.chart.data.labels[index].split('\n'); 
//             },
//           },
//           grid: { display: false },
//         },
//         y: { ticks: { color: 'black', font: { family: 'Times New Roman', size: 14 }, stepSize: 10 }, grid: { display: false } },
//       },
//       elements: { bar: { borderRadius: 8, borderSkipped: false } },
//     };

//     // Data and options for Line Charts (Chart 2 & Chart 3)
//     const lineChartData = {
//       labels: labels,
//       datasets: [{
//         label: 'Role Relevance Score (%)',
//         data: values,
//         borderColor: 'rgb(0, 123, 255)',
//         backgroundColor: 'rgba(0, 123, 255, 0.2)',
//         borderWidth: 2,
//         pointBackgroundColor: 'rgb(0, 123, 255)',
//         pointRadius: 5,
//         fill: true,
//         tension: 0.4, // Smooth curves
//       }],
//     };

//     const lineChartOptions = {
//       responsive: true,
//       scales: {
//         x: {
//           ticks: {
//             color: 'black',
//             font: { family: 'Times New Roman', size: 16 },
//             callback: function (value, index, values) {
//               return this.chart.data.labels[index].split('\n'); 
//             },
//           },
//           grid: { display: false },
//         },
//         y: { ticks: { color: 'black', font: { family: 'Times New Roman', size: 14 }, stepSize: 10 }, grid: { display: false } },
//       },
//       elements: { line: { borderWidth: 3 } },
//     };

//     // Render Chart 1 (Bar Chart)
//     if (barChart1) {
//       barChart1.data = barChartData;
//       barChart1.update();
//     } else {
//       barChart1 = new Chart(ctx1, { type: 'bar', data: barChartData, options: barChartOptions });
//     }

//     // Render Chart 2 (Line Chart)
//     if (lineChart2) {
//       lineChart2.data = lineChartData;
//       lineChart2.update();
//     } else {
//       lineChart2 = new Chart(ctx2, { type: 'line', data: lineChartData, options: lineChartOptions });
//     }

//     // Render Chart 3 (Line Chart)
//     if (lineChart3) {
//       lineChart3.data = lineChartData;
//       lineChart3.update();
//     } else {
//       lineChart3 = new Chart(ctx3, { type: 'line', data: lineChartData, options: lineChartOptions });
//     }

//   } catch (error) {
//     console.error('Error loading data:', error);
//   }
// }

// // Initial Load
// fetchDataAndRenderCharts();

// // Add event listeners for reload buttons
// reloadButton1.addEventListener('click', fetchDataAndRenderCharts);
// reloadButton2.addEventListener('click', fetchDataAndRenderCharts);
// reloadButton3.addEventListener('click', fetchDataAndRenderCharts);






// Select all canvas elements and buttons
const ctx1 = document.getElementById('Chart1').getContext('2d');
const ctx2 = document.getElementById('Chart2').getContext('2d');
const ctx3 = document.getElementById('Chart3').getContext('2d');
const ctx4 = document.getElementById('Chart4').getContext('2d');

const reloadButton1 = document.getElementById('reloadButton1');
const reloadButton2 = document.getElementById('reloadButton2');
const reloadButton3 = document.getElementById('reloadButton3');
const reloadButton4 = document.getElementById('reloadButton4');

let barChart1 = null;
let lineChart2 = null;
let pieChart3 = null;
let barChart2 = null;

// Separate data fetching from chart rendering
async function fetchData_1() {
  // const response = await fetch('../data/Processed_Job_Role_Data_1.json');
  const response = await fetch('../data/Processed_Performance_Predictions.json');
  const data = await response.json();
  return {
    labels: data.map(item => item['Role Name']),
    values: data.map(item => item['Predicted Role Relevance Score'])
  };
}

// Separate data fetching from chart rendering
async function fetchData_2() {
  const response = await fetch('../data/Processed_Job_Role_Data_2.json');
  const data = await response.json();
  return {
    labels: data.map(item => item['Role Name']),
    values: data.map(item => item['Role Relevance Score'])
  };
}

// Separate data fetching from chart rendering
async function fetchData_3() {
  const response = await fetch('../data/Processed_Job_Role_Data_3.json');
  const data = await response.json();
  return {
    labels: data.map(item => item['Role Name']),
    values: data.map(item => item['Role Relevance Score'])
  };
}

// Separate data fetching from chart rendering
async function fetchData_4() {
  const response = await fetch('../data/Processed_Job_Role_Data_4.json');
  const data = await response.json();
  return {
    labels: data.map(item => item['Role Name']),
    values: data.map(item => item['Role Relevance Score'])
  };
}

// Individual chart rendering functions
async function renderBarChart_1() {
  try {
    const { labels, values } = await fetchData_1();
    
    const gradient1 = ctx1.createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, 'rgb(146, 61, 65)');
    gradient1.addColorStop(1, 'rgb(146, 61, 65)');

    const barChartData = {
      labels: labels,
      datasets: [{
        label: 'Role Relevance Score (%)',
        data: values,
        backgroundColor: gradient1,
        barThickness: 70,
        borderWidth: 0,
        hoverBackgroundColor: gradient1,
        hoverBorderWidth: 0,
      }],
    };

    const barChartOptions = {
      responsive: true,
      animation: {
        duration: 2000,
        easing: 'easeOutBounce',
        delay: function (context) {
          return context.dataIndex * 200;
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#333',
          titleColor: 'white',
          bodyColor: 'white',
          titleFont: { family: 'Times New Roman', size: 16 },
          bodyFont: { family: 'Times New Roman', size: 16 },
          animation: { duration: 200 },
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'black',
            font: { family: 'Times New Roman', size: 16 },
            callback: function (value) {
              return this.getLabelForValue(value).split('\n');
            },
          },
          grid: { display: false },
        },
        y: {
          ticks: {
            color: 'black',
            font: { family: 'Times New Roman', size: 20 },
            stepSize: 10,
          },
          grid: { display: false },
        },
      },
      elements: {
        bar: {
          borderRadius: 8,
          borderSkipped: false,
        },
      },
    };

    if (barChart1) {
      barChart1.data = barChartData;
      barChart1.update();
    } else {
      barChart1 = new Chart(ctx1, { type: 'bar', data: barChartData, options: barChartOptions });
    }
  } catch (error) {
    console.error('Error loading bar chart:', error);
  }
}

async function renderLineChart_1() {
  try {
    const { labels, values } = await fetchData_2();

    const lineChartData = {
      labels: labels,
      datasets: [{
        label: 'Role Relevance Score (%)',
        data: values,
        borderColor: 'rgb(0, 123, 255)',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(0, 123, 255)',
        pointRadius: 5,
        fill: true,
        tension: 0.4,
      }],
    };

    const lineChartOptions = {
      responsive: true,
      animation: {
        duration: 2000,
        easing: 'easeOutBounce',
        delay: function (context) {
          return context.dataIndex * 200;
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#333',
          titleColor: 'white',
          bodyColor: 'white',
          titleFont: { family: 'Times New Roman', size: 16 },
          bodyFont: { family: 'Times New Roman', size: 16 },
          animation: { duration: 200 },
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'black',
            font: { family: 'Times New Roman', size: 16 },
            callback: function (value, index, values) {
              return this.chart.data.labels[index].split('\n'); 
            },
          },
          grid: { display: false },
        },
        y: { ticks: { color: 'black', font: { family: 'Times New Roman', size: 20 }, stepSize: 10 }, grid: { display: false } },
      },
      elements: { line: { borderWidth: 3 } },
    };

    if (lineChart2) {
      lineChart2.data = lineChartData;
      lineChart2.update();
    } else {
      lineChart2 = new Chart(ctx2, { type: 'line', data: lineChartData, options: lineChartOptions });
    }
  } catch (error) {
    console.error('Error loading line chart:', error);
  }
}

async function renderPieChart_1() {
  try {
    const { labels, values } = await fetchData_3();

    const pieChartData = {
      labels: labels,
      datasets: [{
        label: 'Role Relevance Score (%)',
        data: values,
        backgroundColor: values.map(value => {
          return `rgb(16, 85, 0, ${value / 100})`;
        }),
        borderWidth: 4,
      }],
    };

    const pieChartOptions = {
      responsive: true,
      animation: {
        duration: 2000,
        easing: 'easeOutBounce',
        delay: function (context) {
          return context.dataIndex * 200;
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
          backgroundColor: '#333',
          titleColor: 'white',
          bodyColor: 'white',
          titleFont: { family: 'Times New Roman', size: 16 },
          bodyFont: { family: 'Times New Roman', size: 16 },
          animation: { duration: 200 },
        },
        legend: {
          position: 'bottom', // Stack labels vertically on the right
          labels: {
            font: { family: 'Times New Roman', size: 16 },
            color: 'black',
          },
        },
      },
    };    

    if (pieChart3) {
      pieChart3.data = pieChartData;
      pieChart3.update();
    } else {
      pieChart3 = new Chart(ctx3, { type: 'pie', data: pieChartData, options: pieChartOptions });
    }
  } catch (error) {
    console.error('Error loading pie chart:', error);
  }
}

// Individual chart rendering functions
async function renderBarChart_2() {
  try {
    const { labels, values } = await fetchData_4();
    
    const gradient1 = ctx4.createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, 'rgb(146, 61, 65)');
    gradient1.addColorStop(1, 'rgb(146, 61, 65)');

    const barChartData = {
      labels: labels,
      datasets: [{
        label: 'Role Relevance Score (%)',
        data: values,
        backgroundColor: gradient1,
        barThickness: 70,
        borderWidth: 0,
        hoverBackgroundColor: gradient1,
        hoverBorderWidth: 0,
      }],
    };

    const barChartOptions = {
      responsive: true,
      animation: {
        duration: 2000,
        easing: 'easeOutBounce',
        delay: function (context) {
          return context.dataIndex * 200;
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#333',
          titleColor: 'white',
          bodyColor: 'white',
          titleFont: { family: 'Times New Roman', size: 16 },
          bodyFont: { family: 'Times New Roman', size: 16 },
          animation: { duration: 200 },
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'black',
            font: { family: 'Times New Roman', size: 16 },
            callback: function (value) {
              return this.getLabelForValue(value).split('\n');
            },
          },
          grid: { display: false },
        },
        y: {
          ticks: {
            color: 'black',
            font: { family: 'Times New Roman', size: 20 },
            stepSize: 10,
          },
          grid: { display: false },
        },
      },
      elements: {
        bar: {
          borderRadius: 8,
          borderSkipped: false,
        },
      },
    };

    if (barChart2) {
      barChart2.data = barChartData;
      barChart2.update();
    } else {
      barChart2 = new Chart(ctx4, { type: 'bar', data: barChartData, options: barChartOptions });
    }
  } catch (error) {
    console.error('Error loading bar chart:', error);
  }
}

// Initial load of all charts
async function initializeCharts() {
  await renderBarChart_1();
  await renderLineChart_1();
  await renderPieChart_1();
  await renderBarChart_2();
}

// Initialize on page load
initializeCharts();

// Add event listeners for reload buttons - now each button only reloads its specific chart
reloadButton1.addEventListener('click', renderBarChart_1);
reloadButton2.addEventListener('click', renderLineChart_1);
reloadButton3.addEventListener('click', renderPieChart_1);
reloadButton4.addEventListener('click', renderBarChart_2);