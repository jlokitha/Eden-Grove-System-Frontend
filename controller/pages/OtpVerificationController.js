import { requestOtp } from "../../service/RegistrationService.js";

$(document).ready(function () {
  const inputs = $("#input-container input");
  const linkResend = $("#resend-link");

  // Restrict the user from typing more than one character
  inputs.on("keydown", function (e) {
    if ($(this).val().length >= 1 && e.key !== "Backspace") {
      e.preventDefault();
    }
  });

  // If the current input field has a value, move focus to the next field
  inputs.on("input", function () {
    if ($(this).val().length == $(this).attr("maxlength")) {
      const nextInput = $(this).next("input");
      if (nextInput.length) {
        nextInput.focus();
      }
    }
  });

  // When the user presses the backspace key in an empty field
  inputs.on("keydown", function (e) {
    if (e.key === "Backspace" && $(this).val() === "") {
      const prevInput = $(this).prev("input");
      if (prevInput.length) {
        prevInput.focus();
      }
    }
  });

  $("#success-btn").on("click", function (e) {
    e.preventDefault();

    let otpData = localStorage.getItem("otpData");
    let otpAction = localStorage.getItem("otpAction");

    if (otpData) {
      otpData = JSON.parse(otpData);

      let otp = "";
      inputs.each(function () {
        otp += $(this).val();
      });

      otpData = {
        email: otpData.email,
        otp: otp,
      };
      localStorage.setItem("otpData", JSON.stringify(otpData));

      if (otpAction === "passwordReset") {
        window.location.href = "/pages/passwordReset.html";
      } else if (otpAction === "signUp") {
        window.location.href = "/pages/signUp.html";
      } else {
        console.error("Unknown action specified.");
      }
    } else {
      console.error("otpData not found in local storage");
    }
  });

  linkResend.on("click", function () {
    let otpData = JSON.parse(localStorage.getItem("otpData"));
    requestOtp(otpData.email);
  });
});
