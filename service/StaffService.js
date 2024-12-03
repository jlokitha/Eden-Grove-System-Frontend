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
        console.error("Error saving staff:", error);
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (xhr.status === 400) {
          errorMessage = "Email already exists for the staff member.";
        } else if (xhr.status === 500) {
          errorMessage = "Failed to persist staff data. Please try again.";
        }
        reject(new Error(errorMessage));
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
        console.error("Error updating staff:", error);
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (xhr.status === 404) {
          errorMessage = "Staff not found with the provided ID.";
        } else if (xhr.status === 400) {
          errorMessage = "Email already exists for the staff member.";
        } else if (xhr.status === 500) {
          errorMessage = "Failed to persist staff data. Please try again.";
        }
        reject(new Error(errorMessage));
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
        console.error("Error deleting staff:", error);
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (xhr.status === 404) {
          errorMessage = `Staff with ID ${staffId} not found.`;
        } else if (xhr.status === 500) {
          errorMessage = "Failed to delete staff data. Please try again.";
        }
        reject(new Error(errorMessage));
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
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (xhr.status === 404) {
          errorMessage = "Staff not found with the provided token.";
        }
        reject(new Error(errorMessage));
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
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (xhr.status === 404) {
          errorMessage = "Staff not found with the provided token.";
        }
        reject(new Error(errorMessage));
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
        console.error("Error fetching staff:", error);
        let errorMessage =
          xhr.responseJSON?.message ||
          "An unexpected error occurred. Please try again.";
        reject(new Error(errorMessage));
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
        console.error("Error fetching staff:", error);
        let errorMessage =
          xhr.responseJSON?.message ||
          "An unexpected error occurred. Please try again.";
        reject(new Error(errorMessage));
      },
    });
  });
}
