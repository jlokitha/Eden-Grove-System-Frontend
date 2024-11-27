$(document).ready(function () {
  const staffAddBtn = $("#btn-staff-add");
  const viewBtns = $(".action-container .view-btn");
  const updateBtns = $(".action-container .update-btn");
  const deleteBtns = $(".action-container .delete-btn");

  // Add click event to add button
  staffAddBtn.on("click", function () {
    window.openStaffAddOrUpdatePopup();
  });

  // Add hover effect to buttons
  viewBtns.each(function () {
    $(this).on("mouseenter", function () {
      $(this).css("background", "#D0E3FF");
      $(this).find("img").attr("src", "/assets/icons/eye-open-color.svg");
    });
    $(this).on("mouseleave", function () {
      $(this).css("background", "#f9f9f9");
      $(this).find("img").attr("src", "/assets/icons/eye-open.svg");
    });
  });
  updateBtns.each(function () {
    $(this).on("mouseenter", function () {
      $(this).css("background", "#DEFFEC");
      $(this).find("img").attr("src", "/assets/icons/update-color.svg");
    });
    $(this).on("mouseleave", function () {
      $(this).css("background", "#f9f9f9");
      $(this).find("img").attr("src", "/assets/icons/update.svg");
    });
  });
  deleteBtns.each(function () {
    $(this).on("mouseenter", function () {
      $(this).css("background", "#FFE0E0");
      $(this).find("img").attr("src", "/assets/icons/delete-color.svg");
    });
    $(this).on("mouseleave", function () {
      $(this).css("background", "#f9f9f9");
      $(this).find("img").attr("src", "/assets/icons/delete.svg");
    });
  });

  // Add click event to buttons
  viewBtns.each(function () {
    $(this).on("click", function () {
      const staffId = getStaffId(this);
      window.showStaffDetailsPopup(staffId);
    });
  });

  updateBtns.each(function () {
    $(this).on("click", function () {
      const staffId = getStaffId(this);
      window.openStaffAddOrUpdatePopup(staffId);
    });
  });

  deleteBtns.each(function () {
    $(this).on("click", function () {
      const staffId = getStaffId(this);
      window.openStaffDeletePopup(staffId);
    });
  });

  // Helper function to get staff ID
  function getStaffId(button) {
    return $(button).closest("tr").data("id");
  }
});
