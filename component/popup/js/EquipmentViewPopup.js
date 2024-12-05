import { findEquipmentById } from "../../../service/EquipmentService.js";

$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#staff-tag-container").empty();
    $("#field-tag-container").empty();
    $("#equipment-view-popup").fadeOut();
    $(".overlay").hide();
  });

  // Function to show staff details in the popup
  window.showEquipmentDetailsPopup = async function (equipmentId) {
    const details = await findEquipmentById(equipmentId);

    $("#lbl-code").text(details.equipmentId);
    $("#lbl-name").text(details.name);
    $("#lbl-type").text(details.type);

    if (details.staffDTO) {
      $(".staff-lbl").show();
      $("#staff-tag-container").show();

      const tagContainer = $("#staff-tag-container");
      const p = $("<p></p>").text(`${details.staffDTO.name}`);
      tagContainer.append(p);
    } else {
      $(".staff-lbl").hide();
      $("#staff-tag-container").hide();
    }
    if (details.fieldDTO) {
      $(".field-lbl").show();
      $("#field-tag-container").show();

      const tagContainer = $("#field-tag-container");
      const p = $("<p></p>").text(`${details.fieldDTO.fieldName}`);
      tagContainer.append(p);
    } else {
      $(".field-lbl").hide();
      $("#field-tag-container").hide();
    }

    const statusClasses = [
      "available-tag",
      "out-of-service-tag",
      "in-use-tag",
      "under-maintenance-tag",
    ];
    $("#lbl-status").removeClass(statusClasses.join(" "));

    let statusClass = "";
    let statusText = "";
    if (details.status === "AVAILABLE") {
      statusClass = "tag available-tag";
      statusText = "Available";
    } else if (details.status === "OUT_OF_SERVICE") {
      statusClass = "tag out-of-service-tag";
      statusText = "Out of Service";
    } else if (details.status === "IN_USE") {
      statusClass = "tag in-use-tag";
      statusText = "In Use";
    } else {
      statusClass = "tag under-maintenance-tag";
      statusText = "Under Maintenance";
    }
    $("#lbl-status").text(statusText);
    $("#lbl-status").addClass(statusClass);

    $("#equipment-view-popup").fadeIn();
    $(".overlay").show();
  };
});
