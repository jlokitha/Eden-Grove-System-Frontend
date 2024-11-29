$(document).ready(function () {
  const fieldAddBtn = $("#btn-log-add");
  const viewBtns = $(".btn-view");
  const updateBtns = $(".btn-update");
  const deleteBtns = $(".btn-delete");

  // Add click event to add button
  fieldAddBtn.on("click", function () {
    window.openLogAddOrUpdatePopup();
  });

  // Add click event to buttons
  viewBtns.each(function () {
    $(this).on("click", function () {
      const logId = getLogId(this);
      window.showLogDetailsPopup(logId);
    });
  });

  updateBtns.each(function () {
    $(this).on("click", function () {
      const logId = getLogId(this);
      window.openLogAddOrUpdatePopup(logId);
    });
  });

  deleteBtns.each(function () {
    $(this).on("click", function () {
      const logId = getLogId(this);
      window.openLogDeletePopup(logId);
    });
  });

  // Helper function to get staff ID
  function getLogId(button) {
    return $(button).closest(".card").data("id");
  }
});
