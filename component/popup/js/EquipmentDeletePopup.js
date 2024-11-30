$(document).ready(function () {
  let vehicleId;

  $("#btn-cancel").on("click", function () {
    vehicleId = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", function () {
    console.log("Delete vehicle with ID: " + vehicleId);
    vehicleId = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  window.openEquipmentDeletePopup = function (id) {
    vehicleId = id;
    $("#delete-popup").fadeIn();
    $(".overlay").show();
  };
});
