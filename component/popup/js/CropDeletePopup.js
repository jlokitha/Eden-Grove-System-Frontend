import { deleteCrop } from "../../../service/CropService.js";

$(document).ready(function () {
  let cropId;
  let loadCropTable = null;

  $("#btn-cancel").on("click", function () {
    cropId = null;
    loadCropTable = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", async function () {
    await deleteCrop(cropId);
    loadCropTable();
    loadCropTable = null;
    cropId = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  window.openCropDeletePopup = function (id, callback) {
    cropId = id;
    loadCropTable = callback;
    $("#delete-popup").fadeIn();
    $(".overlay").show();
  };
});
