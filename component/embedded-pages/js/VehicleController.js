import {
  findAllVehicle,
  filterAllVehicle,
} from "../../../service/VehicleService.js";

$(document).ready(function () {
  let pageNo = 0;
  const vehicleAddBtn = $("#btn-vehicle-add");
  const vehicleTableBody = $("#table-container tbody");
  let isLoading = false; // Prevent multiple simultaneous loads
  let hasMorePosts = true; // Flag to check if there are more posts to load
  let filtersApplied = false; // Flag to track if filters are applied

  $.ajaxSetup({
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  loadVehicleData();

  function loadVehicleData() {
    if (isLoading || !hasMorePosts) return;
    isLoading = true;

    if (filtersApplied) {
      filterAllVehicle({
        page: pageNo,
        size: 20,
        category: $("#category-search").val().trim(),
        status: $("#status-dp").val().trim(),
      })
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false;
          } else {
            displayVehicleData(response);
            pageNo++;
          }
        })
        .finally(() => {
          isLoading = false;
        });
    } else {
      findAllVehicle(pageNo, 20)
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false;
          } else {
            displayVehicleData(response);
            pageNo++;
          }
        })
        .finally(() => {
          isLoading = false;
        });
    }
  }

  function hideActionButtonsIfScientist() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "SCIENTIST") {
      vehicleAddBtn.hide();
      $(".action-container .update-btn").hide();
      $(".action-container .delete-btn").hide();
    }
  }

  function displayVehicleData(vehicleData) {
    vehicleData.forEach((vehicle) => {
      let statusClass = "";
      let statusText = "";
      if (vehicle.status === "AVAILABLE") {
        statusClass = "available-tag";
        statusText = "Available";
      } else if (vehicle.status === "OUT_OF_SERVICE") {
        statusClass = "out-of-service-tag";
        statusText = "Out of Service";
      } else if (vehicle.status === "IN_USE") {
        statusClass = "in-use-tag";
        statusText = "In Use";
      } else {
        statusClass = "under-maintenance-tag";
        statusText = "Under Maintenance";
      }

      const vehicleRow = `
            <tr data-id="${vehicle.vehicleCode}">
              <td>${vehicle.licensePlateNo}</td>
              <td>${vehicle.category}</td>
              <td>${vehicle.fuelType}</td>
              <td class="d-flex justify-content-center">
                <p class="${statusClass}">${statusText}</p>
              </td>
              <td>
                <div class="action-container d-flex">
                  <button class="view-btn">
                    <img
                      src="/assets/icons/eye-open.svg"
                      alt="Eye open svg in grey color"
                    /></button
                  ><button class="update-btn">
                    <img
                      src="/assets/icons/update.svg"
                      alt="Update svg in grey color"
                    /></button
                  ><button class="delete-btn">
                    <img
                      src="/assets/icons/delete.svg"
                      alt="Delete svg in grey color"
                    />
                  </button>
                </div>
              </td>
            </tr>
        `;
      vehicleTableBody.append(vehicleRow);
    });

    hideActionButtonsIfScientist();
  }

  // Add click event to add button
  vehicleAddBtn.on("click", function () {
    window.openVehicleAddOrUpdatePopup(null, refreshVehicleTable);
  });

  // Delegate hover effect to buttons using event delegation
  vehicleTableBody.on("mouseenter", ".view-btn", function () {
    $(this).css("background", "#D0E3FF");
    $(this).find("img").attr("src", "/assets/icons/eye-open-color.svg");
  });

  vehicleTableBody.on("mouseleave", ".view-btn", function () {
    $(this).css("background", "#f9f9f9");
    $(this).find("img").attr("src", "/assets/icons/eye-open.svg");
  });

  vehicleTableBody.on("mouseenter", ".update-btn", function () {
    $(this).css("background", "#DEFFEC");
    $(this).find("img").attr("src", "/assets/icons/update-color.svg");
  });

  vehicleTableBody.on("mouseleave", ".update-btn", function () {
    $(this).css("background", "#f9f9f9");
    $(this).find("img").attr("src", "/assets/icons/update.svg");
  });

  vehicleTableBody.on("mouseenter", ".delete-btn", function () {
    $(this).css("background", "#FFE0E0");
    $(this).find("img").attr("src", "/assets/icons/delete-color.svg");
  });

  vehicleTableBody.on("mouseleave", ".delete-btn", function () {
    $(this).css("background", "#f9f9f9");
    $(this).find("img").attr("src", "/assets/icons/delete.svg");
  });

  // Add click event to buttons
  vehicleTableBody.on("click", ".view-btn", function () {
    const vehicleId = getVehicleId(this);
    window.showVehicleDetailsPopup(vehicleId);
  });

  vehicleTableBody.on("click", ".update-btn", function () {
    const vehicleId = getVehicleId(this);
    window.openVehicleAddOrUpdatePopup(vehicleId, refreshVehicleTable);
  });

  vehicleTableBody.on("click", ".delete-btn", function () {
    const vehicleId = getVehicleId(this);
    window.openVehicleDeletePopup(vehicleId, refreshVehicleTable);
  });

  $(".search").on("click", function () {
    const category = $("#category-search").val().trim();
    const status = $("#status-dp").val().trim();

    this.pageNo = 0;
    filtersApplied = true;

    const filterData = {
      page: this.pageNo,
      size: 20,
    };

    if (category) {
      filterData.category = category;
    }
    if (status && status !== "ALL") {
      filterData.status = status;
    }

    filterAllVehicle(filterData).then((response) => {
      vehicleTableBody.empty();
      displayVehicleData(response);
      this.filterData = null;
    });
  });

  $(".clear-filter").on("click", function () {
    filtersApplied = false;
    pageNo = 0;
    clearFilter();
    refreshVehicleTable();
  });

  const refreshVehicleTable = () => {
    pageNo = 0;
    vehicleTableBody.empty();
    loadVehicleData();
  };

  function getCookie(name) {
    return document.cookie.split("; ").reduce((acc, cookie) => {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
      return acc;
    }, null);
  }

  $("#table-container").on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const scrollHeight = $(this)[0].scrollHeight;
    const height = $(this).height();

    if (scrollHeight - scrollTop - height <= 50) {
      loadVehicleData();
    }
  });

  // Clear filter
  function clearFilter() {
    $("#category-search").val("");
    $("#status-dp").val("ALL");
  }

  // Helper function to get staff ID
  function getVehicleId(button) {
    return $(button).closest("tr").data("id");
  }
});
