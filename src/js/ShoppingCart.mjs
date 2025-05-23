import { getLocalStorage, setLocalStorage, updateCartNum } from "./utils.mjs";

export function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  attachQtyListeners(cartItems);
  updateCartTotal(cartItems);
}


function cartItemTemplate(item, index) {
  const quantity = item.quantity || 1;
  const itemTotal = item.FinalPrice * quantity;

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>

    <div class="qty-wrapper">
      <label for="qty-${index}">Qty:</label>
      <input type="number" id="qty-${index}" class="qty-input" data-index="${index}" min="1" value="${quantity}">
    </div>

    <p class="cart-card__price">$${itemTotal.toFixed(2)}</p>
    <button class="remove" aria-label="Delete product" data-id="${item.Id}">×</button>
  </li>`;
}


// ga--function to display the result and show a message when the cart is empty
// this code was in the cart.js, but it is better if it goes here and is imported there
// I haven't deleted the code in the other file because that was not my card to do, but it
// is a suggestion that I make (delete that other code and export and import this function)
function totalOrEmpty(){
  const cart = getLocalStorage("so-cart") || [];
  if (cart.length > 0) {
    document.querySelector('.cart-footer').classList.remove('hide');
    renderCartContents();

      // Calculate and display the total cart value
    const total = cart.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
  } else {

      // If the cart is empty, show message
    const emptyMessage = document.querySelector("#empty-message");
    if (emptyMessage) {
      emptyMessage.classList.remove("hide");
      document.querySelector('.cart-total').textContent = `Total: $0`;
    }
  }
}


// ga--Function to eliminate products from the cart
export function deleteProduct(){
  const productsList = document.querySelector(".product-list");
  if (!productsList)
    return;

  productsList.addEventListener("click", function(e){
    if(e.target.classList.contains("remove")){
      const product = e.target.closest("li");
      const productName = product.querySelector(".card__name").textContent;

      let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
      cart = cart.filter((item) => item.Name !== productName);
      localStorage.setItem("so-cart", JSON.stringify(cart));
        renderCartContents();
        updateCartNum();
        totalOrEmpty();
      }
    });
}

function attachQtyListeners(cartItems) {
  document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const index = parseInt(e.target.dataset.index);
      const newQty = parseInt(e.target.value);

      if (newQty >= 1) {
        cartItems[index].quantity = newQty;
        setLocalStorage("so-cart", cartItems);
        renderCartContents(); // Atualiza tudo com o novo valor
      }
    });
  });
}

function updateCartTotal(cartItems) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1), 0
  );
  document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
}