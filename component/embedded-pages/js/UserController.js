$(document).ready(function () {
  const deleteBtns = $(".action-container .delete-btn");

  // Add hover effect to buttons
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
  deleteBtns.each(function () {
    $(this).on("click", function () {
      const userId = getUserId(this);
      window.openUserDeletePopup(userId);
    });
  });

  // Helper function to get staff ID
  function getUserId(button) {
    return $(button).closest("tr").data("id");
  }
});
