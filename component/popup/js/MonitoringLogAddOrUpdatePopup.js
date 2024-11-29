$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#log-add-or-update-popup").hide();
    $(".overlay").hide();
  });

  // Function to open the staff add or update popup
  window.openLogAddOrUpdatePopup = function (logId) {
    if (logId) {
      $("#log-add-or-update-popup .title-container h1").text("Update Log");
      $("#btn-save").hide();
      $("#btn-update").show();
      $("#log-add-or-update-popup").show();
      $(".overlay").show();
    } else {
      $("#log-add-or-update-popup .title-container h1").text("Add Log");
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#log-add-or-update-popup").show();
      $(".overlay").show();
    }
  };
});
