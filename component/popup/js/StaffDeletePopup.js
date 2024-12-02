import { deleteStaff } from "../../../service/StaffService.js";

$(document).ready(function () {
  let staffId;
  let loadStaffTable = null;

  $("#btn-cancel").on("click", function () {
    staffId = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", async function () {
    const responce = await deleteStaff(staffId);
    loadStaffTable();
    staffId = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  window.openStaffDeletePopup = function (id, callback) {
    staffId = id;
    loadStaffTable = callback;
    $("#delete-popup").fadeIn();
    $(".overlay").show();
  };
});
