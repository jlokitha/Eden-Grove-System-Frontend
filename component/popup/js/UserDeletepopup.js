import { deleteUser } from "../../../service/UserService.js";

$(document).ready(function () {
  let userId;
  let loadUsetTable;

  $("#btn-cancel").on("click", function () {
    userId = null;
    loadUsetTable = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  $("#btn-delete").on("click", async function () {
    await deleteUser(userId);
    loadUsetTable();
    userId = null;
    loadUsetTable = null;
    $("#delete-popup").fadeOut();
    $(".overlay").hide();
  });

  window.openUserDeletePopup = function (id, callback) {
    userId = id;
    loadUsetTable = callback;
    $("#delete-popup").fadeIn();
    $(".overlay").show();
  };
});
