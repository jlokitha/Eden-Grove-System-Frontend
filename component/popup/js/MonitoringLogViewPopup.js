$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#log-view-popup").hide();
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
  window.showLogDetailsPopup = function (logId) {
    console.log("Show log details for log ID: " + logId);

    $("#log-view-popup").show();
    $(".overlay").show();
  };
});
