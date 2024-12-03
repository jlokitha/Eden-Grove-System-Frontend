import { deleteField } from "../../../service/FieldService.js";

$(document).ready(function () {
  let fieldId;
  let loadFieldTable = null;

  $("#btn-cancel").on("click", function () {
    fieldId = null;
    loadFieldTable = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", async function () {
    await deleteField(fieldId);
    loadFieldTable();
    fieldId = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  window.openFieldDeletePopup = function (id, callback) {
    fieldId = id;
    loadFieldTable = callback;
    $("#delete-popup").fadeIn();
    $(".overlay").show();
  };
});
