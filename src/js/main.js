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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  const message = document.getElementById("newsletter-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = form.email.value.trim();

    if (emailInput) {
      // Sucesso: exibe a mensagem de confirmação
      message.textContent = `Thanks for subscribing, ${emailInput}!`;
      message.style.color = "green";
      message.style.display = "block";
      form.reset();
    } else {
      // Erro: esconde a mensagem
      message.style.display = "none";
    }
  });
});


