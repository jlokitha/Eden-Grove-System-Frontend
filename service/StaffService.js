export function saveStaff(staffData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/staff",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(staffData),
      success: function (response) {
        console.log("Successfully saved staff:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function updateStaff(staffData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/staff`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(staffData),
      success: function (response) {
        console.log("Successfully updated staff:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function deleteStaff(staffId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/staff/${staffId}`,
      type: "DELETE",
      success: function (response) {
        console.log("Successfully deleted staff with ID:", staffId);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function findStaffByToken() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/staff/data`,
      type: "GET",
      success: function (response) {
        console.log("Successfully retrieved staff:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function findStaffById(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/staff/${id}`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        console.log("Successfully retrieved staff:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function findAllStaff(page, size) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/staff",
      type: "GET",
      data: { page: page, size: size },
      success: function (response) {
        console.log("Successfully retrieved staff:", response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function filterAllStaff(filterData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/staff/filter",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(filterData),
      success: function (response) {
        console.log("Successfully retrieved filtered staff:", response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}
