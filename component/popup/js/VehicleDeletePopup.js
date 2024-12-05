import { deleteVehicle } from "../../../service/VehicleService.js";

$(document).ready(function () {
  let vehicleId;
  let loadVehicleTable;

  $("#btn-cancel").on("click", function () {
    vehicleId = null;
    loadVehicleTable = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", async function () {
    await deleteVehicle(vehicleId);
    loadVehicleTable();
    vehicleId = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  window.openVehicleDeletePopup = function (id, callback) {
    vehicleId = id;
    loadVehicleTable = callback;
    $("#delete-popup").fadeIn();
    $(".overlay").show();
  };
});
