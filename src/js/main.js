import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartNum, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

productList.init();

//The number of items in the cart (header)
updateCartNum();

// To call the header and footer partials
loadHeaderFooter();

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('register-modal');
  const closeBtn = document.querySelector('.close-btn');

  const hasSeenModal = localStorage.getItem('hasSeenRegisterModal');

  if (!hasSeenModal) {
    modal.style.display = 'block';
    localStorage.setItem('hasSeenRegisterModal', 'true');
  }

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});