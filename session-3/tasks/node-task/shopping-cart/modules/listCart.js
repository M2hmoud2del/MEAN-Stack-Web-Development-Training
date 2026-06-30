const cart = require("../data/cart");

function listCart() {

    console.log("\n===== Cart Items =====");

    if (cart.length === 0) {
        console.log("Cart is empty.");
        return;
    }

    cart.forEach(product => {
        console.log(
            `ID: ${product.id}
Name: ${product.name}
Price: ${product.price}
----------------------`
        );
    });
}

module.exports = listCart;
