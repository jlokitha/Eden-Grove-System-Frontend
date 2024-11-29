$(document).ready(function () {
  let fieldId;

  $("#btn-cancel").on("click", function () {
    fieldId = null;
    $("#delete-popup").hide();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", function () {
    console.log("Delete field with ID: " + fieldId);
    fieldId = null;
    $("#delete-popup").hide();
    $(".overlay").hide();
  });

  window.openFieldDeletePopup = function (id) {
    fieldId = id;
    $("#delete-popup").show();
    $(".overlay").show();
  };
});
