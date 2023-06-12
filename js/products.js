$(document).ready(function () {
  // --------------- handle order form modal event --------------
  function handleOrderFormModal() {
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

        const decreaseBtn = document.querySelector(".order-quantity .minus");
        const increaseBtn = document.querySelector(".order-quantity .plus");
        const quantityInput = document.querySelector(
          ".order-quantity .quantity"
        );

        var newPriceNum = newPrice.split("đ", 1);
        newPriceNum = parseInt(newPriceNum) * 1000;
        var orderPrice = newPriceNum;

        decreaseBtn.addEventListener("click", function () {
          const currentValue = parseInt(quantityInput.value);
          if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            orderPrice = orderPrice - newPriceNum;
            $(".order .order-price").text(orderPrice.toLocaleString());
          }
        });

        increaseBtn.addEventListener("click", function () {
          const currentValue = parseInt(quantityInput.value);
          quantityInput.value = currentValue + 1;
          orderPrice = orderPrice + newPriceNum;
          $(".order .order-price").text(orderPrice.toLocaleString());
        });

        $(".order-modal .order").click(function (e) {
          e.preventDefault();

          var orderItem = `<div class="cart-item col col-md-12">
                    <h6 class="cart-item-name">${productName}<span>(L)</span></h6>
                    <p class="cart-item-note">
                      Thêm trân châu Baby, 50% đường, 50% đá
                    </p>
                    <div class="cart-item-price">
                      <span class="item-price">${newPriceNum.toLocaleString()}</span>
                      <span>đ</span>
                      <span>x</span>
                      <span class="show-quantity">${quantityInput.value}</span>
                      <span>=</span>
                      <span class="calc-price">${(
                        quantityInput.value * newPriceNum
                      ).toLocaleString()}</span>
                      <span>đ</span>
                    </div>
                    <div class="edit-quantity">
                      <span class="minus">-</span>
                      <input class="quantity" readonly value="${
                        quantityInput.value
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
          const quantitys = document.querySelectorAll(
            ".cart-item .edit-quantity .quantity"
          );
          // get total price value of all order item
          const prices = document.querySelectorAll(
            ".cart-item .cart-item-price .calc-price"
          );

          // loop all quantity of order item to get all quantity value
          quantitys.forEach((quantity) => {
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
          handleCart();
        });
      });

      // Get the <span> element that closes the modal
      var closeBtn = $(".order-modal .modal-content #cls");
      $(closeBtn).click(function (e) {
        $(modal).css("display", "none");
        $(quantityInput).val(1);
      });
      // When the user clicks anywhere outside of the modal, close it
      $(window).click(function (e) {
        if (e.target == modal) {
          $(modal).css("display", "none");
          $(quantityInput).val(1);
        }
      });
    });

    // decreaseBtn.addEventListener("click", function () {
    //   const currentValue = parseInt(quantityInput.value);
    //   if (currentValue > 1) {
    //     quantityInput.value = currentValue - 1;
    //   }
    // });

    // increaseBtn.addEventListener("click", function () {
    //   const currentValue = parseInt(quantityInput.value);
    //   quantityInput.value = currentValue + 1;
    // });
  }

  handleOrderFormModal();

  // ---------------- handle cart event -----------------

  function handleCart() {
    // edit each order item in the cart
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

    var totalQuantity = parseInt($(totalCartQuantity).text());
    var totalPrice = parseInt($(totalCartPrice).text()) * 1000;
    // // get total quantity value of all order item
    // const quantitys = document.querySelectorAll(
    //   ".cart-item .edit-quantity .quantity"
    // );
    // // get total price value of all order item
    // const prices = document.querySelectorAll(
    //   ".cart-item .cart-item-price .calc-price"
    // );
    // const isEmpty = (orderProducts) =>
    //   Array.isArray(orderProducts) && !orderProducts.length;
    // if (!isEmpty) {
    //   $(".cart .order-item .no-item").classAdd("no-item-cart");
    //   jqass;

    //   // loop all quantity of order item to get all quantity value
    //   quantitys.forEach((quantity) => {
    //     const quantityValue = parseInt($(quantity).text());
    //     totalQuantity = totalQuantity + quantityValue;
    //   });
    //   // loop all price of order item to get all price value
    //   prices.forEach((price) => {
    //     const priceValue = parseInt($(price).text());
    //     totalPrice = totalPrice + priceValue;
    //   });

    //   // set value for total of quantity cart and price cart
    //   $(totalCartQuantity).text(totalQuantity.toLocaleString());
    //   $(totalCartPrice).text(totalPrice.toLocaleString());
    // }
    // loop all order cart item
    orderProducts.forEach((product) => {
      // get btn minus of order cart item
      const decreaseBtn = product.querySelector(
        ".cart-item .edit-quantity .minus"
      );
      // get btn plus of order cart item
      const increaseBtn = product.querySelector(
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
      // get caculation price of order item
      const calcPrice = product.querySelector(
        ".cart-item .cart-item-price .calc-price"
      );
      // get sigle price of order item
      const itemPrice = product.querySelector(
        ".cart-item .cart-item-price .item-price"
      );
      // handle click minus btn event
      decreaseBtn.addEventListener("click", function () {
        const currentValue = parseInt(quantityInput.value);
        // if (currentValue != quantityInput.value) {
        //   $(showQuantity).text(quantityInput.value);
        // }
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
      increaseBtn.addEventListener("click", function () {
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
});
