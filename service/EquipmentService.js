export function saveEquipment(equipmentData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/equipment",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(equipmentData),
      success: function (response) {
        console.log("Successfully saved Equipment:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function updateEquipment(equipmentId, equipmentData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/equipment/${equipmentId}`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(equipmentData),
      success: function (response) {
        console.log("Successfully updated Equipment:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function deleteEquipment(equipmentId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/equipment/${equipmentId}`,
      type: "DELETE",
      success: function (response) {
        console.log("Successfully deleted Equipment with ID:", equipmentId);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function findEquipmentById(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/equipment/${id}`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        console.log("Successfully retrieved Equipment:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        let errorMessage = "An unexpected error occurred. Please try again!";
        if (xhr.status === 404) {
          errorMessage = "Equipment not found";
        }
        alert(errorMessage);
      },
    });
  });
}

export function findAllEquipment(page, size) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/equipment",
      type: "GET",
      data: { page: page, size: size },
      success: function (response) {
        console.log("Successfully retrieved Equipment:", response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching Equipments:", error);
      },
    });
  });
}

export function filterAllEquipment(filterData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/equipment/filter",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(filterData),
      success: function (response) {
        console.log("Successfully retrieved filtered Equipment:", response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching Equipments:", error);
      },
    });
  });
}
