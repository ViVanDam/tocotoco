$(document).ready(function () {
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
});
