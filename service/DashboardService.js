export function getCountOfEntities() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/dashboard/count`,
      dataType: "json",
      success: function (response) {
        console.log("Successfully counted crops:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error counting crops:", error);
      },
    });
  });
}

export function getFieldList(page = 0, size = 10) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/dashboard/field_list`,
      type: "GET",
      data: { page: page, size: size },
      dataType: "json",
      success: function (response) {
        console.log("Successfully retrieved field list:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error fetching field list:", error);
      },
    });
  });
}

export function getChartData() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/dashboard/chart_data`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        console.log("Successfully retrieved chart data:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error fetching chart data:", error);
      },
    });
  });
}

