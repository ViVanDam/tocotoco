$(document).ready(function () {
  var userList = [{ phone: "0978395031", pass: "A1b2c3$" }];
  localStorage.setItem("userList", JSON.stringify(userList));
  //   regex phone
  var phoneRegex =
    /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/;
  var phoneInput = $("#phone");
  phoneInput.on("keyup", function () {
    if (phoneRegex.test(phoneInput.val())) {
      phoneInput.removeClass("is-invalid"); // Nếu giá trị trường input đúng định dạng, xóa class is-invalid và ẩn thông báo lỗi
      $(".invalid-feedback-phone").hide();
      $(".star-phone.star-red").css("display", "none");
    } else {
      phoneInput.addClass("is-invalid"); // Nếu giá trị trường input không đúng định dạng, thêm class is-invalid và hiển thị thông báo lỗi
      $(".invalid-feedback-phone").show();
      $(".star-phone.star-red").css("display", "inline-block");
    }
  });

  //   regex password
  var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])$/; // Biểu thức chính quy để kiểm tra email có hợp lệ không
  var passInput = $("#pass");
  passInput.on("keyup", function () {
    if (passInput.val().length >= 6 && passInput.val().match(passRegex)) {
      passInput.removeClass("is-invalid");
      $(".invalid-feedback-pass").hide();
      $(".star-pass.star-red").css("display", "none");
    } else {
      passInput.addClass("is-invalid");
      $(".invalid-feedback-pass").show();
      if (passInput.val().length < 6) {
        $(".invalid-feedback-pass").text("Mật khẩu phải có ít nhất 6 kí tự");
      } else {
        $(".invalid-feedback-pass").text(
          "Mật khẩu phải có ít nhất một chữ hoa, một chữ thường, một chữ số và một ký tự đặc biệt từ tập hợp [@ $!%*?&]."
        );
      }
      $(".star-pass.star-red").css("display", "inline-block");
    }
  });
  passInput.on("blur", function () {
    if (passInput.val().length >= 6 && passInput.val().match(passRegex)) {
      passInput.removeClass("is-invalid");
      $(".invalid-feedback-pass").hide();
      $(".star-pass.star-red").css("display", "none");
    }
  });

  //   regex re-password
  // Biểu thức chính quy để kiểm tra email có hợp lệ không
  var rePassInput = $("#re-pass");
  rePassInput.on("keyup", function () {
    var pass = $("#pass").val();
    if (pass === rePassInput.val()) {
      rePassInput.removeClass("is-invalid"); // Nếu giá trị trường input đúng định dạng, xóa class is-invalid và ẩn thông báo lỗi
      $(".invalid-feedback-re-pass").hide();
      $(".star-re-pass.star-red").css("display", "none");
    } else {
      rePassInput.addClass("is-invalid"); // Nếu giá trị trường input không đúng định dạng, thêm class is-invalid và hiển thị thông báo lỗi
      $(".invalid-feedback-re-pass").show();
      $(".star-re-pass.star-red").css("display", "inline-block");
    }
  });

  var signupBtn = $(".signup-btn");
  $(signupBtn).click(function (e) {
    e.preventDefault();
    var phone = $("#phone").val();
    var pass = $("#pass").val();
    var newUser = { phone: phone, pass: pass };
    userList.push(newUser);
    if (phone != "" && pass != "") {
      localStorage.setItem("userList", JSON.stringify(userList));
      alert("Đăng ký tài khoản thành công!");
      window.location = "login.html";
    } else {
      alert("vui lòng nhập đầy đủ thông tin trước khi đăng ký!");
    }
  });
});
