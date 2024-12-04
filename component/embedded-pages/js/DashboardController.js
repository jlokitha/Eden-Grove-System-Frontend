import {
  getCountOfEntities,
  getFieldList,
  getChartData,
} from "../../../service/DashboardService.js";
import { findAllLog } from "../../../service/MonitoringLogService.js";

$(document).ready(function () {
  $.ajaxSetup({
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  loadCounts();
  loadFieldList();
  loadLogList();
  loadChartData();

  async function loadCounts() {
    const obj = await getCountOfEntities();

    $("#staff-count").text(obj.staffCount);
    $("#vehicle-count").text(obj.fieldCount);
    $("#field-count").text(obj.cropCount);
    $("#crop-count").text(obj.vehicleCount);
  }

  async function loadFieldList() {
    const fields = await getFieldList({ page: 0, size: 10 });
    const fieldContainer = $("#field-card-container");

    fields.forEach((field) => {
      const fieldCard = `
              <div
                class="horizontal-card d-flex justify-content-start align-items-center"
              >
                <img src="data:image/png;base64,${field.fieldImage1}" alt="" />
                <div class="text-container d-flex flex-column">
                  <label class="card-title">${field.fieldName}</label>
                  <label class="card-text">${field.fieldSize} Sq.mt</label>
                  <div class="count-container d-flex justify-content-between">
                    <label class="staff-count">Staff: ${field.staffList}</label>
                    <label class="crop-count">Crop: ${field.cropList}</label>
                  </div>
                </div>
              </div>
      `;
      fieldContainer.append(fieldCard);
    });
    fieldContainer[0].scrollTop = fieldContainer[0].scrollTop;
  }

  async function loadLogList() {
    const logs = await findAllLog({ page: 0, size: 10 });
    const logContainer = $("#log-card-container");

    logs.forEach((log) => {
      const logCard = `
        <div
          class="horizontal-card d-flex justify-content-start align-items-center"
        >
          <img src="data:image/png;base64,${log.observedImage}" alt="" />
          <div class="text-container d-flex flex-column">
            <label class="card-title">${log.logCode}</label>
            <label class="card-text">${new Date(log.logDate)
              .toISOString()
              .slice(0, 10)}</label>
            <label class="field-name">Field: ${log.field.fieldName}</label>
          </div>
          
        </div>
      `;
      logContainer.append(logCard);
    });
  }

  async function loadChartData() {
    try {
      const chartData = await getChartData();

      // Calculate the total log count
      const totalLogs = chartData.reduce((sum, item) => sum + item.logCount, 0);

      // Transform data into labels and percentages
      const labels = chartData.map((item) => item.fieldName);
      const data = chartData.map(
        (item) => ((item.logCount / totalLogs) * 100).toFixed(2) // Calculate percentage
      );

      // Update the chart
      myDoughnutChart.data.labels = labels;
      myDoughnutChart.data.datasets[0].data = data;
      myDoughnutChart.update();
    } catch (error) {
      console.error("Failed to load chart data:", error.message);
    }
  }

  var ctx = document.getElementById("myDoughnutChart").getContext("2d");
  var myDoughnutChart = new Chart(ctx, {
    type: "doughnut", // The type of chart
    data: {
      labels: [], // Initially empty labels
      datasets: [
        {
          label: "Field Chart", // Label for the dataset
          data: [], // Initially empty data
          backgroundColor: [
            "#1dbc5d",
            "#1dbccd",
            "#1d7dbc",
            "#b4db1d",
            "#1d96bc",
          ], // Colors for the sections
          hoverOffset: 4, // Optional: space around the sections when hovered
        },
      ],
    },
    options: {
      responsive: true, // Makes the chart responsive to screen size
      plugins: {
        legend: {
          position: "top", // Position of the legend
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ": " + tooltipItem.raw + "%"; // Tooltip content format
            },
          },
        },
      },
    },
  });

  function getCookie(name) {
    return document.cookie.split("; ").reduce((acc, cookie) => {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
      return acc;
    }, null);
  }
});
