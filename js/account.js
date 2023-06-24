$(document).ready(function () {
  // get accLogin
  var accLogin = JSON.parse(localStorage.getItem("accLogin"));
  var phone = accLogin.phone;
  $(".info-item .phone input").attr("value", phone);

  //   handle show content by title item in the left window list
  var cateList = document.querySelectorAll(".category-list .list-group-item");
  $(cateList).click(function (e) {
    e.preventDefault();
    $(cateList).removeClass("content-active");
    $(this).addClass("content-active");
    var href = $(this.querySelector("a")).attr("href");
    if (href == "#ttct") {
      $(".main-content #ttct").css("display", "block");
      $(".main-content #dhct").css("display", "none");
      $(".main-content #mkm").css("display", "none");
    } else if (href == "#dhct") {
      $(".main-content #ttct").css("display", "none");
      $(".main-content #dhct").css("display", "block");
      $(".main-content #mkm").css("display", "none");
    } else if (href == "#mkm") {
      $(".main-content #ttct").css("display", "none");
      $(".main-content #dhct").css("display", "none");
      $(".main-content #mkm").css("display", "block");
    } else if (href.includes("products.html")) {
      window.location = "../products.html";
    } else if (href.includes("logout")) {
      localStorage.removeItem("accLogin");
      window.location = "../login.html";
    } else {
      $(".main-content #ttct").css("display", "none");
      $(".main-content #dhct").css("display", "none");
      $(".main-content #mkm").css("display", "none");
    }
  });

  // handle click menu btn
  $(".categories-btn .btn-cate-menu .btn-menu").click(function (e) {
    e.preventDefault();
    $(".btn-cate-menu .btn-menu").css("display", "none");
    $(".btn-cate-menu .x-btn").css("display", "block");
    $(".categories-btn .category-list").css("display", "block");
  });

  $(".categories-btn .btn-cate-menu .x-btn").click(function (e) {
    e.preventDefault();
    $(".btn-cate-menu .x-btn").css("display", "none");
    $(".btn-cate-menu .btn-menu").css("display", "block");
    $(".categories-btn .category-list").css("display", "none");
  });
});
