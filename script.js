let itemBox = document.querySelectorAll(".item_box"); // блок каждого товара
let cartCont = document.getElementById("cart_content"); // блок вывода данных корзины

// Записываем данные в LocalStorage
function setCartData(o) {
  localStorage.setItem("cart", JSON.stringify(o));
}
// Получаем данные из LocalStorage
function getCartData() {
  return JSON.parse(localStorage.getItem("cart"));
}

// Добавляем товар в корзину
function addToCart(e) {
  let button = e.target;
  button.disabled = true; // блокируем кнопку на время операции с корзиной
  let cartData = getCartData() || {}; // получаем данные корзины или создаём новый объект, если данных еще нет
  let parentBox = button.parentNode; // родительский элемент кнопки "Добавить в корзину";
  let itemId = button.getAttribute("data-id"); // ID товара
  let itemTitle = parentBox.querySelector(".item_title").innerHTML; // название товара
  let itemPrice = parentBox.querySelector(".item_price").innerHTML; // стоимость товара
  console.log(cartData);
  if (cartData.hasOwnProperty(itemId)) {
    // если такой товар уже в корзине, то добавляем +1 к его количеству
    cartData[itemId][2] += 1;
  } else {
    // если товара в корзине еще нет, то добавляем в объект
    cartData[itemId] = [itemTitle, itemPrice, 1];
  }
  // Обновляем данные в LocalStorage
  setCartData(cartData);
  button.disabled = false; // разблокируем кнопку после обновления
  cartCont.innerHTML = "Товар добавлен в корзину.";
  setTimeout(function () {
    cartCont.innerHTML = "Продолжить покупки...";
  }, 1000);
}

// Обработчик события на каждую кнопку "Добавить в корзину"
for (let i = 0; i < itemBox.length; i++) {
  itemBox[i].querySelector(".add_item").addEventListener("click", addToCart);
}
