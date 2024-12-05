export function saveVehicle(vehicleData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/vehicle",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(vehicleData),
      success: function (response) {
        console.log("Successfully saved Vehicle:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function updateVehicle(vehicleId, vehicleData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/vehicle/${vehicleId}`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(vehicleData),
      success: function (response) {
        console.log("Successfully updated Vehicle:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function deleteVehicle(vehicleId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/vehicle/${vehicleId}`,
      type: "DELETE",
      success: function (response) {
        console.log("Successfully deleted Vehicle with ID:", vehicleId);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function findVehicleById(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/vehicle/${id}`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        console.log("Successfully retrieved Vehicle:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function findAllVehicle(page, size) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/vehicle",
      type: "GET",
      data: { page: page, size: size },
      success: function (response) {
        console.log("Successfully retrieved Vehicle:", response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function filterAllVehicle(filterData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/vehicle/filter",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(filterData),
      success: function (response) {
        console.log("Successfully retrieved filtered Vehicle:", response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}
