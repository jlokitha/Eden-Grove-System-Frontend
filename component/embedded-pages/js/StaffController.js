import { findAllStaff } from "../../../service/StaffService.js";
import { filterAllStaff } from "../../../service/StaffService.js";

$(document).ready(function () {
  let pageNo = 0;
  const staffAddBtn = $("#btn-staff-add");
  const staffTableBody = $("#table-container tbody");
  let isLoading = false; // Prevent multiple simultaneous loads
  let hasMorePosts = true; // Flag to check if there are more posts to load
  let filtersApplied = false; // Flag to track if filters are applied

  $.ajaxSetup({
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  loadStaffData();

  // Load staff data
  function loadStaffData() {
    if (isLoading || !hasMorePosts) return; // Prevent loading if already loading or no more data
    isLoading = true; // Set loading to true to prevent further triggers

    if (filtersApplied) {
      // Load filtered staff if filters are applied
      filterAllStaff({
        page: pageNo,
        size: 20,
        name: $("#name-search").val().trim(),
        designation: $("#designation-selector").val().trim(),
        gender: $("#gender-selector").val().trim(),
      })
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false; // No more posts to load
            alert("No more posts to load");
          } else {
            displayStaffData(response);
            pageNo++; // Increment the page number for the next request
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          isLoading = false; // Reset loading flag after data is loaded
        });
    } else {
      // Load default staff if no filters are applied
      findAllStaff(pageNo)
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false; // No more posts to load
          } else {
            displayStaffData(response);
            pageNo++; // Increment the page number for the next request
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          isLoading = false; // Reset loading flag after data is loaded
        });
    }
  }

  function hideActionButtonsIfScientist() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "SCIENTIST") {
      staffAddBtn.hide();
      $(".action-container .update-btn").hide();
      $(".action-container .delete-btn").hide();
    }
  }

  function displayStaffData(staffData) {
    // Iterate over the staff data array
    staffData.forEach((staff) => {
      // Create a new table row for each staff member
      const staffRow = `
            <tr data-id="${staff.id}">
                <td>${staff.name}</td>
                <td>${staff.designation}</td>
                <td>${staff.email}</td>
                <td>${staff.gender}</td>
                <td>
                    <div class="action-container d-flex">
                        <button class="view-btn">
                            <img
                                src="/assets/icons/eye-open.svg"
                                alt="Eye open svg in grey color"
                            />
                        </button>
                        <button class="update-btn">
                            <img
                                src="/assets/icons/update.svg"
                                alt="Update svg in grey color"
                            />
                        </button>
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
      // Append the row to the table body
      staffTableBody.append(staffRow);
    });

    hideActionButtonsIfScientist();
  }

  // Add click event to add button
  staffAddBtn.on("click", function () {
    window.openStaffAddOrUpdatePopup(null, refreshStaffTable);
  });

  // Delegate hover effect to buttons using event delegation
  staffTableBody.on("mouseenter", ".view-btn", function () {
    $(this).css("background", "#D0E3FF");
    $(this).find("img").attr("src", "/assets/icons/eye-open-color.svg");
  });

  staffTableBody.on("mouseleave", ".view-btn", function () {
    $(this).css("background", "#f9f9f9");
    $(this).find("img").attr("src", "/assets/icons/eye-open.svg");
  });

  staffTableBody.on("mouseenter", ".update-btn", function () {
    $(this).css("background", "#DEFFEC");
    $(this).find("img").attr("src", "/assets/icons/update-color.svg");
  });

  staffTableBody.on("mouseleave", ".update-btn", function () {
    $(this).css("background", "#f9f9f9");
    $(this).find("img").attr("src", "/assets/icons/update.svg");
  });

  staffTableBody.on("mouseenter", ".delete-btn", function () {
    $(this).css("background", "#FFE0E0");
    $(this).find("img").attr("src", "/assets/icons/delete-color.svg");
  });

  staffTableBody.on("mouseleave", ".delete-btn", function () {
    $(this).css("background", "#f9f9f9");
    $(this).find("img").attr("src", "/assets/icons/delete.svg");
  });

  // Add click event to buttons
  staffTableBody.on("click", ".view-btn", function () {
    const staffId = getStaffId(this);
    window.showStaffDetailsPopup(staffId);
  });

  staffTableBody.on("click", ".update-btn", function () {
    const staffId = getStaffId(this);
    window.openStaffAddOrUpdatePopup(staffId, refreshStaffTable);
  });

  staffTableBody.on("click", ".delete-btn", function () {
    const staffId = getStaffId(this);
    window.openStaffDeletePopup(staffId, refreshStaffTable);
  });

  $(".search").on("click", function () {
    const name = $("#name-search").val().trim();
    const designation = $("#designation-selector").val().trim();
    const gender = $("#gender-selector").val().trim();

    this.pageNo = 0;
    filtersApplied = true;

    const filterData = {
      page: this.pageNo,
      size: 20,
    };

    // Add fields only if they have a value
    if (name) {
      filterData.name = name;
    }
    if (designation && designation !== "ALL") {
      filterData.designation = designation;
    }
    if (gender && gender !== "ALL") {
      filterData.gender = gender;
    }

    filterAllStaff(filterData)
      .then((response) => {
        staffTableBody.empty();
        displayStaffData(response);
        this.filterData = null;
      })
      .catch((error) => {
        console.error(error);
      });
  });

  $(".clear-filter").on("click", function () {
    filtersApplied = false;
    pageNo = 0;
    clearFilter();
    refreshStaffTable();
  });

  const refreshStaffTable = () => {
    pageNo = 0;
    staffTableBody.empty();
    loadStaffData();
  };

  // Clear filter
  function clearFilter() {
    $("#name-search").val("");
    $("#designation-selector").val("ALL");
    $("#gender-selector").val("ALL");
  }

  // Helper function to get staff ID
  function getStaffId(button) {
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

  // Infinite Scroll: Load next page when user scrolls to the bottom of the tbody
  $("#table-container").on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const scrollHeight = $(this)[0].scrollHeight;
    const height = $(this).height();

    if (scrollHeight - scrollTop - height <= 50) {
      loadStaffData(); // Trigger loading of the next page when the user is near the bottom
    }
  });
});
