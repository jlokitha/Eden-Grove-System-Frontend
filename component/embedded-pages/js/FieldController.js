import { findAllField, filterFields } from "../../../service/FieldService.js";

$(document).ready(function () {
  let pageNo = 0;
  const fieldAddBtn = $("#btn-field-add");
  const mainContent = $("#main-content");
  let isLoading = false; // Prevent multiple simultaneous loads
  let hasMorePosts = true; // Flag to check if there are more posts to load
  let filtersApplied = false; // Flag to track if filt

  $.ajaxSetup({
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  loadFieldData();

  // Load staff data
  function loadFieldData() {
    if (isLoading || !hasMorePosts) return; // Prevent loading if already loading or no more data
    isLoading = true; // Set loading to true to prevent further triggers

    if (filtersApplied) {
      // Load filtered staff if filters are applied
      filterAllField({
        page: pageNo,
        size: 20,
        name: $("#name-search").val().trim(),
        designation: $("#from-size").val().trim(),
        gender: $("#to-size").val().trim(),
      })
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false; // No more posts to load
            alert("No more card to load");
          } else {
            displayFieldData(response);
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
      findAllField(pageNo)
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false; // No more posts to load
          } else {
            displayFieldData(response);
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

  function hideActionButtons() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "ADMINISTRATIVE") {
      fieldAddBtn.hide();
      $(".button-container .btn-update").hide();
      $(".card .btn-delete").hide();
    }
  }

  function displayFieldData(fieldData) {
    // Iterate over the staff data array
    fieldData.forEach((field) => {
      // Create a new table row for each staff member
      const fieldCard = `
            <div class="card" data-id="${field.fcode}">
              <img
                src="data:image/png;base64,${field.fieldImage1}"
                class="card-img-top"
                alt="..."
              />
              <button class="btn-delete">
                <img src="/assets/icons/cancel-grey.svg" alt="" />
              </button>
              <div class="card-body">
                <h5 class="card-title">${field.fieldName}</h5>
                <p class="card-text">${field.fieldSize} Sq.mt</p>
                <div class="location-url d-flex align-items-center">
                  <a href="${generateGoogleMapsLink(
                    field.fieldLocation
                  )}" target="_blank">View on Google Maps</a>
                  <img src="/assets/icons/location-arrow.svg" alt="" />
                </div>
                <div class="button-container d-flex">
                  <button class="btn-view">Learn More</button>
                  <button class="btn-update">
                    <img src="/assets/icons/edit-pen.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
        `;
      // Append the row to the table body
      mainContent.append(fieldCard);
    });

    hideActionButtons();
  }

  // Add click event to add button
  fieldAddBtn.on("click", function () {
    window.openFieldAddOrUpdatePopup(null, refreshFieldTable);
  });

  // Add click event to buttons
  mainContent.on("click", ".btn-view", function () {
    const fieldId = getFieldId(this);
    window.showFieldDetailsPopup(fieldId);
  });

  mainContent.on("click", ".btn-update", function () {
    const fieldId = getFieldId(this);
    window.openFieldAddOrUpdatePopup(fieldId, refreshFieldTable);
  });

  mainContent.on("click", ".btn-delete", function () {
    const fieldId = getFieldId(this);
    window.openFieldDeletePopup(fieldId, refreshFieldTable);
  });

  $(".search").on("click", function () {
    const name = $("#name-search").val().trim();
    const from = parseFloat($("#from-size").val().trim());
    const to = parseFloat($("#to-size").val().trim());

    this.pageNo = 0;
    filtersApplied = true;

    const filterData = {
      page: this.pageNo,
      size: 10,
    };

    // Add fields only if they have a value
    if (name) {
      filterData.name = name;
    }
    if (!isNaN(from) && from > 1) {
      filterData.fromSize = from;
    }
    if (!isNaN(to) && to > 1) {
      filterData.toSize = to;
    }
    
    filterFields(filterData)
      .then((response) => {
        mainContent.empty();
        displayFieldData(response);
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
    refreshFieldTable();
  });

  const refreshFieldTable = () => {
    pageNo = 0;
    mainContent.empty();
    loadFieldData();
  };

  // Clear filter
  function clearFilter() {
    $("#name-search").val("");
    $("#from-size").val("");
    $("#to-size").val("");
  }

  // Helper function to get staff ID
  function getFieldId(button) {
    return $(button).closest(".card").data("id");
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
  mainContent.on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const scrollHeight = $(this)[0].scrollHeight;
    const height = $(this).height();

    if (scrollHeight - scrollTop - height <= 50) {
      loadFieldData(); // Trigger loading of the next page when the user is near the bottom
    }
  });

  // Helper function to generate Google Maps link
  function generateGoogleMapsLink(coordinates) {
    let [x, y] = coordinates.split(",").map((coord) => coord.trim());
    let googleMapsURL = `https://www.google.com/maps?q=${x},${y}`;
    return googleMapsURL;
  }
});
