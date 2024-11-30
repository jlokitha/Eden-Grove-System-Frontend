$(document).ready(function () {
  let vehicleId;

  $("#btn-cancel").on("click", function () {
    vehicleId = null;
    $("#delete-popup").hide();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", function () {
    console.log("Delete vehicle with ID: " + vehicleId);
    vehicleId = null;
    $("#delete-popup").hide();
    $(".overlay").hide();
  });

  window.openStaffDeletePopup = function (id) {
    vehicleId = id;
    $("#delete-popup").show();
    $(".overlay").show();
  };
});
