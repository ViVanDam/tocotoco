$(document).ready(function () {
  //   handle event when click logout button
  var logoutBtn = document.querySelector("a#logout");
  $(logoutBtn).click(function (e) {
    e.preventDefault();
    localStorage.removeItem("accLogin");
    location.reload();
  });

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
    } else if ((href = "products.html")) {
      window.location = "../products.html";
      // } else if ((href = "logout")) {
      //   localStorage.removeItem("accLogin");
      //   location.reload();
    } else {
      $(".main-content #ttct").css("display", "none");
      $(".main-content #dhct").css("display", "none");
      $(".main-content #mkm").css("display", "none");
    }
  });
});
