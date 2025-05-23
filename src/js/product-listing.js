//console.log("baseURL is", import.meta.env.VITE_SERVER_URL);

import { updateCartNum, loadHeaderFooter, getParam } from "../js/utils.mjs";
import ProductData from "../js/ProductData.mjs";
import ProductList from "../js/ProductList.mjs";

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

//ga--The number of items in the cart (header)
updateCartNum();

// ga--To call the header and footer partials
loadHeaderFooter();
