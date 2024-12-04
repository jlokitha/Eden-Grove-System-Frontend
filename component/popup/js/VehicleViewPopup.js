import { findVehicleById } from "../../../service/VehicleService.js";

$(document).ready(function () {
  $(".close-btn").click(function () {
    $(".tag-container").empty();
    $("#vehicle-view-popup").fadeOut();
    $(".overlay").hide();
  });

  // Function to show staff details in the popup
  window.showVehicleDetailsPopup = async function (vehicleId) {
    const details = await findVehicleById(vehicleId);

    $("#lbl-code").text(details.vehicleCode);
    $("#lbl-license-plate-no").text(details.licensePlateNo);
    $("#lbl-category").text(details.category);
    $("#lbl-fuel-type").text(details.fuelType);
    $("#lbl-remark").text(details.remark);

    if (details.staffDTO) {
      $(".staff-lbl").show();
      $(".tag-container").show();

      const tagContainer = $(".tag-container");
      const p = $("<p></p>").text(`${details.staffDTO.name}`);
      tagContainer.append(p);
    } else {
      $(".staff-lbl").hide();
      $(".tag-container").hide();
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

    $("#vehicle-view-popup").fadeIn();
    $(".overlay").show();
  };
});
