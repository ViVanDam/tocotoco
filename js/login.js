$(document).ready(function () {
  var userList = JSON.parse(localStorage.getItem("userList"));
  console.log(userList);
  $(".login-btn").click(function (e) {
    e.preventDefault();
    var phone = $(".phone").val();
    var pass = $(".pass").val();
    var invalid = false;
    var loginAcc;
    userList.forEach((user) => {
      if (phone == user.phone && pass == user.pass) {
        invalid = true;
        loginAcc = user;
        return;
      }
    });
    if (invalid) {
      localStorage.setItem("accLogin", JSON.stringify(loginAcc));
      window.location = "account.html";
    } else {
      alert(
        "Đăng nhập không thành công! Vui lòng kiểm tra lại số điện thoại hoặc mật khẩu!"
      );
    }
  });
});
