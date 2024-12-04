import { deleteEquipment } from "../../../service/EquipmentService.js";

$(document).ready(function () {
  let vehicleId;
  let loadEquipmentTable = null;

  $("#btn-cancel").on("click", function () {
    vehicleId = null;
    loadEquipmentTable = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", async function () {
    await deleteEquipment(vehicleId);
    loadEquipmentTable();
    vehicleId = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  window.openEquipmentDeletePopup = function (id, callback) {
    vehicleId = id;
    loadEquipmentTable = callback;
    $("#delete-popup").fadeIn();
    $(".overlay").show();
  };
});
