import { findCropById } from "../../../service/CropService.js";

$(document).ready(function () {
  $(".close-btn").click(function () {
    $(".tag-container").empty();
    $("#crop-view-popup").fadeOut();
    $(".overlay").hide();
  });

  // Function to show staff details in the popup
  window.showCropDetailsPopup = async function (cropId) {
    const details = await findCropById(cropId);

    const base64Image = `data:image/png;base64,${details.cropImage}`;

    $("#crop-image").attr("src", base64Image);
    $("#lbl-common-name").text(details.commonName);
    $("#lbl-scientific-name").text(details.scientificName);
    $("#lbl-category").text(details.category);
    $("#lbl-season").text(details.season);
    const tagContainer = $(".tag-container");
    if (details.fieldDto) {
      $(".field-lbl").show();
      const p = $("<p></p>").text(details.fieldDto.fieldName);
      tagContainer.append(p);
    } else $(".field-lbl").hide();

    $("#crop-view-popup").fadeIn();
    $(".overlay").show();
  };
});
