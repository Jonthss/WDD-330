import { getLocalStorage, loadHeaderFooter, updateCartNum } from "./utils.mjs";
import { renderCartContents, deleteProduct } from "./ShoppingCart.mjs";

//ga--The number of items in the cart (header)
updateCartNum();

// ga--To call the header and footer partials
loadHeaderFooter();

//   gr--Empty Card Error
// Retrieve cart data from localStorage (or set empty array if not found)
const cart = getLocalStorage("so-cart") || [];

if (cart.length > 0) {
  document.querySelector(".cart-footer").classList.remove("hide");
  renderCartContents();

  // Calculate and display the total cart value
  const total = cart.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.querySelector(".cart-total").textContent =
    `Total: $${total.toFixed(2)}`;
} else {
  // If the cart is empty, show message
  const emptyMessage = document.querySelector("#empty-message");
  if (emptyMessage) {
    emptyMessage.classList.remove("hide");
  }
}

// SHOWS THE CONTENT OF THE CART
renderCartContents();

// ga--deletes product of the cart
deleteProduct();

// function renderCartContents() {
//   const htmlItems = cart.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item) {
//   return `
//     <li class="cart-card divider">
//       <a href="#" class="cart-card__image">
//         <img src="${item.Images?.PrimarySmall || 'images/fallback.jpg'}" alt="${item.Name}" />
//       </a>
//       <a href="#">
//         <h2 class="card__name">${item.Name}</h2>
//       </a>
//       <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//       <p class="cart-card__quantity">qty: 1</p>
//       <p class="cart-card__price">$${item.FinalPrice}</p>
//     </li>
//   `;
// }
