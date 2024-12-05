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
        alert(xhr.responseJSON.message);
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
        alert(xhr.responseJSON.message);
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
        alert(xhr.responseJSON.message);
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
      alert(xhr.responseJSON.message);
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
        alert(xhr.responseJSON.message);
      },
    });
  });
}
