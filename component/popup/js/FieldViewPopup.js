$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#field-view-popup").hide();
    $(".overlay").hide();
  });

  const details = {
    fcode: "F-001",
    fieldName: "Rice Palate A",
    fieldSize: 2000,
    fieldLocation: "6.9215873,79.9833517",
    crops: ["Rice", "Wheat"],
  };

  // Function to show staff details in the popup
  window.showFieldDetailsPopup = function (fieldId) {
    console.log("Show field details for staff ID: " + fieldId);

    $("#lbl-name").text(details.fieldName);
    $("#lbl-size").text(details.fieldSize + " Sq.mt");
    $("#field-location").attr("href", getGoogleMapsUrl(details.fieldLocation));
    const tagContainer = $(".tag-container");
    details.crops.forEach((crop) => {
      const p = $("<p></p>").text(crop);
      tagContainer.append(p);
    });

    $("#field-view-popup").show();
    $(".overlay").show();
  };

  // Function to get Google Maps URL
  function getGoogleMapsUrl(locationString) {
    // Split the string into x and y values
    const [x, y] = locationString.split(",").map(Number);
    // Construct the Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps?q=${x},${y}&z=15`;
    return googleMapsUrl;
  }
});
