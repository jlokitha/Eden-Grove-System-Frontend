$(document).ready(function () {
  let cropId;

  $("#btn-cancel").on("click", function () {
    cropId = null;
    $("#delete-popup").hide();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", function () {
    console.log("Delete crop with ID: " + cropId);
    cropId = null;
    $("#delete-popup").hide();
    $(".overlay").hide();
  });

  window.openCropDeletePopup = function (id) {
    cropId = id;
    $("#delete-popup").show();
    $(".overlay").show();
  };
});
