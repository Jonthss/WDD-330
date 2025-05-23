import { getParam, loadHeaderFooter, updateCartNum } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

//ga--The number of items in the cart (header)
updateCartNum();

// ga--To call the header and footer partials
loadHeaderFooter();
