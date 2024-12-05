import { findAllStaff } from "../../../service/StaffService.js";
import { findCropOfField } from "../../../service/CropService.js";
import { findAllField } from "../../../service/FieldService.js";
import {
  findLogById,
  saveLog,
  updateLog,
} from "../../../service/MonitoringLogService.js";

$(document).ready(function () {
  let currentLogId;
  let loadLogPage;
  let selectedStaffIds = [];
  let selectedCropIds = [];

  $(".close-btn").click(function () {
    $("#field-dp").empty();
    $("#crop-dp").empty();
    $("#staff-dp").empty();
    $("#log-add-or-update-popup").fadeOut();
    $(".overlay").hide();
    clearLogData();
  });

  // Function to open the staff add or update popup
  window.openLogAddOrUpdatePopup = function (logId, callback) {
    loadLogPage = callback;
    $("#field-dp").empty();
    $("#crop-dp").empty();
    $("#staff-dp").empty();

    loadFieldData();
    loadStaffData();
    if (logId) {
      currentLogId = logId;
      $("#log-add-or-update-popup .title-container h1").text("Update Log");
      $("#btn-save").hide();
      $("#btn-update").show();
      loadLogData(logId);
      $("#log-add-or-update-popup").fadeIn();
      $(".overlay").show();
    } else {
      $("#log-add-or-update-popup .title-container h1").text("Add Log");
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#log-add-or-update-popup").fadeIn();
      $(".overlay").show();
    }
  };

  const loadLogData = async function (logId) {
    const details = await findLogById(logId);

    // Example of Base64 image data
    const base64Image = `data:image/png;base64,${details.observedImage}`;

    $(".image-selector").attr("src", base64Image);
    $(".image-selector").show();
    $("#observation-ta").val(details.observation);
    $("#image-input").data(
      "file",
      base64ToFile(details.observedImage, `${details.logId}-image.png`)
    );

    setTimeout(() => {
      setValuesToFieldDp(details.field);
    }, 1500);
    setTimeout(() => {
      setValuesToCropDp(details.crops);
    }, 2500);
    setValuesToStaffDp(details.staffs);
  };

  $("form").on("submit", async (e) => {
    e.preventDefault();

    const observation = $("#observation-ta").val().trim();
    const fieldId = $("#field-dp").val();
    const image =
      $("#image-input")[0].files[0] || $("#image-input").data("file");

    const isValid = validateForm(
      observation,
      fieldId,
      selectedStaffIds,
      selectedCropIds,
      image
    );
    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append("observation", observation);
    formData.append("observedImage", image);
    formData.append("fieldCode", fieldId);
    formData.append("staffs", selectedStaffIds);
    formData.append("crops", selectedCropIds);

    if (currentLogId) {
      await updateLog(currentLogId, formData);
    } else {
      await saveLog(formData);
    }

    loadLogPage();
    clearLogData();
    $("#log-add-or-update-popup").fadeOut();
    $(".overlay").hide();
  });

  $(".image-input").on("click", function (event) {
    event.stopPropagation();
  });

  $(".image-container").on("click", function () {
    $("#image-input").trigger("click");
  });

  $("#image-input").on("change", function (event) {
    const file = event.target.files[0];
    const $imageSelector = $(".image-selector");

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

      const reader = new FileReader();
      reader.onload = function (e) {
        $imageSelector.attr("src", e.target.result);
        $imageSelector.show();
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle staff dropdown selection
  $("#staff-dp").on("select2:select", function (e) {
    const selectedId = e.params.data.element.dataset.id;
    if (!selectedStaffIds.includes(selectedId)) {
      selectedStaffIds.push(selectedId);
    }
    refreshStaffCount();
  });

  // Handle deselection from staff dropdown
  $("#staff-dp").on("select2:unselect", function (e) {
    const deselectedId = e.params.data.element.dataset.id;
    selectedStaffIds = selectedStaffIds.filter((id) => id !== deselectedId);
    refreshStaffCount();
  });

  // Handle equipment dropdown selection
  $("#crop-dp").on("select2:select", function (e) {
    const selectedId = e.params.data.element.dataset.id;
    if (!selectedCropIds.includes(selectedId)) {
      selectedCropIds.push(selectedId);
    }
    refreshCropCount();
  });

  // Handle deselection from equipment dropdown
  $("#crop-dp").on("select2:unselect", function (e) {
    const deselectedId = e.params.data.element.dataset.id;
    selectedCropIds = selectedCropIds.filter((id) => id !== deselectedId);
    refreshCropCount();
  });

  $("#staff-dp").select2({
    placeholder: "Select Staff",
    closeOnSelect: false,
  });

  $("#crop-dp").select2({
    placeholder: "Select crops",
    closeOnSelect: false,
  });

  $("#field-dp").select2();

  $("#field-dp").on("change", function () {
    const fieldId = $(this).val();
    if (fieldId) {
      $("#crop-dp").empty();
      selectedCropIds = [];
      refreshCropCount();
      loadCropData(fieldId);
    }
  });

  function clearLogData() {
    $("#observation-ta").val("");
    $("#image-input").val("");
    $("#staff-dp").empty();
    $("#crop-dp").empty();
    $("#field-dp").empty();
    $(".image-selector").hide();
    selectedStaffIds = [];
    selectedCropIds = [];
  }

  function setValuesToStaffDp(staffs) {
    if (staffs.length === 0) return;
    staffs.forEach((staff) => {
      selectedStaffIds.push(staff.id);
    });
    $("#staff-dp").val(selectedStaffIds).trigger("change");
    refreshStaffCount();
  }

  function setValuesToCropDp(crops) {
    if (crops.length === 0) return;
    crops.forEach((crop) => {
      selectedCropIds.push(crop.cropCode);
    });
    $("#crop-dp").val(selectedCropIds).trigger("change");
    refreshCropCount();
  }

  function setValuesToFieldDp(field) {
    if (!field) return;

    $("#field-dp").val(field.fcode).trigger("change");
  }

  function refreshStaffCount() {
    const staffCount = selectedStaffIds.length;
    $("#staff-count").text(`Staff: ${staffCount}`);
  }

  function refreshCropCount() {
    const cropCount = selectedCropIds.length;
    $("#crop-count").text(`crops: ${cropCount}`);
  }

  // Function to validate the form inputs
  function validateForm(
    observation,
    fieldId,
    selectedStaffIds,
    selectedCropIds,
    image
  ) {
    if (!fieldId) {
      $("#field-dp")[0].setCustomValidity(
        "Please select a field from the dropdown."
      );
      $("#field-dp")[0].reportValidity();
      return false;
    }
    if (!selectedCropIds.length > 0) {
      $("#crop-dp")[0].setCustomValidity(
        "Please select at least one crop from the dropdown."
      );
      $("#crop-dp")[0].reportValidity();
      return false;
    }
    if (!selectedStaffIds.length > 0) {
      $("#staff-dp")[0].setCustomValidity(
        "Please select at least one staff from the dropdown."
      );
      $("#staff-dp")[0].reportValidity();
      return false;
    }
    if (!observation) {
      $("#observation-ta")[0].setCustomValidity(
        "Please enter the observation details."
      );
      $("#observation-ta")[0].reportValidity();
      return false;
    }
    if (!image) {
      alert("Please upload the observation image.");
      return false;
    }
    return true;
  }

  const base64ToFile = function (base64String, filename) {
    const binaryString = atob(
      base64String.replace(/_/g, "/").replace(/-/g, "+")
    );
    const byteArray = Uint8Array.from(binaryString, (char) =>
      char.charCodeAt(0)
    );
    const file = new File([byteArray], filename, {
      type: "image/png",
    });
    return file;
  };
});

function loadStaffData() {
  findAllStaff().then((staffList) => {
    const staffDropdown = $("#staff-dp");
    staffDropdown.empty();
    staffList.forEach((staff) => {
      const option = $(
        `<option value="${staff.id}" data-id="${staff.id}">${staff.name}</option>`
      );
      staffDropdown.append(option);
    });
    staffDropdown.trigger("change");
  });
}

function loadCropData(fieldId) {
  findCropOfField(fieldId).then((cropList) => {
    const cropDp = $("#crop-dp");
    cropDp.empty();
    cropList.forEach((crop) => {
      const option = $(
        `<option value="${crop.cropCode}" data-id="${crop.cropCode}">${crop.commonName}</option>`
      );
      cropDp.append(option);
    });
    cropDp.trigger("change");
  });
}

function loadFieldData() {
  findAllField().then((fieldList) => {
    const fieldDp = $("#field-dp");
    fieldDp.empty().append('<option value="" disable>Select a Field</option>');
    fieldList.forEach((field) => {
      const option = $(
        `<option value="${field.fcode}" data-id="${field.fcode}">${field.fieldName}</option>`
      );
      fieldDp.append(option);
    });
    fieldDp.trigger("change");
  });
}
