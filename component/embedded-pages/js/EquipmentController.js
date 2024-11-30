$(document).ready(function () {
  const equipmentAddBtn = $("#btn-equipment-add");
  const viewBtns = $(".action-container .view-btn");
  const updateBtns = $(".action-container .update-btn");
  const deleteBtns = $(".action-container .delete-btn");

  // Add click event to add button
  equipmentAddBtn.on("click", function () {
    window.openEquipmentAddOrUpdatePopup();
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
      const equipmentId = getEquipmentId(this);
      window.showEquipmentDetailsPopup(equipmentId);
    });
  });

  updateBtns.each(function () {
    $(this).on("click", function () {
      const equipmentId = getEquipmentId(this);
      window.openEquipmentAddOrUpdatePopup(equipmentId);
    });
  });

  deleteBtns.each(function () {
    $(this).on("click", function () {
      const equipmentId = getEquipmentId(this);
      window.openEquipmentDeletePopup(equipmentId);
    });
  });

  // Helper function to get staff ID
  function getEquipmentId(button) {
    return $(button).closest("tr").data("id");
  }
});
