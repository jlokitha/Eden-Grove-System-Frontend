import { resetPassword } from "../../service/RegistrationService.js";

$(document).ready(function () {
  // Password visibility toggle
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

  $("form").on("submit", (e) => {
    e.preventDefault();

    const password = $('input[placeholder="New Password"]').val();
    const confirmPassword = $('input[placeholder="Confirm Password"]').val();
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$).{6,}$/;

    $(
      'input[placeholder="New Password"], input[placeholder="Confirm Password"]'
    ).each(function () {
      this.setCustomValidity(""); // Clear any custom validity
    });

    if (password === confirmPassword) {
      if (passwordRegex.test(password)) {
        let otpData = localStorage.getItem("otpData");
        otpData = JSON.parse(otpData);

        otpData = {
          email: otpData.email,
          otp: otpData.otp,
          password: password,
        };

        resetPassword(otpData)
          .then((response) => {
            localStorage.removeItem("otpData");
            localStorage.removeItem("otpAction");
            window.location.href = "/index.html";
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        // If password doesn't match regex
        $('input[placeholder="New Password"]')[0].setCustomValidity(
          "Password must be at least 6 characters long, and contain at least one letter, one number, and one symbol. Only letters, numbers, and symbols are allowed."
        );
        $('input[placeholder="New Password"]')[0].reportValidity();
      }
    } else {
      // If passwords don't match
      $('input[placeholder="Confirm Password"]')[0].setCustomValidity(
        "Passwords do not match."
      );
      $('input[placeholder="Confirm Password"]')[0].reportValidity();
    }
  });
});
