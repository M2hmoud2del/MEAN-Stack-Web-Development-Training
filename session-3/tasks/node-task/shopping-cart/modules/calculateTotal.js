const cart = require("../data/cart");

function calculateTotal() {

    let total = 0;

    for (const product of cart) {
        total += product.price;
    }

    console.log(`\nTotal Price = ${total}`);
}

module.exports = calculateTotal;
