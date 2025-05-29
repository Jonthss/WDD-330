import { getParam, loadHeaderFooter, updateCartNum } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices();
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

//ga--The number of items in the cart (header)
updateCartNum();

// ga--To call the header and footer partials
loadHeaderFooter();
