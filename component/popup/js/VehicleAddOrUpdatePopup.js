$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#vehicle-add-or-update-popup").hide();
    $(".overlay").hide();
  });

  // Function to open the staff add or update popup
  window.openVehicleAddOrUpdatePopup = function (vehicleId) {
    if (vehicleId) {
      $("#vehicle-add-or-update-popup .title-container h1").text(
        "Update Vehicle"
      );
      $("#btn-save").hide();
      $("#btn-update").show();
      $("#vehicle-add-or-update-popup").show();
      $(".overlay").show();
    } else {
      $("#vehicle-add-or-update-popup .title-container h1").text("Add Vehicle");
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#vehicle-add-or-update-popup").show();
      $(".overlay").show();
    }
  };

  // Function to show staff details in the select
  $("#staff-dp").select2();

  $("#staff-dp").on("select2:open", function () {
    $(".select2-search__field").on("input", function () {
      console.log("Input value:", $(this).val());
    });
  });
});
