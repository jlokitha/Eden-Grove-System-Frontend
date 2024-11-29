$(document).ready(function () {
  const fieldAddBtn = $("#btn-crop-add");
  const viewBtns = $(".btn-view");
  const updateBtns = $(".btn-update");
  const deleteBtns = $(".btn-delete");

  // Add click event to add button
  fieldAddBtn.on("click", function () {
    window.openCropAddOrUpdatePopup();
  });

  // Add click event to buttons
  viewBtns.each(function () {
    $(this).on("click", function () {
      const cropId = getCropId(this);
      window.showCropDetailsPopup(cropId);
    });
  });

  updateBtns.each(function () {
    $(this).on("click", function () {
      const cropId = getCropId(this);
      window.openCropAddOrUpdatePopup(cropId);
    });
  });

  deleteBtns.each(function () {
    $(this).on("click", function () {
      const cropId = getCropId(this);
      window.openCropDeletePopup(cropId);
    });
  });

  // Helper function to get staff ID
  function getCropId(button) {
    return $(button).closest(".card").data("id");
  }
});
