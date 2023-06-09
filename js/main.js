$(document).ready(function () {
  // -------------- handle click acc-logo ------------------
  $("header .acc-logo").click(function (e) {
    e.preventDefault();
    window.location = "account.html";
  });

  // -------------- handle click login btn ------------------
  $("header .login-btn").click(function (e) {
    e.preventDefault();
    window.location = "login.html";
  });

  // -------------- handle loged in website ----------------
  var loginAcc = JSON.parse(localStorage.getItem("accLogin"));
  if (loginAcc) {
    $(".login-btn").css("display", "none");
    $(".acc-logo").css("display", "block");
  } else {
    $(".acc-logo").css("display", "none");
    $(".login-btn").css("display", "block");
  }

  function gotopage(selector) {
    $(selector).click(function (e) {
      e.preventDefault();
      let link = $(this).attr("href");
      window.location = link;
    });
  }

  $(".back-home-page").attr("href", "index.html");
  $(".logo").attr("href", "index.html");
  gotopage(".nav-link.products-page");
  gotopage(".logo");
  gotopage(".back-home-page");

  $(window).resize(function () {
    if ($(window).width() < 400) {
      $(".container-fluid")
        .removeClass("container-fluid")
        .addClass("container");
    } else {
      $(".container").removeClass("container").addClass("container-fluid");
    }
  });
});
