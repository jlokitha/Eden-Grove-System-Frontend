$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#crop-view-popup").hide();
    $(".overlay").hide();
  });

  const details = {
    cropCode: "C-001",
    commonName: "Tomato",
    scientificName: "Solanum lycopersicum",
    category: "Vegetable",
    season: "Summer",
    field: "Field A",
  };

  // Function to show staff details in the popup
  window.showCropDetailsPopup = function (cropId) {
    console.log("Show crop details for crop ID: " + cropId);

    $("#lbl-common-name").text(details.commonName);
    $("#lbl-scientific-name").text(details.scientificName);
    $("#lbl-category").text(details.category);
    $("#lbl-season").text("Season: " + details.season);
    const tagContainer = $(".tag-container");
    if (details.field) {
      const p = $("<p></p>").text(details.field);
      tagContainer.append(p);
    }

    $("#crop-view-popup").show();
    $(".overlay").show();
  };
});
