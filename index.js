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

const addProduct = (cart, productId, name, price, quantity) => {cart.push({productId,name,price,quantity}); return cart;}

const updateQuantity = (cart, productId, quantity) => cart.map(item => ({
  ...item,
  quantity : item.productId === productId ? quantity : item.quantity
}))

const deleteById = (cart, productId) => cart.filter(item => item.productId !== productId)

const getAllItems = cart => cart;

const getTotalQuantity = cart => cart.length;

const getTotalPrice = cart => cart.reduce((total, item) => total + item.price, 0);

app.get('/cart/add', (req, res) => {
  const {productId, name, price, quantity} = req.query;
  res.json({cartItems : addProduct(cart, productId, name, price, quantity)});
});

app.get('/cart/edit', (req, res) => {
  const {productId, quantity} = req.query;
  res.json({cartItems : updateQuantity(cart, +productId, +quantity)});
});

app.get('/cart/delete', (req, res) => {
  const {productId} = req.query;
  res.json({cartItems : deleteById(cart, +productId)});
});

app.get('/cart', (req, res) => {
  res.json({cartItems : getAllItems(cart)});
});

app.get('/cart/total-quantity', (req, res) => {
  res.json({totalQuantity : getTotalQuantity(cart)});
});

app.get('/cart/total-price', (req, res) => {
  res.json({totalPrice : getTotalPrice(cart)});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});