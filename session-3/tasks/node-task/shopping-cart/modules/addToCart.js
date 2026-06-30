const products = require("../data/products");
const cart = require("../data/cart");

function addToCart(id) {
    const product = products.find(product => product.id === id);

    if (!product) {
        console.log("Product not found.");
        return;
    }

    cart.push(product);

    console.log(`${product.name} added to cart.`);
}

module.exports = addToCart;
