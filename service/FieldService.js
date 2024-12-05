export function saveField(formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/field`,
      type: "POST",
      data: formData,
      processData: false, // This ensures that jQuery doesn't attempt to convert the form data.
      contentType: false, // This ensures that jQuery doesn't add a Content-Type header.
      success: function (response) {
        console.log("Successfully saved field:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function updateField(fieldId, formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/field/${fieldId}`,
      type: "PUT",
      data: formData,
      processData: false, // This ensures that jQuery doesn't attempt to convert the form data.
      contentType: false, // This ensures that jQuery doesn't add a Content-Type header.
      success: function (response) {
        console.log("Successfully updated field:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function deleteField(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/field/${id}`,
      type: "DELETE",
      success: function (response) {
        console.log("Successfully deleted field with ID:", id);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function findFieldById(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/field/${id}`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        console.log("Successfully retrieved field:", response);
        resolve(response);
      },
      error: function (xhr) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}

export function findAllField(page) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/field",
      type: "GET",
      data: { page: page, size: 10 },
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

export function filterFields(filterData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/field/filter`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(filterData),
      success: function (response) {
        console.log("Successfully retrieved filtered fields:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        alert(xhr.responseJSON.message);
      },
    });
  });
}
