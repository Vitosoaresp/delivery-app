const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const userRoute = require('../routes/user.route');
const productRoute = require('../routes/product.route');

app.get('/', (_req, res) => res.status(200).send('Hello World'));
app.get('/coffee', (_req, res) => res.status(418).end());

app.use(userRoute);
app.use(productRoute);

module.exports = app;
