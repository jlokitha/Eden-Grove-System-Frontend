import { findAllUser, filterAllUser } from "../../../service/UserService.js";

$(document).ready(function () {
  let pageNo = 0;
  const userTableBody = $("#table-container tbody");
  let isLoading = false; // Prevent multiple simultaneous loads
  let hasMorePosts = true; // Flag to check if there are more posts to load
  let filtersApplied = false; // Flag to track if filters are applied

  $.ajaxSetup({
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  loadUserData();

  function loadUserData() {
    if (isLoading || !hasMorePosts) return;
    isLoading = true;
    if (filtersApplied) {
      filterAllUser({
        page: pageNo,
        size: 20,
        role: $("#role-selector").val(),
      })
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false;
          } else {
            displayUserData(response);
            pageNo++;
          }
        })
        .finally(() => {
          isLoading = false;
        });
    } else {
      findAllUser(pageNo, 20)
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false;
          } else {
            displayUserData(response);
            pageNo++;
          }
        })
        .finally(() => {
          isLoading = false;
        });
    }
  }

  function hideActionButtons() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "SCIENTIST" || user.role === "ADMINISTRATIVE") {
      $(".action-container .delete-btn").hide();
    }
  }

  function displayUserData(userData) {
    // Iterate over the staff data array
    userData.forEach((user) => {
      // Create a new table row for each staff member
      const userRow = `
            <tr data-id="${user.email}">
              <td>${user.staffName}</td>
              <td>${user.role}</td>
              <td>${user.email}</td>
              <td>${user.role}</td>
              <td>
                <div class="action-container d-flex">
                  <button class="delete-btn">
                    <img
                      src="/assets/icons/delete.svg"
                      alt="Delete svg in grey color"
                    />
                  </button>
                </div>
              </td>
            </tr>
        `;
      userTableBody.append(userRow);
    });

    hideActionButtons();
  }

  // Add hover effect to buttons
  userTableBody.on("mouseenter", ".delete-btn", function () {
    $(this).css("background", "#FFE0E0");
    $(this).find("img").attr("src", "/assets/icons/delete-color.svg");
  });

  userTableBody.on("mouseleave", ".delete-btn", function () {
    $(this).css("background", "#f9f9f9");
    $(this).find("img").attr("src", "/assets/icons/delete.svg");
  });

  userTableBody.on("click", ".delete-btn", function () {
    const userId = getUserId(this);
    window.openUserDeletePopup(userId, refreshUserTable);
  });

  $("#role-selector").on("change", function () {
    const role = $("#role-selector").val().trim();

    this.pageNo = 0;
    filtersApplied = true;

    const filterData = {
      page: this.pageNo,
      size: 20,
    };

    // Add fields only if they have a value
    if (role && role !== "ALL") {
      filterData.role = role;
    }

    filterAllUser(filterData)
      .then((response) => {
        userTableBody.empty();
        displayUserData(response);
        this.filterData = null;
      })
      .catch((error) => {
        console.error(error);
      });
  });

  $(".clear-filter").on("click", function () {
    filtersApplied = false;
    pageNo = 0;
    $("#role-selector").val("ALL");
    refreshUserTable();
  });

  const refreshUserTable = () => {
    pageNo = 0;
    userTableBody.empty();
    loadUserData();
  };

  // Infinite Scroll: Load next page when user scrolls to the bottom of the tbody
  $("#table-container").on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const scrollHeight = $(this)[0].scrollHeight;
    const height = $(this).height();

    if (scrollHeight - scrollTop - height <= 50) {
      loadUserData();
    }
  });

  // Helper function to get staff ID
  function getUserId(button) {
    return $(button).closest("tr").data("id");
  }

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
});
