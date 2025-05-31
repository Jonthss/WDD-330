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
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const isValid = form.checkValidity(); 
      form.reportValidity(); 

      if (!isValid) return; // Interrompe se inválido

      order.calculateOrderTotal();

      try {
        await order.checkout(); // espera o checkout terminar

        // Redireciona só após o checkout ter sucesso
        window.location.href = "/checkout/success.html";
      } catch (error) {
        alert("Erro ao processar o pedido. Por favor, tente novamente.");
        console.error(error);
      }
    });
  }
});
