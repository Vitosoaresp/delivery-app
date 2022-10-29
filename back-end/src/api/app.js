const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const userRoute = require('../routes/user.route');

app.get('/', (_req, res) => res.status(200).send('Hello World'));
app.get('/coffee', (_req, res) => res.status(418).end());

app.use(userRoute);

module.exports = app;
