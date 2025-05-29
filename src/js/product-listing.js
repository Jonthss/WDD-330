import { updateCartNum, loadHeaderFooter, getParam } from "../js/utils.mjs";
import ExternalServices from "../js/ExternalServices.mjs";
import ProductList from "../js/ProductList.mjs";

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

// ga--The number of items in the cart (header)
updateCartNum();

// ga--To call the header and footer partials
loadHeaderFooter();