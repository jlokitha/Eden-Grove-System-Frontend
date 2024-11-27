$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#staff-add-or-update-popup").hide();
    $(".overlay").hide();
  });

  // Function to open the staff add or update popup
  window.openStaffAddOrUpdatePopup = function (staffId) {
    if (staffId) {
      $("#staff-add-or-update-popup .title-container h1").text("Update Staff");
      $("#btn-save").hide();
      $("#btn-update").show();
      $("#staff-add-or-update-popup").show();
      $(".overlay").show();
    } else {
      $("#staff-add-or-update-popup .title-container h1").text("Add Staff");
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#staff-add-or-update-popup").show();
      $(".overlay").show();
    }
  };
});
