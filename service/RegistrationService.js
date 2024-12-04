export function signUp(signUpData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/auth/signup`,
      type: "POST",
      data: JSON.stringify(signUpData),
      contentType: "application/json",
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error:", error);
        console.error("Status:", xhr.status);

        let errorMessage = "An unexpected error occurred. Please try again";
        switch (xhr.status) {
          case 400:
            errorMessage = "Invalid OTP provided. Please try again";
            break;
          case 409:
            errorMessage = "User already exists. Please try logging in";
            break;
          case 404:
            errorMessage = "Staff not found. Please contact support";
            break;
          case 406:
            errorMessage = "Staff not acceptable";
            break;
        }
        reject(new Error(errorMessage));
      },
    });
  });
}

export function signIn(signInData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/auth/signin`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(signInData),
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error:", error);
        console.error("Status:", xhr.status);

        let errorMessage = "An unexpected error occurred. Please try again.";
        switch (xhr.status) {
          case 404:
            errorMessage =
              "User not found. Please check your email or sign up.";
            break;
          case 400:
            errorMessage = "Invalid credentials. Please try again.";
            break;
          case 500:
            errorMessage =
              "An internal server error occurred. Please try again later.";
            break;
        }
        reject(new Error(errorMessage));
      },
    });
  });
}

export function resetPassword(resetPasswordData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/auth/reset_password`,
      type: "POST",
      data: JSON.stringify(resetPasswordData),
      contentType: "application/json",
      success: function (response) {
        console.log("Password reset successfully:", response);
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error:", error);
        console.error("Status:", xhr.status);

        let errorMessage = "An unexpected error occurred. Please try again.";
        switch (xhr.status) {
          case 400:
            errorMessage = "Invalid OTP provided. Please try again.";
            break;
          case 404:
            errorMessage = "User not found for the given email.";
            break;
          case 500:
            errorMessage =
              "An error occurred on the server. Please try again later.";
            break;
        }
        reject(new Error(errorMessage));
      },
    });
  });
}

export function requestOtp(email) {
  $.ajax({
    url: `http://localhost:5055/greenshadow/api/v1/auth/request_otp`,
    type: "GET",
    data: { email: email },
    contentType: "application/json",
    success: function (response) {
      console.log("OTP requested successfully:", response);
    },
    error: function (xhr, error) {
      console.error("Error:", error);
      console.error("Status:", xhr.status);

      switch (xhr.status) {
        case 404:
          alert("User not found. Please ensure the email is correct.");
          break;
        case 500:
          alert(
            "An error occurred while sending the OTP. Please try again later."
          );
          break;
        default:
          alert("An unexpected error occurred. Please try again.");
      }
    },
  });
}

export function refreshToken(token) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/greenshadow/api/v1/auth/refresh`,
      type: "POST",
      data: { token: token },
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, error) {
        console.error("Error:", error);
        console.error("Status:", xhr.status);

        let errorMessage = "An unexpected error occurred. Please try again.";
        if (xhr.status === 404) {
          errorMessage = "User not found for refresh token request.";
        } else {
          errorMessage = "Failed to refresh the token. Please try again.";
        }
        reject(new Error(errorMessage));
      },
    });
  });
}
