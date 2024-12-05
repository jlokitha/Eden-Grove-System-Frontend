import { findStaffById } from "../../../service/StaffService.js";

$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#staff-view-popup").fadeOut();
    $(".overlay").hide();
  });

  // Function to show staff details in the popup
  window.showStaffDetailsPopup = async function (staffId) {
    const details = await findStaffById(staffId);

    $("#lbl-name").text(details.name);
    $("#lbl-gender").text(details.gender);
    $("#lbl-dob").text(details.dob);
    $("#lbl-address").text(details.address);
    $("#lbl-email").text(details.email);
    $("#lbl-mobile").text(details.mobile);
    $("#lbl-postal-code").text(details.postalCode);
    $("#lbl-designation").text(details.designation);
    $("#lbl-role").text(details.role);
    $("#lbl-joined-date").text(
      new Date(details.joinedDate).toISOString().slice(0, 10)
    );

    $("#staff-view-popup").fadeIn();
    $(".overlay").show();
  };
});
