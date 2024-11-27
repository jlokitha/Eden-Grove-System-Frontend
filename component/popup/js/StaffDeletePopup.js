$(document).ready(function () {
  let staffId;

  $("#btn-cancel").on("click", function () {
    staffId = null;
    $("#delete-popup").hide();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", function () {
    console.log("Delete staff with ID: " + staffId);
    staffId = null;
    $("#delete-popup").hide();
    $(".overlay").hide();
  });

  window.openStaffDeletePopup = function (id) {
    staffId = id;
    $("#delete-popup").show();
    $(".overlay").show();
  };
});
