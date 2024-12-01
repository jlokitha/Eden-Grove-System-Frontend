import { requestOtp } from "../../service/RegistrationService.js";

$(document).ready(function () {
  $("form").on("submit", (e) => {
    e.preventDefault();

    const email = $('input[type="email"]').val();
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (emailRegex.test(email)) {
      const otpData = {
        email: email,
      };

      localStorage.setItem("otpData", JSON.stringify(otpData));
      requestOtp(email);

      window.location.href = "/pages/otpVerification.html";
    } else {
      $('input[type="email"]')[0].setCustomValidity(
        "Please enter a valid email address (e.g., example@domain.com)."
      );
      $('input[type="email"]')[0].reportValidity();
    }
  });
});
