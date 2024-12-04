import { refreshToken } from "../../service/RegistrationService.js";
import { findStaffByToken } from "../../service/StaffService.js";

$(document).ready(function () {
  $(".nav-btn:first").addClass("nav-btn-active");

  const navButtons = $("#nav-btn-container > .nav-btn");
  const iframe = $("#embedded-page");

  // Check for the token in the cookie when the page loads
  const token = getCookie("token");

  if (!token) {
    window.location.href = "/index.html";
  } else {
    // If token exists, attempt to refresh it
    refreshToken(token)
      .then((response) => {
        // If the server returns a new token, replace the current token in the cookie
        if (response.token) {
          // Set the token in a cookie that expires in 5 days
          const expires = new Date();
          expires.setTime(expires.getTime() + 5 * 24 * 60 * 60 * 1000);
          document.cookie = `token=${
            response.token
          }; expires=${expires.toUTCString()}; path=/;`;

          $.ajaxSetup({
            headers: {
              Authorization: `Bearer ${response.token}`,
            },
          });

          setStaffInfo();
        }
      })
      .catch((error) => {
        // If token refresh fails, remove the token from the cookie and redirect to sign-in
        removeCookie("token");
        window.location.href = "/index.html";
      });
    hideActionButtons();
  }

  function hideActionButtons() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "SCIENTIST" || user.role === "ADMINISTRATIVE") {
      $("#user-btn").hide();
      $("#user-btn").removeClass(
        "nav-btn d-flex justify-content-left align-items-center"
      );
    } else {
      $("#user-btn").show();
      $("#user-btn").addClass(
        "nav-btn d-flex justify-content-left align-items-center"
      );
    }
  }

  navButtons.each(function () {
    $(this).on("click", function () {
      navButtons.removeClass("nav-btn-active");
      $(this).addClass("nav-btn-active");
      const path = $(this).attr("page");
      console.log(path);

      iframe.attr("src", path);
    });
  });

  $("#logout-btn").on("mouseenter", function () {
    $("#logout-icon").attr("src", "/assets/icons/logout-red.svg");
  });

  $("#logout-btn").on("mouseleave", function () {
    $("#logout-icon").attr("src", "/assets/icons/logout-black.svg");
  });

  $("#logout-btn").on("click", function () {
    removeCookie("token");
    window.location.href = "/index.html";
  });

  function getStaffInfo() {
    findStaffByToken()
      .then((staff) => {
        localStorage.setItem("user", JSON.stringify(staff));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function setStaffInfo() {
    getStaffInfo();
    const staff = JSON.parse(localStorage.getItem("staff"));
    $("#user-info .name").text(staff.name);
    $("#user-info .role").text(staff.role);
    $("#text-container .name").text(staff.name);
  }

  function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    $("#date").text(date);
    $("#time").text(time);
  }
  setInterval(updateDateTime, 1000);

  // Function to get a cookie
  function getCookie(name) {
    return document.cookie.split("; ").reduce((acc, cookie) => {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
      return acc;
    }, null);
  }

  // Function to remove a cookie
  function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  }
});
