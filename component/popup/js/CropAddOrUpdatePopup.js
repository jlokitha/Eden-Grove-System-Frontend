$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#crop-add-or-update-popup").hide();
    $(".overlay").hide();
  });

  // Function to open the staff add or update popup
  window.openCropAddOrUpdatePopup = function (cropId) {
    if (cropId) {
      $("#crop-add-or-update-popup .title-container h1").text("Update Crop");
      $("#btn-save").hide();
      $("#btn-update").show();
      $("#crop-add-or-update-popup").show();
      $(".overlay").show();
    } else {
      $("#crop-add-or-update-popup .title-container h1").text("Add Crop");
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#crop-add-or-update-popup").show();
      $(".overlay").show();
    }
  };
});
