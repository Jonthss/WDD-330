export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(productList) {
    this.listElement.innerHTML = ''; // limpa antes de adicionar

    productList.forEach((product) => {
      const card = document.createElement('li');
      card.classList.add('product-card');
      card.innerHTML = `
        <h2>${product.Name}</h2>
        <img src="${product.Image}" alt="${product.Name}">
        <p>${product.Description}</p>
        <p><strong>Price:</strong> $${product.FinalPrice}</p>
        <a href="product-details.html?product=${product.Id}">View Details</a>
      `;
      this.listElement.appendChild(card);
    });
  }
}