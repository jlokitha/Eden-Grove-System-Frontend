$(document).ready(function () {
  $(".close-btn").click(function () {
    $("#equipment-add-or-update-popup").fadeOut();
    $(".overlay").hide();
  });

  // Function to open the staff add or update popup
  window.openEquipmentAddOrUpdatePopup = function (equipmentId) {
    if (equipmentId) {
      $("#equipment-add-or-update-popup .title-container h1").text(
        "Update Equipment"
      );
      $("#btn-save").hide();
      $("#btn-update").show();
      $("#equipment-add-or-update-popup").fadeIn();
      $(".overlay").show();
    } else {
      $("#equipment-add-or-update-popup .title-container h1").text(
        "Add Equipment"
      );
      $("#btn-save").show();
      $("#btn-update").hide();
      $("#equipment-add-or-update-popup").fadeIn();
      $(".overlay").show();
    }
  };

  // Function to show staff details in the select
  $("#staff-dp").select2();
  $("#field-dp").select2();

  $("#staff-dp").on("select2:open", function () {
    $(".select2-search__field").on("input", function () {
      console.log("Input value:", $(this).val());
    });
  });

  $("#field-dp").on("select2:open", function () {
    $(".select2-search__field").on("input", function () {
      console.log("Input value:", $(this).val());
    });
  });
});
