import { findAllField } from "../../../service/FieldService.js";
import {
  saveCrop,
  findCropById,
  updateCrop,
} from "../../../service/CropService.js";

$(document).ready(function () {
  let currentCropId;
  let loadCropPage;

  $(".close-btn").click(function () {
    $("#field-dpd").empty();
    $("#crop-add-or-update-popup").fadeOut();
    $(".overlay").hide();
    clearCropData();
  });

  // Function to open the field add or update popup
  window.openCropAddOrUpdatePopup = function (cropId, callback) {
    currentCropId = cropId;
    loadCropPage = callback;
    $("#field-dpd").empty();
    loadFieldData();
    if (cropId) {
      $("#crop-add-or-update-popup .title-container h1").text("Update Crop");
      $("#btn-save").hide();
      $("#btn-update").show();
      loadCropData(cropId);
      $("#crop-add-or-update-popup").fadeIn();
      $(".overlay").show();
    } else {
      $("#crop-add-or-update-popup .title-container h1").text("Add Crop");
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#crop-add-or-update-popup").fadeIn();
      $(".overlay").show();
    }
  };

  const loadCropData = async function (cropId) {
    const details = await findCropById(cropId);

    // Example of Base64 image data
    const base64Image = `data:image/png;base64,${details.cropImage}`;

    $(".image-selector").attr("src", base64Image);
    $(".image-selector").show();
    $("#crop-common-name").val(details.commonName);
    $("#crop-scientific-name").val(details.scientificName);
    $("#crop-category").val(details.category);
    $("#crop-season").val(details.season);
    $("#image-input").data(
      "file",
      base64ToFile(details.cropImage, `${details.cropCode}-image.png`)
    );

    setTimeout(() => {
      setValuesToFieldDp(details.fieldDto);
    }, 2000);
  };

  $("form").on("submit", async (e) => {
    e.preventDefault();

    const commonName = $("#crop-common-name").val().trim();
    const scientificName = $("#crop-scientific-name").val().trim();
    const category = $("#crop-category").val().trim();
    const season = $("#crop-season").val().trim();
    const fieldId = $("#field-dpd").val();
    const image =
      $("#image-input")[0].files[0] || $("#image-input").data("file");

    const isValid = validateForm(
      commonName,
      scientificName,
      category,
      season,
      image
    );
    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append("commonName", commonName);
    formData.append("scientificName", scientificName);
    formData.append("category", category);
    formData.append("season", season);

    if (image) {
      formData.append("cropImage", image);
    }

    if (fieldId) {
      formData.append("fCode", fieldId);
    }

    if (currentCropId) {
      await updateCrop(currentCropId, formData);
    } else {
      await saveCrop(formData);
    }

    loadCropPage();
    clearCropData();
    $("#crop-add-or-update-popup").fadeOut();
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

      // Display the selected image using FileReader
      const reader = new FileReader();
      reader.onload = function (e) {
        $imageSelector.attr("src", e.target.result);
        $imageSelector.show();
      };
      reader.readAsDataURL(file);
    }
  });

  $("#field-dpd").select2();

  // Function to clear the field data
  function clearCropData() {
    $("#crop-common-name").val("");
    $("#crop-scientific-name").val("");
    $("#crop-category").val("");
    $("#crop-season").val("");
    $("#field-dpd").empty();
    $(".image-selector").hide();
  }

  function setValuesToFieldDp(field) {
    if ($("#field-dpd").val(field.fcode)) {
      $("#field-dpd").val(field.fcode).trigger("change");
    }
  }

  // Function to validate the form inputs
  function validateForm(commonName, scientificName, category, season, image) {
    const nameRegex = /^[A-Za-z ]+$/;

    if (!nameRegex.test(commonName)) {
      $("#crop-common-name")[0].setCustomValidity(
        "Common name can only contain letters and spaces."
      );
      $("#crop-common-name")[0].reportValidity();
      return false;
    }
    if (!nameRegex.test(scientificName)) {
      $("#crop-scientific-name")[0].setCustomValidity(
        "Scientific name can only contain letters and spaces."
      );
      $("#crop-scientific-name")[0].reportValidity();
      return false;
    }
    if (!nameRegex.test(category)) {
      $("#crop-category")[0].setCustomValidity(
        "Category can only contain letters and spaces."
      );
      $("#crop-category")[0].reportValidity();
      return false;
    }
    if (!nameRegex.test(season)) {
      $("#crop-season")[0].setCustomValidity(
        "Season can only contain letters and spaces."
      );
      $("#crop-season")[0].reportValidity();
      return false;
    }
    if (!image) {
      alert("Please upload a image.");
      return false;
    }
    return true;
  }
});

// Load data for the field dropdown
function loadFieldData() {
  findAllField().then((fieldist) => {
    const fieldDropdown = $("#field-dpd");
    fieldDropdown.empty().append('<option value="" >Select a Field</option>');
    fieldist.forEach((field) => {
      const option = $(
        `<option value="${field.fcode}" data-id="${field.fcode}">${field.fieldName}</option>`
      );
      fieldDropdown.append(option);
    });
    fieldDropdown.trigger("change");
  });
}

const base64ToFile = function (base64String, filename) {
  const binaryString = atob(base64String.replace(/_/g, "/").replace(/-/g, "+"));
  const byteArray = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  const file = new File([byteArray], filename, {
    type: "image/png",
  });
  return file;
};
