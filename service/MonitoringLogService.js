export function saveLog(formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/monitoringlog`,
      type: "POST",
      data: formData,
      processData: false, // This ensures that jQuery doesn't attempt to convert the form data.
      contentType: false, // This ensures that jQuery doesn't add a Content-Type header.
      success: function (response) {
        console.log("Successfully saved Log:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error saving Log:", xhr.responseJSON.message);
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function updateLog(id, formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/monitoringlog/${id}`,
      type: "PUT",
      data: formData,
      processData: false, // This ensures that jQuery doesn't attempt to convert the form data.
      contentType: false, // This ensures that jQuery doesn't add a Content-Type header.
      success: function (response) {
        console.log("Successfully updated Log:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function deleteLog(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/monitoringlog/${id}`,
      type: "DELETE",
      success: function (response) {
        console.log("Successfully deleted Log with ID:", id);
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error deleting Log:", error);
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (xhr.status === 404) {
          errorMessage = `Log with ID ${id} not found.`;
        }
        alert(errorMessage);
      },
    });
  });
}

export function findLogById(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/monitoringlog/${id}`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        console.log("Successfully retrieved Log:", response);
        resolve(response);
      },
      error: function (xhr) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function findAllLog(page) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/monitoringlog",
      type: "GET",
      data: { page: page, size: 10 },
      success: function (response) {
        console.log("Successfully retrieved Log:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function filterLogs(filterData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/monitoringlog/filter`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(filterData),
      success: function (response) {
        console.log("Successfully retrieved filtered Logs:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}
