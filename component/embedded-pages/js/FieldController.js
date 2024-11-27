$(document).ready(function () {
  const viewBtns = $(".btn-view");
  const updateBtns = $(".btn-update");
  const deleteBtns = $(".btn-delete");

  // Add click event to buttons
  viewBtns.each(function () {
    $(this).on("click", function () {
      const fieldId = getFieldId(this);
      console.log("View btn clicked for Field ID: " + fieldId);
    });
  });

  updateBtns.each(function () {
    $(this).on("click", function () {
      const fieldId = getFieldId(this);
      console.log("Update btn clicked for Field ID: " + fieldId);
    });
  });

  deleteBtns.each(function () {
    $(this).on("click", function () {
      const fieldId = getFieldId(this);
      console.log("Delete btn clicked for Field ID: " + fieldId);
    });
  });

  // Helper function to get staff ID
  function getFieldId(button) {
    return $(button).closest(".card").data("id");
  }
});
