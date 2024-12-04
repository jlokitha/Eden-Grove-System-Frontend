import {
  findVehicleById,
  updateVehicle,
  saveVehicle,
} from "../../../service/VehicleService.js";
import { findAllStaff } from "../../../service/StaffService.js";

$(document).ready(function () {
  let currentVehicleId;
  let loadVehicleTable;

  $(".close-btn").click(function () {
    $("#vehicle-add-or-update-popup").fadeOut();
    $(".overlay").hide();
    clearVehicleData();
  });

  // Function to open the staff add or update popup
  window.openVehicleAddOrUpdatePopup = function (vehicleId, callback) {
    loadVehicleTable = callback;
    loadStaffData();
    if (vehicleId) {
      currentVehicleId = vehicleId;
      $("#vehicle-add-or-update-popup .title-container h1").text(
        "Update Vehicle"
      );
      $("#btn-save").hide();
      $("#btn-update").show();
      loadVehicleData(vehicleId);
      $("#vehicle-add-or-update-popup").show();
      $(".overlay").show();
    } else {
      $("#vehicle-add-or-update-popup .title-container h1").text("Add Vehicle");
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#vehicle-add-or-update-popup").show();
      $(".overlay").show();
    }
  };

  const loadVehicleData = async function (vehicleId) {
    const details = await findVehicleById(vehicleId);

    $("#license-plate-in").val(details.licensePlateNo);
    $("#category-in").val(details.category);
    $("#fuel-type-dp").val(details.fuelType);
    $("#dp-status").val(details.status);
    $("#remark-ta").val(details.remark);
    setTimeout(() => {
      setValuesToStaffDp(details.staffDTO);
    }, 1000);
  };

  $("form").on("submit", async (e) => {
    e.preventDefault();

    const licensePlateNo = $("#license-plate-in").val().trim();
    const category = $("#category-in").val().trim();
    const fuelType = $("#fuel-type-dp").val();
    const status = $("#dp-status").val();
    const remark = $("#remark-ta").val().trim();
    const staff = $("#staff-dp").val();

    const vehicleDto = {
      licensePlateNo,
      category,
      fuelType,
      status,
      remark,
    };

    if (staff) vehicleDto.staff = staff;

    if (currentVehicleId) {
      await updateVehicle(currentVehicleId, vehicleDto);
    } else {
      await saveVehicle(vehicleDto);
    }
    loadVehicleTable();
    $("#vehicle-add-or-update-popup").fadeOut();
    $(".overlay").hide();
    clearVehicleData();
  });

  // Function to show staff details in the select
  $("#staff-dp").select2();

  $("#staff-dp").on("select2:open", function () {
    $(".select2-search__staff").on("input", function () {
      console.log("Input value:", $(this).val());
    });
  });

  function clearVehicleData() {
    $("#license-plate-in").val("");
    $("#category-in").val("");
    $("#fuel-type-dp").val("");
    $("#staff-dp").val("").trigger("change");
    $("#dp-status").val("");
    $("#remark-ta").val("");
    currentVehicleId = null;
    loadVehicleTable = null;
  }
});

function setValuesToStaffDp(staff) {
  if (!staff) return;

  $("#staff-dp").val(staff.id).trigger("change");
}

function loadStaffData() {
  findAllStaff().then((staffList) => {
    const staffDropdown = $("#staff-dp");
    staffDropdown.empty().append('<option value="">Select Staff</option>');
    staffList.forEach((staff) => {
      const option = $(
        `<option value="${staff.id}" data-id="${staff.id}">${staff.name}</option>`
      );
      staffDropdown.append(option);
    });
    staffDropdown.trigger("change"); // Refresh Select2 options
  });
}
