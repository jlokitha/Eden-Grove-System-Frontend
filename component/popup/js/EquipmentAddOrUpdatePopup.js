import { findAllStaff } from "../../../service/StaffService.js";
import { findAllField } from "../../../service/FieldService.js";
import {
  saveEquipment,
  findEquipmentById,
  updateEquipment,
} from "../../../service/EquipmentService.js";

$(document).ready(function () {
  let currentEquipmentId;
  let loadEquipmentTable;

  $(".close-btn").click(function () {
    $("#equipment-add-or-update-popup").fadeOut();
    $(".overlay").hide();
    clearEquipmentData();
  });

  // Function to open the staff add or update popup
  window.openEquipmentAddOrUpdatePopup = function (equipmentId, callback) {
    loadEquipmentTable = callback;
    loadStaffData();
    loadFieldData();
    if (equipmentId) {
      currentEquipmentId = equipmentId;
      $("#equipment-add-or-update-popup .title-container h1").text(
        "Update Equipment"
      );
      $("#btn-save").hide();
      $("#btn-update").show();
      loadEquipmentData(equipmentId);
      $("#equipment-add-or-update-popup").fadeIn();
      $(".overlay").show();
    } else {
      $("#equipment-add-or-update-popup .title-container h1").text(
        "Add Equipment"
      );
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#equipment-add-or-update-popup").fadeIn();
      $(".overlay").show();
    }
  };

  const loadEquipmentData = async function (equipmentId) {
    const details = await findEquipmentById(equipmentId);

    $("#equipemnt-name-in").val(details.name);
    $("#dp-type").val(details.type);
    $("#dp-status").val(details.status);

    setTimeout(() => {
      setValuesToStaffDp(details.staffDTO);
      setValuesToFieldDp(details.fieldDTO);
    }, 2000);
  };

  $("form").on("submit", async (e) => {
    e.preventDefault();

    const name = $("#equipemnt-name-in").val().trim();
    const type = $("#dp-type").val();
    const status = $("#dp-status").val();
    const field = $("#field-dp").val();
    const staff = $("#staff-dp").val();

    const equipmentDto = {
      name,
      type,
      status,
    };

    if (staff) equipmentDto.staff = staff;
    if (field) equipmentDto.field = field;

    if (currentEquipmentId) {
      await updateEquipment(currentEquipmentId, equipmentDto);
    } else {
      await saveEquipment(equipmentDto);
    }
    loadEquipmentTable();
    $("#equipment-add-or-update-popup").fadeOut();
    $(".overlay").hide();
    clearEquipmentData();
  });

  // Function to show staff details in the select
  $("#staff-dp").select2();
  $("#field-dp").select2();

  function clearEquipmentData() {
    $("#equipemnt-name-in").val("");
    $("#dp-type").val("");
    $("#dp-status").val("");
    $("#staff-dp").val("").trigger("change");
    $("#field-dp").val("").trigger("change");
    currentEquipmentId = null;
    loadEquipmentTable = null;
  }
});

function setValuesToStaffDp(staff) {
  if (!staff) return;
  $("#staff-dp").val(staff.id).trigger("change");
}
function setValuesToFieldDp(field) {
  if (!field) return;
  $("#field-dp").val(field.fcode).trigger("change");
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

function loadFieldData() {
  findAllField().then((fieldList) => {
    const fieldDropdown = $("#field-dp");
    fieldDropdown.empty().append('<option value="">Select Field</option>');
    fieldList.forEach((field) => {
      const option = $(
        `<option value="${field.fcode}" data-fcode="${field.fcode}">${field.fieldName}</option>`
      );
      fieldDropdown.append(option);
    });
    fieldDropdown.trigger("change"); // Refresh Select2 options
  });
}
