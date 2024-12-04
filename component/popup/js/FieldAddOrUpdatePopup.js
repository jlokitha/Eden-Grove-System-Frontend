import { findAllStaff } from "../../../service/StaffService.js";
import {
  saveField,
  findFieldById,
  updateField,
} from "../../../service/FieldService.js";

$(document).ready(function () {
  let currentFieldId;
  let loadFieldPage;
  let selectedStaffIds = [];
  let selectedEquipmentIds = [];

  $(".close-btn").click(function () {
    $("#staff-dpd").empty();
    $("#equipment-dpd").empty();
    $("#staff-count").text(`Staff: 0`);
    $("#equipment-count").text(`Equipments: 0`);
    selectedEquipmentIds = [];
    selectedStaffIds = [];
    $("#field-add-or-update-popup").fadeOut();
    $(".overlay").hide();
    clearFieldData();
  });

  // Function to open the staff add or update popup
  window.openFieldAddOrUpdatePopup = function (fieldId, callback) {
    loadFieldPage = callback;
    $("#staff-dpd").empty();
    $("#equipment-dpd").empty();
    loadStaffData();
    // loadEquipmentData();
    if (fieldId) {
      currentFieldId = fieldId;
      $("#field-add-or-update-popup .title-container h1").text("Update Field");
      $("#btn-save").hide();
      $("#btn-update").show();
      loadFieldData(fieldId);
      $("#field-add-or-update-popup").fadeIn();
      $(".overlay").show();
    } else {
      $("#field-add-or-update-popup .title-container h1").text("Add Field");
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#field-add-or-update-popup").fadeIn();
      $(".overlay").show();
    }
  };

  const loadFieldData = async function (fieldId) {
    const details = await findFieldById(fieldId);

    // Example of Base64 image data
    const base64Image1 = `data:image/png;base64,${details.fieldImage1}`;
    const base64Image2 = `data:image/png;base64,${details.fieldImage2}`;

    $(".image-selector-1").attr("src", base64Image1);
    $(".image-selector-1").show();
    $(".image-selector-2").attr("src", base64Image2);
    $(".image-selector-2").show();
    $("#field-name-in").val(details.fieldName);
    $("#field-size-in").val(details.fieldSize);
    $("#field-url-in").val(getGoogleMapsUrl(details.fieldLocation));
    $("#image-input-1").data(
      "file",
      base64ToFile(details.fieldImage1, `${fieldId}-image-1.png`)
    );
    $("#image-input-2").data(
      "file",
      base64ToFile(details.fieldImage2, `${fieldId}-image-2.png`)
    );

    setValuesToStaffDp(details.staffs);
    setValuesToEquipmentDp(details.equipments);
  };

  $("form").on("submit", async (e) => {
    e.preventDefault();

    const name = $("#field-name-in").val().trim();
    const size = $("#field-size-in").val().trim();
    const location = $("#field-url-in").val().trim();
    const image1 =
      $("#image-input-1")[0].files[0] || $("#image-input-1").data("file");
    const image2 =
      $("#image-input-2")[0].files[0] || $("#image-input-2").data("file");

    const isValid = validateForm(name, image1, image2);
    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append("fieldName", name);
    formData.append("fieldSize", size);
    formData.append("fieldLocation", extractCoordinatesFromUrl(location));

    if (image1) {
      formData.append("fieldImage1", image1);
    }
    if (image2) {
      formData.append("fieldImage2", image2);
    }

    if (selectedStaffIds.length > 0) {
      formData.append("staffIds", selectedStaffIds);
    }
    if (selectedEquipmentIds.length > 0) {
      formData.append("equipmentCodes", selectedEquipmentIds);
    }

    if (currentFieldId) {
      await updateField(currentFieldId, formData);
    } else {
      await saveField(formData);
    }

    loadFieldPage();
    clearFieldData();
    $("#field-add-or-update-popup").fadeOut();
    $(".overlay").hide();
  });

  $(".image-input").on("click", function (event) {
    event.stopPropagation();
  });

  $(".image-1-container").on("click", function () {
    $("#image-input-1").trigger("click");
  });

  $("#image-input-1").on("change", function (event) {
    const file = event.target.files[0];
    const $imageSelector = $(".image-selector-1");

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      // Validate file size
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10 MB.");
        return;
      }

      // Display the selected image using FileReader
      const reader = new FileReader();
      reader.onload = function (e) {
        $imageSelector.attr("src", e.target.result);
        $imageSelector.show();
      };
      reader.readAsDataURL(file);
    }
  });

  $(".image-2-container").on("click", function () {
    $("#image-input-2").trigger("click");
  });

  $("#image-input-2").on("change", function (event) {
    const file = event.target.files[0];
    const $imageSelector = $(".image-selector-2");

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      // Validate file size
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10 MB.");
        return;
      }

      // Display the selected image using FileReader
      const reader = new FileReader();
      reader.onload = function (e) {
        $imageSelector.attr("src", e.target.result);
        $imageSelector.show();
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle staff dropdown selection
  $("#staff-dpd").on("select2:select", function (e) {
    const selectedId = e.params.data.element.dataset.id;
    if (!selectedStaffIds.includes(selectedId)) {
      selectedStaffIds.push(selectedId); // Add to array if not already included
    }
    refreshStaffCount();
    console.log("Selected Staff IDs:", selectedStaffIds);
  });

  // Handle deselection from staff dropdown
  $("#staff-dpd").on("select2:unselect", function (e) {
    const deselectedId = e.params.data.element.dataset.id;
    selectedStaffIds = selectedStaffIds.filter((id) => id !== deselectedId); // Remove from array
    refreshStaffCount();
    console.log("Selected Staff IDs:", selectedStaffIds);
  });

  // Handle equipment dropdown selection
  $("#equipment-dpd").on("select2:select", function (e) {
    const selectedId = e.params.data.element.dataset.id;
    if (!selectedEquipmentIds.includes(selectedId)) {
      selectedEquipmentIds.push(selectedId);
    }
    refreshEquipmentCount();
    console.log("Selected Equipment IDs:", selectedEquipmentIds);
  });

  // Handle deselection from equipment dropdown
  $("#equipment-dpd").on("select2:unselect", function (e) {
    const deselectedId = e.params.data.element.dataset.id;
    selectedEquipmentIds = selectedEquipmentIds.filter(
      (id) => id !== deselectedId
    );
    refreshEquipmentCount();
    console.log("Selected Equipment IDs:", selectedEquipmentIds);
  });

  $("#staff-dpd").select2({
    placeholder: "Select Staff",
    closeOnSelect: false,
  });

  $("#equipment-dpd").select2({
    placeholder: "Select Equipments",
    closeOnSelect: false,
  });

  // Function to clear the field data
  function clearFieldData() {
    $("#field-name-in").val("");
    $("#field-size-in").val("");
    $("#field-url-in").val("");
    $("#image-input-1").val("");
    $("#image-input-2").val("");
    $("#staff-dpd").empty();
    $("#equipment-dpd").empty();
    $(".image-selector-1").hide();
    $(".image-selector-2").hide();
    selectedStaffIds = [];
    selectedEquipmentIds = [];
  }

  function setValuesToStaffDp(staffs) {
    if (staffs.length === 0) return;
    staffs.forEach((staff) => {
      selectedStaffIds.push(staff.id);
    });
    $("#staff-dpd").val(selectedStaffIds).trigger("change");
    refreshStaffCount();
  }

  function setValuesToEquipmentDp(equipments) {
    if (equipments.length === 0) return;
    equipments.forEach((equipment) => {
      selectedEquipmentIds.push(equipment.id);
    });
    $("#equipment-dpd").val(selectedEquipmentIds).trigger("change");
    refreshEquipmentCount();
  }

  function refreshStaffCount() {
    const staffCount = selectedStaffIds.length;
    $("#staff-count").text(`Staff: ${staffCount}`);
  }

  function refreshEquipmentCount() {
    const equipmentCount = selectedEquipmentIds.length;
    $("#equipment-count").text(`Equipments: ${equipmentCount}`);
  }

  function extractCoordinatesFromUrl(url) {
    // Regular expressions for matching latitude and longitude
    const regex1 = /(?:\?q=|@)(-?\d+\.\d+),(-?\d+\.\d+)/; // Matches ?q=lat,lng or @lat,lng
    const regex2 = /@(-?\d+\.\d+),(-?\d+\.\d+),/; // Matches @lat,lng,zoom
    let match;

    // Try matching against each regex pattern
    if ((match = url.match(regex1)) || (match = url.match(regex2))) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return `${lat},${lng}`;
      }
    }

    console.error("Coordinates not found in the URL.");
    return null;
  }

  // Function to validate the form inputs
  function validateForm(fieldName, fieldImage1, fieldImage2) {
    const nameRegex = /^[A-Za-z ]+$/;

    if (!nameRegex.test(fieldName)) {
      $("#field-name-in")[0].setCustomValidity(
        "Field name can only contain letters and spaces."
      );
      $("#field-name-in")[0].reportValidity();
      return false;
    }
    if (!fieldImage1) {
      alert("Please upload the first image.");
      return false;
    }
    if (!fieldImage2) {
      alert("Please upload the second image.");
      return false;
    }
    return true;
  }
});

const base64ToFile = function (base64String, filename) {
  const binaryString = atob(base64String.replace(/_/g, "/").replace(/-/g, "+"));
  const byteArray = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  const file = new File([byteArray], filename, {
    type: "image/png",
  });
  return file;
};

// Function to get Google Maps URL
function getGoogleMapsUrl(locationString) {
  // Split the string into x and y values
  const [x, y] = locationString.split(",").map(Number);
  // Construct the Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps?q=${x},${y}&z=15`;
  return googleMapsUrl;
}

// Load data for the staff dropdown
function loadStaffData() {
  findAllStaff().then((staffList) => {
    const staffDropdown = $("#staff-dpd");
    staffDropdown.empty().append('<option value="">Select Staff</option>');
    staffList.forEach((staff) => {
      const option = $(
        `<option value="${staff.id}" data-id="${staff.id}">${staff.name}</option>`
      );
      staffDropdown.append(option);
    });
    staffDropdown.trigger("change"); // Refresh Select2 options
  });
}
