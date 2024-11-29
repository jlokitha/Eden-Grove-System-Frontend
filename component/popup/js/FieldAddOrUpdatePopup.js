$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#field-add-or-update-popup").hide();
    $(".overlay").hide();
  });

  // Function to open the staff add or update popup
  window.openFieldAddOrUpdatePopup = function (fieldId) {
    if (fieldId) {
      $("#field-add-or-update-popup .title-container h1").text("Update Field");
      $("#btn-save").hide();
      $("#btn-update").show();
      $("#field-add-or-update-popup").show();
      $(".overlay").show();
    } else {
      $("#field-add-or-update-popup .title-container h1").text("Add Field");
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#field-add-or-update-popup").show();
      $(".overlay").show();
    }
  };

  // Function to open the staff delete popup
  function extractCoordinatesFromUrl(url) {
    // Regular expression to match latitude and longitude in Google Maps URLs
    const regex = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    // Execute the regex on the URL
    const match = url.match(regex);
    if (match) {
      // Extract latitude (x) and longitude (y) from the match
      const x = parseFloat(match[1]);
      const y = parseFloat(match[2]);
      return { x, y };
    } else {
      console.error("Coordinates not found in the URL.");
      return null;
    }
  }
});
