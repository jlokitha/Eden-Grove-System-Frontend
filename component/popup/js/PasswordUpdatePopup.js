import { updateUser } from "../../../service/UserService.js";

$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#password-update-popup").fadeOut();
    $(".overlay").hide();
    clearStaffData();
  });

  window.openPasswordUpdatePopup = function () {
    loadData();
    $("#password-update-popup").fadeIn();
    $(".overlay").show();
  };

  function loadData() {
    const user = JSON.parse(localStorage.getItem("user"));
    $("#name-lbl").text(user.name);
    $("#email-lbl").text(user.email);
    $("#designation-lbl").text(user.designation);
  }

  $("form").on("submit", (e) => {
    e.preventDefault();

    const newPassword = $("#new-password").val();
    const confirmPassword = $("#comfirm-password").val();

    if (!validatePassword(newPassword, confirmPassword)) return;
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      password: newPassword,
    };

    updateUser(user.email, data).then((response) => {
      $("#password-update-popup").fadeOut();
      $(".overlay").hide();
      clearStaffData();
    });
  });

  $(".visibility-toggle").click(function () {
    const passwordInput = $(this).siblings("input");
    const type =
      passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);

    // Toggle eye icon (assuming you have both open and closed eye icons)
    const img = $(this);
    const currentSrc = img.attr("src");
    img.attr(
      "src",
      currentSrc.includes("/assets/icons/eye-close.svg")
        ? "/assets/icons/eye-open.svg"
        : "/assets/icons/eye-close.svg"
    );
  });

  function validatePassword(newPassword, confirmPassword) {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$).{6,}$/;
    if (newPassword !== confirmPassword) {
      $("#comfirm-password")[0].setCustomValidity("Passwords do not match");
      $("#comfirm-password")[0].reportValidity();
      return false;
    }
    if (!passwordRegex.test(newPassword)) {
      $("#new-password")[0].setCustomValidity(
        "Password must be at least 6 characters long, and contain at least one letter, one number, and one symbol. Only letters, numbers, and symbols are allowed."
      );
      $("#new-password")[0].reportValidity();
      return false;
    }
    if (!passwordRegex.test(confirmPassword)) {
      $("#comfirm-password")[0].setCustomValidity(
        "Password must be at least 6 characters long, and contain at least one letter, one number, and one symbol. Only letters, numbers, and symbols are allowed."
      );
      $("#comfirm-password")[0].reportValidity();
      return false;
    }
    return true;
  }
});
