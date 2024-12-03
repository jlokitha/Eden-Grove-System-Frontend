import { findLogById } from "../../../service/MonitoringLogService.js";

$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#field-tag-container").empty();
    $("#crop-tag-container").empty();
    $("#staff-tag-container").empty();
    $("#log-view-popup").fadeOut();
    $(".overlay").hide();
  });

  const details = {
    logCode: "C-001",
    logDate: "Tomato",
    observation: "The crop is showing signs of disease.",
    field: { fieldName: "Field 1" },
    crops: [{ commonName: "Tomato" }, { commonName: "Cucumber" }],
    staffs: [{ name: "John Doe" }, { name: "Jane Doe" }],
  };

  // Function to show staff details in the popup
  window.showLogDetailsPopup = async function (logId) {
    const details = await findLogById(logId);

    $("#lbl-log-code").text(details.logCode);
    $("#lbl-date").text(new Date(details.logDate).toISOString().slice(0, 10));
    $("#lbl-observation").text(details.observation);

    if (details.crops.length > 0) {
      const tagContainer = $("#crop-tag-container");
      details.crops.forEach((crop) => {
        const p = $("<p></p>").text(
          `${crop.commonName} (${crop.scientificName})`
        );
        tagContainer.append(p);
      });
    }

    if (details.staffs.length > 0) {
      const tagContainer = $("#staff-tag-container");
      details.staffs.forEach((staff) => {
        const p = $("<p></p>").text(`${staff.name}`);
        tagContainer.append(p);
      });
    }

    if (details.field) {
      const tagContainer = $("#field-tag-container");
      const p = $("<p></p>").text(`${details.field.fieldName}`);
      tagContainer.append(p);
    }
    $("#log-view-popup").show();
    $(".overlay").show();
  };
});
