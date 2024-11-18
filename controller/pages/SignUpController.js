$(document).ready(function () {
  // Password visibility toggle
  $(".visibility-toggle").click(function () {
    const passwordInput = $(this).siblings("input");
    const type =
      passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);

    // Toggle eye icon (assuming you have both open and closed eye icons)
    const img = $(this);
    const currentSrc = img.attr("src");
    img.attr(
      "src",
      currentSrc.includes("/assets/icons/eye-close.svg")
        ? "/assets/icons/eye-open.svg"
        : "/assets/icons/eye-close.svg"
    );
  });

  $("form").on("submit", (e) => {
    console.log("submit");

    e.preventDefault();

    const email = $('input[type="email"]').val();
    const password = $('input[placeholder="Password"]').val();
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$).{6,}$/;

    if (emailRegex.test(email)) {
      if (passwordRegex.test(password)) {
        const signInData = {
          email: email,
          password: password,
        };

        console.log(signInData);

        // window.location.href = "/index.html";
      } else {
        $('input[placeholder="Password"]')[0].setCustomValidity(
          "Password must be at least 6 characters long, and contain at least one letter, one number, and one symbol. Only letters, numbers, and symbols are allowed."
        );
        $('input[placeholder="Password"]')[0].reportValidity();
      }
    } else {
      $('input[type="email"]')[0].setCustomValidity(
        "Please enter a valid email address (e.g., example@domain.com)."
      );
      $('input[type="email"]')[0].reportValidity();
    }
  });
});
