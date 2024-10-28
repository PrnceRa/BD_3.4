const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

const addProduct = (cart, productId, name, price, quantity) => { const product = cart.find(item => item.productId === productId); !product ? cart.push({ productId, name, price, quantity }) : product.quantity += quantity; return cart; }

const updateQuantity = (cart, productId, quantity) => {
  cart.forEach(item => {
    if (item.productId === productId) {
      item.quantity = quantity;
    }
  })
  return cart;
}

const deleteById = (cart, productId) => { const index = cart.findIndex(item => item.productId === productId); index != -1 && cart.splice(index, 1); return cart; }

const getAllItems = cart => cart;

const getTotalQuantity = cart => cart.reduce((total, item) => total + item.quantity, 0);

const getTotalPrice = cart => cart.reduce((total, item) => total + item.price * item.quantity, 0);

app.get('/cart/add', (req, res) => {
  const { productId, name, price, quantity } = req.query;
  res.json({ cartItems: addProduct(cart, productId, name, price, quantity) });
});

app.get('/cart/edit', (req, res) => {
  const { productId, quantity } = req.query;
  res.json({ cartItems: updateQuantity(cart, +productId, +quantity) });
});

app.get('/cart/delete', (req, res) => {
  const { productId } = req.query;
  res.json({ cartItems: deleteById(cart, +productId) });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: getAllItems(cart) });
});

app.get('/cart/total-quantity', (req, res) => {
  res.json({ totalQuantity: getTotalQuantity(cart) });
});

app.get('/cart/total-price', (req, res) => {
  res.json({ totalPrice: getTotalPrice(cart) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
