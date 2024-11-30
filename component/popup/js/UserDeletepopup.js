$(document).ready(function () {
  let userId;

  $("#btn-cancel").on("click", function () {
    userId = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", function () {
    console.log("Delete staff with ID: " + userId);
    userId = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  window.openUserDeletePopup = function (id) {
    userId = id;
    $("#delete-popup").fadeIn();
    $(".overlay").show();
  };
});
