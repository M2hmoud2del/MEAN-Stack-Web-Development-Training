const addToCart = require("./modules/addToCart");
const removeFromCart = require("./modules/removeFromCart");
const listCart = require("./modules/listCart");
const calculateTotal = require("./modules/calculateTotal");

// Add Products
addToCart(1);
addToCart(3);
addToCart(5);

// Show Cart
listCart();

// Total
calculateTotal();

// Remove Product
removeFromCart(3);

// Show Cart Again
listCart();

// Total Again
calculateTotal();
