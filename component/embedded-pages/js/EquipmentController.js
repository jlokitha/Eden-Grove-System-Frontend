import {
  findAllEquipment,
  filterAllEquipment,
} from "../../../service/EquipmentService.js";

$(document).ready(function () {
  let pageNo = 0;
  const equipmentAddBtn = $("#btn-equipment-add");
  const equipmentTableBody = $("#table-container tbody");
  let isLoading = false; // Prevent multiple simultaneous loads
  let hasMorePosts = true; // Flag to check if there are more posts to load
  let filtersApplied = false; // Flag to track if filters are applied

  $.ajaxSetup({
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  loadEquipmentData();

  function loadEquipmentData() {
    if (isLoading || !hasMorePosts) return;
    isLoading = true;

    if (filtersApplied) {
      filterAllEquipment({
        page: pageNo,
        size: 20,
        category: $("#type-dp").val().trim(),
        status: $("#status-dp").val().trim(),
      })
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false;
          } else {
            displayEquipmentData(response);
            pageNo++;
          }
        })
        .finally(() => {
          isLoading = false;
        });
    } else {
      findAllEquipment(pageNo, 20)
        .then((response) => {
          if (response.length === 0) {
            hasMorePosts = false;
          } else {
            displayEquipmentData(response);
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
      equipmentAddBtn.hide();
      $(".action-container .update-btn").hide();
      $(".action-container .delete-btn").hide();
    }
  }

  function displayEquipmentData(equipmentData) {
    equipmentData.forEach((equipment) => {
      let statusClass = "";
      let statusText = "";
      if (equipment.status === "AVAILABLE") {
        statusClass = "available-tag";
        statusText = "Available";
      } else if (equipment.status === "OUT_OF_SERVICE") {
        statusClass = "out-of-service-tag";
        statusText = "Out of Service";
      } else if (equipment.status === "IN_USE") {
        statusClass = "in-use-tag";
        statusText = "In Use";
      } else {
        statusClass = "under-maintenance-tag";
        statusText = "Under Maintenance";
      }

      const equipmentRow = `
            <tr data-id="${equipment.equipmentId}">
              <td>${equipment.name}</td>
              <td>${equipment.type}</td>
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
      equipmentTableBody.append(equipmentRow);
    });

    hideActionButtonsIfScientist();
  }

  // Add click event to add button
  equipmentAddBtn.on("click", function () {
    window.openEquipmentAddOrUpdatePopup(null, refreshEquipmentTable);
  });

  equipmentTableBody.on("mouseenter", ".view-btn", function () {
    $(this).css("background", "#D0E3FF");
    $(this).find("img").attr("src", "/assets/icons/eye-open-color.svg");
  });

  equipmentTableBody.on("mouseleave", ".view-btn", function () {
    $(this).css("background", "#f9f9f9");
    $(this).find("img").attr("src", "/assets/icons/eye-open.svg");
  });

  equipmentTableBody.on("mouseenter", ".update-btn", function () {
    $(this).css("background", "#DEFFEC");
    $(this).find("img").attr("src", "/assets/icons/update-color.svg");
  });

  equipmentTableBody.on("mouseleave", ".update-btn", function () {
    $(this).css("background", "#f9f9f9");
    $(this).find("img").attr("src", "/assets/icons/update.svg");
  });

  equipmentTableBody.on("mouseenter", ".delete-btn", function () {
    $(this).css("background", "#FFE0E0");
    $(this).find("img").attr("src", "/assets/icons/delete-color.svg");
  });

  equipmentTableBody.on("mouseleave", ".delete-btn", function () {
    $(this).css("background", "#f9f9f9");
    $(this).find("img").attr("src", "/assets/icons/delete.svg");
  });

  // Add click event to buttons
  equipmentTableBody.on("click", ".view-btn", function () {
    const equipmentId = getEquipmentId(this);
    window.showEquipmentDetailsPopup(equipmentId);
  });

  equipmentTableBody.on("click", ".update-btn", function () {
    const equipmentId = getEquipmentId(this);
    window.openEquipmentAddOrUpdatePopup(equipmentId, refreshEquipmentTable);
  });

  equipmentTableBody.on("click", ".delete-btn", function () {
    const equipmentId = getEquipmentId(this);
    window.openEquipmentDeletePopup(equipmentId, refreshEquipmentTable);
  });

  $(".search").on("click", function () {
    const type = $("#type-dp").val().trim();
    const status = $("#status-dp").val().trim();

    this.pageNo = 0;
    filtersApplied = true;

    const filterData = {
      page: this.pageNo,
      size: 20,
    };

    if (type && type !== "ALL") {
      filterData.type = type;
    }
    if (status && status !== "ALL") {
      filterData.status = status;
    }

    filterAllEquipment(filterData).then((response) => {
      equipmentTableBody.empty();
      displayEquipmentData(response);
      this.filterData = null;
    });
  });

  $(".clear-filter").on("click", function () {
    filtersApplied = false;
    pageNo = 0;
    clearFilter();
    refreshEquipmentTable();
  });

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
      loadEquipmentData();
    }
  });

  const refreshEquipmentTable = () => {
    pageNo = 0;
    equipmentTableBody.empty();
    loadEquipmentData();
  };

  function clearFilter() {
    $("#type-dp").val("ALL");
    $("#status-dp").val("ALL");
  }

  // Helper function to get staff ID
  function getEquipmentId(button) {
    return $(button).closest("tr").data("id");
  }
});
