export function updateUser(userData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/user`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(userData),
      success: function (response) {
        console.log("Successfully updated User:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/user/${userId}`,
      type: "DELETE",
      success: function (response) {
        console.log("Successfully deleted User with ID:", userId);
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error deleting User:", error);
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (xhr.status === 404) {
          errorMessage = `User with ID ${userId} not found.`;
        }
        alert(errorMessage);
      },
    });
  });
}

export function findAllUser(page, size) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/user",
      type: "GET",
      data: { page: page, size: size },
      success: function (response) {
        console.log("Successfully retrieved User:", response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching User:", error);
      },
    });
  });
}

export function filterAllUser(filterData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/user/filter",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(filterData),
      success: function (response) {
        console.log("Successfully retrieved filtered user:", response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching user:", error);
      },
    });
  });
}