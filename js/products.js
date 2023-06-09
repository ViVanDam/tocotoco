$(document).ready(function () {
  // --------------- handle order form modal event --------------
  function handleOrderFormModal() {
    // get product list
    var productItems = document.querySelectorAll(".product-list .product-item");
    // Get the modal
    var modal = $("#order-form");

    productItems.forEach((product) => {
      var productImg = $(product.querySelector("img")).attr("src");
      var productName = $(product.querySelector(".product-name")).text();
      var newPrice = $(product.querySelector(".new-product-price")).text();
      var oldPrice = $(product.querySelector(".old-product-price")).text();
      var addBtn = product.querySelector(".add-to-cart-btn");
      // When the user clicks on the button, open the modal
      $(addBtn).click(function (e) {
        $(modal).css("display", "block");
        var productItemContent = `
        <img
          class="col col-md-4"
          src="${productImg}"
          alt=""
        />
        <div class="modal_product-content col-col-md-8">
          <p class="product-name">${productName}</p>
          <div class="price d-flex">
            <p class="new-product-price">${newPrice}</p>
            <p class="old-product-price">${oldPrice}</p>
          </div>
          <div class="price-box">
            <div class="order-quantity">
              <span class="minus">-</span>
              <input class="quantity" value="1" max="10" min="1"></input>
              <span class="plus">+</span>
            </div>
            <div class="order btn-a-link">
              +<a class="order-price" href="#">25,000</a>đ
            </div>
          </div>
        </div>`;
        $(".order-modal .modal-product-content").html(productItemContent);

        $(".cart .order-item .no-item").css("display", "none");

        const modalMinus = document.querySelector(".order-quantity .minus");
        const modalPlus = document.querySelector(".order-quantity .plus");
        const modalQuantity = document.querySelector(
          ".order-quantity .quantity"
        );

        var newPriceNum = newPrice.split("đ", 1);
        newPriceNum = parseInt(newPriceNum) * 1000;
        var orderPrice = newPriceNum;

        modalMinus.addEventListener("click", function () {
          const currentValue = parseInt(modalQuantity.value);
          if (currentValue > 1) {
            modalQuantity.value = currentValue - 1;
            orderPrice = orderPrice - newPriceNum;
            $(".order .order-price").text(orderPrice.toLocaleString());
          }
        });

        modalPlus.addEventListener("click", function () {
          const currentValue = parseInt(modalQuantity.value);
          modalQuantity.value = currentValue + 1;
          orderPrice = orderPrice + newPriceNum;
          $(".order .order-price").text(orderPrice.toLocaleString());
        });

        // get form
        var form = document.querySelector(".order-modal form");
        // Lấy tất cả các phần tử "input" trong "choise"
        var toppings = form.querySelectorAll('.choise input[type="checkbox"]');
        var totalToppingPrice = 0;
        // Lặp qua tất cả các phần tử "input"
        for (var i = 0; i < toppings.length; i++) {
          // Thêm sự kiện "change" cho mỗi phần tử "input"
          toppings[i].addEventListener("change", function () {
            // Kiểm tra xem phần tử "input" đã được chọn chưa
            if (this.checked) {
              // nếu đã được chọn
              var toppingPrice =
                this.parentNode.querySelector(".topping-price").textContent;
              // Bước 1: Xóa ký tự '+' và 'đ' ra khỏi chuỗi
              toppingPrice = toppingPrice.replace(/[+đ]/g, "");
              toppingPrice = parseInt(toppingPrice);
              toppingPrice = toppingPrice * 1000;
              totalToppingPrice += toppingPrice;
              orderPrice += toppingPrice;
              $(".order .order-price").text(orderPrice.toLocaleString());
            } else {
              // Nếu chưa đc chọn
              var toppingPrice =
                this.parentNode.querySelector(".topping-price").textContent;
              // Bước 1: Xóa ký tự '+' và 'đ' ra khỏi chuỗi
              toppingPrice = toppingPrice.replace(/[+đ]/g, "");
              toppingPrice = parseInt(toppingPrice);
              toppingPrice = toppingPrice * 1000;
              totalToppingPrice -= toppingPrice;
              orderPrice -= toppingPrice;
              $(".order .order-price").text(orderPrice.toLocaleString());
            }
          });
        }

        $(".order-modal .order").click(function (e) {
          var modalNote = "";
          // get form
          var form = document.querySelector(".order-modal form");
          // get all item radio in form
          var size = form.querySelector(
            ".choise input[name='size']:checked"
          ).value;

          var radios = form.querySelectorAll('input[type="radio"]');
          var radioValues = "";

          // loop all input radio
          for (var i = 0; i < radios.length; i++) {
            // check which input is checked
            if (radios[i].checked) {
              // add value of radio is checked into radioValues
              radioValues = radioValues + radios[i].value + ", ";
            }
          }

          // Lấy tất cả các phần tử "input" trong "choise"
          var toppings = form.querySelectorAll(
            '.choise input[type="checkbox"]'
          );
          var toppingText = "";
          // loop all input radio
          for (var i = 0; i < toppings.length; i++) {
            // check which input is checked
            if (toppings[i].checked) {
              // add value of checckbox is checked into toppingText
              toppingText = toppingText + toppings[i].value + ", ";
            }
          }

          modalNote = modalNote + toppingText + radioValues;
          modalNote = modalNote.replace(/(S|M|L),/g, "");
          var orderItem = `<div class="cart-item col col-md-12">
                    <h6 class="cart-item-name">${productName}<span>(${size})</span></h6>
                    <p class="cart-item-note">
                      ${modalNote}
                    </p>
                    <div class="cart-item-price">
                      <span class="item-price">${newPriceNum.toLocaleString()}</span>
                      <span>đ</span>
                      <span>x</span>
                      <span class="show-quantity">${modalQuantity.value}</span>
                      <span>=</span>
                      <span class="calc-price">${(
                        modalQuantity.value *
                        (newPriceNum + totalToppingPrice)
                      ).toLocaleString()}</span>
                      <span>đ</span>
                    </div>
                    <div class="edit-quantity">
                      <span class="minus">-</span>
                      <input class="quantity" readonly value="${
                        modalQuantity.value
                      }" max="10" min="1"></input>
                      <span class="plus">+</span>
                    </div>
                  </div>`;
          $(".cart .order-item").append(orderItem);
          $(modal).css("display", "none");

          // get cart
          const totalCart = document.querySelector(".cart .order-price");
          // get all order cart item
          const orderProducts = document.querySelectorAll(".cart-item");
          // get the total quantity of cart
          const totalCartQuantity = totalCart.querySelector(
            ".cart .order-price .total-quantity"
          );
          // get the total price of cart
          const totalCartPrice = totalCart.querySelector(
            ".cart .order-price .total-price"
          );

          var totalQuantity = 0;
          var totalPrice = 0;
          // get total quantity value of all order item
          const quantities = document.querySelectorAll(
            ".edit-quantity .quantity"
          );
          // get total price value of all order item
          const prices = document.querySelectorAll(
            ".cart-item-price .calc-price"
          );

          // loop all quantity of order item to get all quantity value
          quantities.forEach((quantity) => {
            const quantityValue = parseInt($(quantity).val());
            totalQuantity = totalQuantity + quantityValue;
          });
          // loop all price of order item to get all price value
          prices.forEach((price) => {
            const priceValue = parseInt($(price).text()) * 1000;
            totalPrice = totalPrice + priceValue;
          });

          // set value for total of quantity cart and price cart
          $(totalCartQuantity).text(totalQuantity);
          $(totalCartPrice).text(totalPrice.toLocaleString());
          handleCart(orderProducts);

          var toppings = document.querySelectorAll(
            '.choise input[type="checkbox"]:checked'
          );

          toppings.forEach((topping) => {
            $(topping).prop("checked", false);
          });
        });
      });

      // Get the <span> element that closes the modal
      var closeBtn = $(".order-modal .modal-content #cls");
      $(closeBtn).click(function (e) {
        $(modal).css("display", "none");
        $(".order-quantity .quantity").val(1);
        var toppings = document.querySelectorAll(
          '.choise input[type="checkbox"]:checked'
        );

        toppings.forEach((topping) => {
          $(topping).prop("checked", false);
        });
      });
      // When the user clicks anywhere outside of the modal, close it
      $(window).click(function (e) {
        if (e.target == modal) {
          $(modal).css("display", "none");
          $(modalQuantity).val(1);
          var toppings = modal.querySelectorAll(
            '.choise input[type="checkbox"]:checked'
          );
          toppings.forEach((topping) => {
            $(topping).prop("checked", false);
          });
        }
      });
    });

    // decreaseBtn.addEventListener("click", function () {
    //   const currentValue = parseInt(quantityInput.value);
    //   if (currentValue > 1) {
    //     quantityInput.value = currentValue - 1;
    //   }
    // });

    // cartItemPlus.addEventListener("click", function () {
    //   const currentValue = parseInt(quantityInput.value);
    //   quantityInput.value = currentValue + 1;
    // });
  }

  handleOrderFormModal();

  // ---------------- handle cart event -----------------

  function handleCart(orderProducts) {
    // edit each order item in the cart
    // get all order cart item
    // const orderProducts = document.querySelectorAll(".cart-item");
    // get the total price of cart
    const totalCart = document.querySelector(".cart .order-price");
    // get the total quantity of cart
    const totalCartQuantity = totalCart.querySelector(
      ".cart .order-price .total-quantity"
    );
    // get the total price of cart
    const totalCartPrice = totalCart.querySelector(
      ".cart .order-price .total-price"
    );
    // get delete all button
    const delAllBtn = document.querySelector(".cart .cart-title .del-all");

    $(delAllBtn).click(function (e) {
      orderProducts.forEach((item) => {
        item.remove();
        $(totalCartQuantity).text(0);
        $(totalCartPrice).text(0);
        $(".cart .order-item .no-item").css("display", "block");
      });
    });

    var totalQuantity = parseInt($(totalCartQuantity).text());
    var totalPrice = parseInt($(totalCartPrice).text()) * 1000;

    // loop all order cart item
    orderProducts.forEach((product) => {
      // get btn minus of order cart item
      const cartItemMinus = product.querySelector(
        ".cart-item .edit-quantity .minus"
      );
      // get btn plus of order cart item
      const cartItemPlus = product.querySelector(
        ".cart-item .edit-quantity .plus"
      );
      // get input quantity of order cart item
      const quantityInput = product.querySelector(
        ".cart-item .edit-quantity .quantity"
      );
      // get show quantity of order item
      const showQuantity = product.querySelector(
        ".cart-item .cart-item-price .show-quantity"
      );
      // get calculated price of order item
      const calcPrice = product.querySelector(
        ".cart-item .cart-item-price .calc-price"
      );
      // get sigle price of order item
      const itemPrice = product.querySelector(
        ".cart-item .cart-item-price .item-price"
      );
      // handle click minus btn event
      cartItemMinus.addEventListener("click", function () {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue != quantityInput.value) {
          $(showQuantity).text(quantityInput.value);
        }
        if (currentValue >= 1) {
          quantityInput.value = currentValue - 1;

          const calcValue =
            parseInt(quantityInput.value) *
            parseInt($(itemPrice).text()) *
            1000;
          const itemPriceValue = parseInt($(itemPrice).text()) * 1000;
          const calcPricevalue = calcValue.toLocaleString();
          $(calcPrice).text(calcPricevalue);
          totalQuantity = totalQuantity - 1;
          totalPrice = totalPrice - itemPriceValue;
          // set value for total of quantity cart and price cart
          $(totalCartQuantity).text(totalQuantity.toLocaleString());
          $(totalCartPrice).text(totalPrice.toLocaleString());
        } else if (currentValue < 1) {
          product.remove();
        }
      });
      // handle click plus btn event
      cartItemPlus.addEventListener("click", function () {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
        $(showQuantity).text(quantityInput.value);
        const calcValue =
          parseInt(quantityInput.value) * parseInt($(itemPrice).text()) * 1000;
        const itemPriceValue = parseInt($(itemPrice).text()) * 1000;
        const calcPricevalue = calcValue.toLocaleString();
        $(calcPrice).text(calcPricevalue);
        totalQuantity = totalQuantity + 1;
        totalPrice = totalPrice + itemPriceValue;
        // set value for total of quantity cart and price cart
        $(totalCartQuantity).text(totalQuantity.toLocaleString());
        $(totalCartPrice).text(totalPrice.toLocaleString());
      });
    });
  }
  // handleCart();

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
