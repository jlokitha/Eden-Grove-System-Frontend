import {
  findStaffById,
  saveStaff,
  updateStaff,
} from "../../../service/StaffService.js";

$(document).ready(function () {
  let currentStaffId = null;
  let loadStaffTable = null;

  $(".close-btn").click(function () {
    $("#staff-add-or-update-popup").fadeOut();
    $(".overlay").hide();
    clearStaffData();
  });

  // Function to open the staff add or update popup
  window.openStaffAddOrUpdatePopup = function (staffId, callback) {
    loadStaffTable = callback;
    if (staffId) {
      currentStaffId = staffId;
      $("#staff-add-or-update-popup .title-container h1").text("Update Staff");
      $("#btn-save").hide();
      $("#btn-update").show();
      loadStaffData(staffId);
      $("#joined-date").prop("disabled", true);
      $("#staff-add-or-update-popup").fadeIn();
      $(".overlay").show();
    } else {
      $("#staff-add-or-update-popup .title-container h1").text("Add Staff");
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#joined-date").prop("disabled", false);
      $("#joined-date").val(getCurrentDate());
      $("#staff-add-or-update-popup").fadeIn();
      $(".overlay").show();
    }
  };

  const loadStaffData = async function (staffId) {
    const details = await findStaffById(staffId);

    // Set values for text inputs
    $("#first-name").val(details.name.split(" ")[0]);
    $("#last-name").val(details.name.split(" ")[1]);
    $("#dob").val(details.dob);
    $("#address").val(details.address);
    $("#postal-code").val(details.postalCode);
    $("#email").val(details.email);
    $("#mobile").val(details.mobile);
    $("#joined-date").val(extractDate(details.joinedDate));
    $("#gender-dpd").val(details.gender).trigger("change");
    $("#designation-dpd").val(details.designation).trigger("change");
  };

  $("form").on("submit", async (e) => {
    e.preventDefault();

    const firstName = $("#first-name").val().trim();
    const lastName = $("#last-name").val().trim();
    const dob = $("#dob").val().trim();
    const gender = $("#gender-dpd").val();
    const designation = $("#designation-dpd").val().trim();
    const email = $("#email").val().trim();
    const mobile = $("#mobile").val().trim();
    const address = $("#address").val().trim();
    const postalCode = $("#postal-code").val().trim();
    const joinedDate = $("#joined-date").val().trim();

    const isValid = validateForm(
      firstName,
      lastName,
      email,
      mobile,
      postalCode,
      dob,
      joinedDate
    );
    if (!isValid) {
      return;
    }

    const staffDTO = {
      dob: dob ? new Date(dob).toISOString().slice(0, 10) : null, // Convert to LocalDate format
      gender,
      designation,
      email,
      mobile,
      address,
      postalCode,
    };

    // Check which button was clicked
    const clickedButton = e.originalEvent.submitter.id;

    if (clickedButton === "btn-save") {
      // Call the save method
      try {
        staffDTO.firstName = firstName;
        staffDTO.lastName = lastName;

        await saveStaff(staffDTO);

        loadStaffTable();
        $("#staff-add-or-update-popup").fadeOut();
        $(".overlay").hide();
        clearStaffData();
      } catch (error) {
        console.error("Error saving staff:", error);
        alert(error.message);
      }
    } else if (clickedButton === "btn-update") {
      console.log("Update method called");

      // Call the update method (you should have this logic inside your update function)
      try {
        staffDTO.id = currentStaffId;
        staffDTO.name = `${firstName} ${lastName}`;

        await updateStaff(staffDTO);

        loadStaffTable();
        $("#staff-add-or-update-popup").fadeOut();
        $(".overlay").hide();
        clearStaffData();
      } catch (error) {
        console.error("Error updating staff:", error);
        alert(error.message);
      }
    }
  });

  $("#designation-dpd").on("select2:open", function () {
    $(".select2-search__field").hide(); // Hide search field when dropdown is opened
  });

  $("#gender-dpd").select2({
    placeholder: "Select a gender",
  });

  $("#designation-dpd").select2({
    placeholder: "Select a designation",
  });

  // Function to clear the staff data
  function clearStaffData() {
    $("#first-name").val("");
    $("#last-name").val("");
    $("#gender-dpd").val("ALL");
    $("#designation-dpd").val("ALL");
    $("#dob").val("");
    $("#address").val("");
    $("#postal-code").val("");
    $("#email").val("");
    $("#mobile").val("");
    $("#joined-date").val("");
    currentStaffId = null;
    loadStaffTable = null;
  }

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(today.getDate()).padStart(2, "0"); // Pad day with leading zero if needed

    return `${year}-${month}-${day}`;
  }

  // Function to extract date from date time
  function extractDate(dateTime) {
    const date = new Date(dateTime);
    return date.toISOString().slice(0, 10);
  }

  // Function to validate the form inputs
  function validateForm(
    firstName,
    lastName,
    email,
    mobile,
    postalCode,
    dob,
    joinedDate
  ) {
    const nameRegex = /^[A-Za-z]{3,}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    const mobileRegex = /^\d{10}$/;
    const postalCodeRegex = /^\d{5}$/;
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!nameRegex.test(firstName)) {
      $("#first-name")[0].setCustomValidity(
        "First name must be at least 3 characters long and only contain letters."
      );
      $("#first-name")[0].reportValidity();
      return false;
    }
    $("#first-name")[0].setCustomValidity("");

    if (!nameRegex.test(lastName)) {
      $("#last-name")[0].setCustomValidity(
        "Last name must be at least 3 characters long and only contain letters."
      );
      $("#last-name")[0].reportValidity();
      return false;
    }
    $("#last-name")[0].setCustomValidity("");

    if (!emailRegex.test(email)) {
      $("#email")[0].setCustomValidity(
        "Please enter a valid email address (e.g., example@domain.com)."
      );
      $("#email")[0].reportValidity();
      return false;
    }
    $("#email")[0].setCustomValidity("");

    if (!mobileRegex.test(mobile)) {
      $("#mobile")[0].setCustomValidity(
        "Mobile number must be exactly 10 digits."
      );
      $("#mobile")[0].reportValidity();
      return false;
    }
    $("#mobile")[0].setCustomValidity("");

    if (!postalCodeRegex.test(postalCode)) {
      $("#postal-code")[0].setCustomValidity(
        "Postal code must be a valid 5-digit number."
      );
      $("#postal-code")[0].reportValidity();
      return false;
    }
    $("#postal-code")[0].setCustomValidity("");

    if (!dateRegex.test(dob)) {
      alert(dob);
      $("#dob")[0].setCustomValidity(
        "Date of birth must be in the format YYYY-MM-DD with valid year, month, and day."
      );
      $("#dob")[0].reportValidity();
      return false;
    }
    $("#dob")[0].setCustomValidity("");

    if (!dateRegex.test(joinedDate)) {
      $("#joined-date")[0].setCustomValidity(
        "Joined date must be in the format YYYY-MM-DD with valid year, month, and day."
      );
      $("#joined-date")[0].reportValidity();
      return false;
    }
    $("#joined-date")[0].setCustomValidity("");

    return true;
  }
});
