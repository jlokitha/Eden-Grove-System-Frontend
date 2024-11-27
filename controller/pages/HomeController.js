$(document).ready(function () {
  $(".nav-btn:first").addClass("nav-btn-active");

  const navButtons = $("#nav-btn-container > .nav-btn");
  const iframe = $("#embedded-page");

  navButtons.each(function () {
    $(this).on("click", function () {
      navButtons.removeClass("nav-btn-active");
      $(this).addClass("nav-btn-active");
      const path = $(this).attr("page");
      console.log(path);

      iframe.attr("src", path);
    });
  });

  $("#logout-btn").on("mouseenter", function () {
    $("#logout-icon").attr("src", "/assets/icons/logout-red.svg");
  });

  $("#logout-btn").on("mouseleave", function () {
    $("#logout-icon").attr("src", "/assets/icons/logout-black.svg");
  });

  $("#logout-btn").on("click", function () {
    window.location.href = "/index.html";
  });

  function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    $("#date").text(date);
    $("#time").text(time);
  }
  setInterval(updateDateTime, 1000);
});
