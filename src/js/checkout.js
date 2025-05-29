import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();

  const order = new CheckoutProcess("so-cart", "#order-summary");
  order.init();

  const zipInput = document.querySelector("#zip");
  if (zipInput) {
    zipInput.addEventListener("blur", () => {
      order.calculateOrderTotal();
    });
  }

  const form = document.querySelector("#checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      order.calculateOrderTotal();  
      order.checkout();           
    });
  }
});