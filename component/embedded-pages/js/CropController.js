import { findAllCrop, filterCrops } from "../../../service/CropService.js";

$(document).ready(function () {
  let pageNo = 0;
  const cropAddBtn = $("#btn-crop-add");
  const mainContent = $("#main-content");
  let isLoading = false; // Prevent multiple simultaneous loads
  let hasMorePosts = true; // Flag to check if there are more posts to load
  let filtersApplied = false; // Flag to track if filt

  $.ajaxSetup({
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  loadCropData();

  // Load staff data
  function loadCropData() {
    if (isLoading || !hasMorePosts) return;
    isLoading = true;

    if (filtersApplied) {
      // Load filtered staff if filters are applied
      filterCrops({
        page: pageNo,
        size: 10,
        name: $("#name-search").val().trim(),
      })
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false;
          } else {
            displayCropData(response);
            pageNo++;
          }
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          isLoading = false;
        });
    } else {
      findAllCrop(pageNo)
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false;
          } else {
            displayCropData(response);
            pageNo++;
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          isLoading = false;
        });
    }
  }

  function hideActionButtons() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "ADMINISTRATIVE") {
      cropAddBtn.hide();
      $(".button-container .btn-update").hide();
      $(".card .btn-delete").hide();
    }
  }

  function displayCropData(cropData) {
    cropData.forEach((crop) => {
      const cropCard = `
            <div class="card" data-id="${crop.cropCode}">
              <img src="data:image/png;base64,${crop.cropImage}" class="card-img-top" />
              <button class="btn-delete">
                <img src="/assets/icons/cancel-grey.svg" alt="" />
              </button>
              <div class="card-body">
                <h5 class="card-title">${crop.commonName}</h5>
                <p class="card-text">${crop.scientificName}</p>
                <p class="card-text">Season: ${crop.season}</p>
                <div class="button-container d-flex">
                  <button class="btn-view">Learn More</button>
                  <button class="btn-update">
                    <img src="/assets/icons/edit-pen.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
        `;
      mainContent.append(cropCard);
    });

    hideActionButtons();
  }

  // Add click event to add button
  cropAddBtn.on("click", function () {
    window.openCropAddOrUpdatePopup(null, refreshCropPage);
  });

  // Add click event to buttons
  mainContent.on("click", ".btn-view", function () {
    const cropId = getCropId(this);
    window.showCropDetailsPopup(cropId);
  });

  mainContent.on("click", ".btn-update", function () {
    const cropId = getCropId(this);
    window.openCropAddOrUpdatePopup(cropId, refreshCropPage);
  });

  mainContent.on("click", ".btn-delete", function () {
    const cropId = getCropId(this);
    window.openCropDeletePopup(cropId, refreshCropPage);
  });

  $(".search").on("click", function () {
    const name = $("#name-search").val().trim();

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

    filterCrops(filterData)
      .then((response) => {
        mainContent.empty();
        displayCropData(response);
        this.filterData = null;
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  $(".clear-filter").on("click", function () {
    filtersApplied = false;
    pageNo = 0;
    clearFilter();
    refreshCropPage();
  });

  // Clear filter
  function clearFilter() {
    $("#name-search").val("");
  }

  const refreshCropPage = () => {
    pageNo = 0;
    mainContent.empty();
    loadCropData();
  };

  // Helper function to get staff ID
  function getCropId(button) {
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
      loadCropData(); // Trigger loading of the next page when the user is near the bottom
    }
  });
});
