import {
  filterLogs,
  findAllLog,
} from "../../../service/MonitoringLogService.js";

$(document).ready(function () {
  let pageNo = 0;
  const logAddBtn = $("#btn-log-add");
  const mainContent = $("#main-content");
  let isLoading = false; // Prevent multiple simultaneous loads
  let hasMorePosts = true; // Flag to check if there are more posts to load
  let filtersApplied = false; // Flag to track if filt

  $.ajaxSetup({
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  loadLogData();

  function loadLogData() {
    if (isLoading || !hasMorePosts) return;
    isLoading = true;

    if (filtersApplied) {
      filterLogs({
        page: pageNo,
        size: 10,
        name: $("#name-search").val().trim(),
        date: $("#log-date").val().trim()
          ? new Date($("#log-date").val().trim()).toISOString().slice(0, 10)
          : null,
      })
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false;
          } else {
            displayLogData(response);
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
      findAllLog(pageNo)
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false;
          } else {
            displayLogData(response);
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
      logAddBtn.hide();
      $(".button-container .btn-update").hide();
    }
  }

  function displayLogData(logData) {
    logData.forEach((log) => {
      const logCard = `
            <div class="card" data-id="${log.logCode}">
              <img src="data:image/png;base64,${
                log.observedImage
              }" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${log.logCode}</h5>
                <p class="card-text">${extractDate(log.logDate)}</p>
                <p class="card-text">Field : ${log.field.fieldName}</p>
                <div class="button-container d-flex">
                  <button class="btn-view">Learn More</button>
                  <button class="btn-update">
                    <img src="/assets/icons/edit-pen.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
        `;
      mainContent.append(logCard);
    });

    hideActionButtons();
  }

  // Add click event to add button
  logAddBtn.on("click", function () {
    window.openLogAddOrUpdatePopup(null, refreshLogPage);
  });

  // Add click event to buttons
  mainContent.on("click", ".btn-view", function () {
    const logId = getLogId(this);
    window.showLogDetailsPopup(logId);
  });

  mainContent.on("click", ".btn-update", function () {
    const logId = getLogId(this);
    window.openLogAddOrUpdatePopup(logId, refreshLogPage);
  });

  $(".search").on("click", function () {
    const name = $("#name-search").val().trim();
    const date = $("#log-date").val().trim();

    this.pageNo = 0;
    filtersApplied = true;

    const filterData = {
      page: this.pageNo,
      size: 10,
    };

    if (name) {
      filterData.name = name;
    }
    if (date) {
      filterData.date = new Date(date).toISOString().slice(0, 10);
    }

    filterLogs(filterData)
      .then((response) => {
        mainContent.empty();
        displayLogData(response);
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
    refreshLogPage();
  });

  const refreshLogPage = () => {
    pageNo = 0;
    mainContent.empty();
    loadLogData();
  };

  function clearFilter() {
    $("#name-search").val("");
    $("#log-date").val("");
  }

  // Helper function to get staff ID
  function getLogId(button) {
    return $(button).closest(".card").data("id");
  }

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
      loadLogData(); // Trigger loading of the next page when the user is near the bottom
    }
  });

  function extractDate(dateTime) {
    const date = new Date(dateTime);
    return date.toISOString().slice(0, 10);
  }
});
