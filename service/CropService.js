export function saveCrop(formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/crop`,
      type: "POST",
      data: formData,
      processData: false, // This ensures that jQuery doesn't attempt to convert the form data.
      contentType: false, // This ensures that jQuery doesn't add a Content-Type header.
      success: function (response) {
        console.log("Successfully saved Crop:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error saving Crop:", xhr.responseJSON.message);
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function updateCrop(id, formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/crop/${id}`,
      type: "PUT",
      data: formData,
      processData: false, // This ensures that jQuery doesn't attempt to convert the form data.
      contentType: false, // This ensures that jQuery doesn't add a Content-Type header.
      success: function (response) {
        console.log("Successfully updated Crop:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function deleteCrop(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/crop/${id}`,
      type: "DELETE",
      success: function (response) {
        console.log("Successfully deleted Crop with ID:", id);
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error deleting staff:", error);
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (xhr.status === 404) {
          errorMessage = `Crop with ID ${id} not found.`;
        }
        alert(errorMessage);
      },
    });
  });
}

export function findCropById(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/crop/${id}`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        console.log("Successfully retrieved Crop:", response);
        resolve(response);
      },
      error: function (xhr) {
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (xhr.status === 404) {
          errorMessage = "Crop not found with the provided token.";
        }
        reject(new Error(errorMessage));
      },
    });
  });
}

export function findAllCrop(page) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/crop",
      type: "GET",
      data: { page: page, size: 10 },
      success: function (response) {
        console.log("Successfully retrieved staff:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error fetching staff:", error);
        let errorMessage =
          xhr.responseJSON?.message ||
          "An unexpected error occurred. Please try again.";
        reject(new Error(errorMessage));
      },
    });
  });
}

export function filterCrops(filterData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/crop/filter`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(filterData),
      success: function (response) {
        console.log("Successfully retrieved filtered Crops:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error filtering Crops:", error);
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (xhr.status === 500) {
          errorMessage = "Failed to filter Crops. Please try again.";
        }
        reject(new Error(errorMessage));
      },
    });
  });
}
