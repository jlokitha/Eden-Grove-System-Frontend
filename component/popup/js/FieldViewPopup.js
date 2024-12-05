import { findFieldById } from "../../../service/FieldService.js";

$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#equipment-tag-container").empty();
    $("#crop-tag-container").empty();
    $("#staff-tag-container").empty();
    $("#field-view-popup").fadeOut();
    $(".overlay").hide();
  });

  // Function to show staff details in the popup
  window.showFieldDetailsPopup = async function (fieldId) {
    const details = await findFieldById(fieldId);

    // Example of Base64 image data
    const base64Image1 = `data:image/png;base64,${details.fieldImage1}`;
    const base64Image2 = `data:image/png;base64,${details.fieldImage2}`;

    $("#field-image-1").attr("src", base64Image1);
    $("#field-image-2").attr("src", base64Image2);
    $("#lbl-name").text(details.fieldName);
    $("#lbl-size").text(details.fieldSize + " Sq.mt");
    $("#field-location").attr("href", getGoogleMapsUrl(details.fieldLocation));

    if (details.crops.length > 0) {
      $(".crop-lbl").show();
      $("#crop-tag-container").show();

      const tagContainer = $("#crop-tag-container");
      details.crops.forEach((crop) => {
        const p = $("<p></p>").text(
          `${crop.commonName} (${crop.scientificName})`
        );
        tagContainer.append(p);
      });
    } else {
      $(".crop-lbl").hide();
      $("#crop-tag-container").hide();
    }

    if (details.staffs.length > 0) {
      $(".staff-lbl").show();
      $("#staff-tag-container").show();

      const tagContainer = $("#staff-tag-container");
      details.staffs.forEach((staff) => {
        const p = $("<p></p>").text(`${staff.name}`);
        tagContainer.append(p);
      });
    } else {
      $(".staff-lbl").hide();
      $("#staff-tag-container").hide();
    }

    if (details.equipments.length > 0) {
      $(".equipment-lbl").show();
      $("#equipment-tag-container").show();

      const tagContainer = $("#equipment-tag-container");
      details.equipments.forEach((equipment) => {
        const p = $("<p></p>").text(`${equipment.name}`);
        tagContainer.append(p);
      });
    } else {
      $(".equipment-lbl").hide();
      $("#equipment-tag-container").hide();
    }

    $("#field-view-popup").fadeIn();
    $(".overlay").show();
  };

  // Function to get Google Maps URL
  function getGoogleMapsUrl(locationString) {
    // Split the string into x and y values
    const [x, y] = locationString.split(",").map(Number);
    // Construct the Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps?q=${x},${y}&z=15`;
    return googleMapsUrl;
  }

  $("#carousel").carousel({
    interval: 2000, // Set auto-slide every 2 seconds, optional
  });
  $("#carousel").carousel("next"); // To go to the next slide
  $("#carousel").carousel("prev"); // To go to the previous slide
});
