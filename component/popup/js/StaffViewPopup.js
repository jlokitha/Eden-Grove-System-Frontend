$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#staff-view-popup").hide();
    $(".overlay").hide();
  });

  const details = {
    name: "John Doe",
    gender: "Male",
    dob: "12-13-2002",
    address: "No12, 'Janindu', Watagedaramulla, Denipitiya, waligama, matara",
    email: "john.doe@example.com",
    mobile: "0712312342",
    postalCode: "62701",
    designation: "MANAGER",
    role: "MANAGER",
    joinedDate: "2024-11-08",
  };

  // Function to show staff details in the popup
  window.showStaffDetailsPopup = function (staffId) {
    console.log("Show staff details for staff ID: " + staffId);

    $("#lbl-name").text(details.name);
    $("#lbl-gender").text(details.gender);
    $("#lbl-dob").text(details.dob);
    $("#lbl-address").text(details.address);
    $("#lbl-email").text(details.email);
    $("#lbl-mobile").text(details.mobile);
    $("#lbl-postal-code").text(details.postalCode);
    $("#lbl-designation").text(details.designation);
    $("#lbl-role").text(details.role);
    $("#lbl-joined-date").text(details.joinedDate);

    $("#staff-view-popup").show();
    $(".overlay").show();
  };
});
