$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#vehicle-view-popup").hide();
    $(".overlay").hide();
  });

  const details = {
    vehicleCode: "V-001",
    licensePlateNo: "XYZ 1234",
    category: "Sedan",
    fuelType: "Petrol",
    status: "AVAILABLE",
    remark: "In good condition",
    staff: "S-001",
  };

  // Function to show staff details in the popup
  window.showVehicleDetailsPopup = function (vehicleId) {
    console.log("Show vehicle details for vehicle ID: " + vehicleId);

    $("#lbl-code").text(details.vehicleCode);
    $("#lbl-license-plate-no").text(details.licensePlateNo);
    $("#lbl-category").text(details.category);
    $("#lbl-fuel-type").text(details.fuelType);
    $("#lbl-remark").text(details.remark);
    const tagContainer = $(".tag-container");
    if (details.staff) {
      const p = $("<p></p>").text(details.staff);
      tagContainer.append(p);
    }
    $("#lbl-status").text(details.status);
    $("#lbl-status").addClass("tag available-tag");

    $("#vehicle-view-popup").show();
    $(".overlay").show();
  };
});
