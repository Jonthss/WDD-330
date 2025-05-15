import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const category = 'tents';
const dataSource = new ProductData(category);

// Pega o elemento HTML onde a lista será renderizada
const listElement = document.querySelector('#product-list');

// Cria a instância da lista e inicializa
const tentList = new ProductList(category, dataSource, listElement);
tentList.init();