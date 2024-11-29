$(document).ready(function () {
  const fieldAddBtn = $("#btn-field-add");
  const viewBtns = $(".btn-view");
  const updateBtns = $(".btn-update");
  const deleteBtns = $(".btn-delete");

  // Add click event to add button
  fieldAddBtn.on("click", function () {
    window.openFieldAddOrUpdatePopup();
  });

  // Add click event to buttons
  viewBtns.each(function () {
    $(this).on("click", function () {
      const fieldId = getFieldId(this);
      window.showFieldDetailsPopup(fieldId);
    });
  });

  updateBtns.each(function () {
    $(this).on("click", function () {
      const fieldId = getFieldId(this);
      window.openFieldAddOrUpdatePopup(fieldId);
    });
  });

  deleteBtns.each(function () {
    $(this).on("click", function () {
      const fieldId = getFieldId(this);
      window.openFieldDeletePopup(fieldId);
    });
  });

  // Helper function to get staff ID
  function getFieldId(button) {
    return $(button).closest(".card").data("id");
  }
});
