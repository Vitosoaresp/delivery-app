const express = require('express');

const app = express();

app.use(express.json);

const loginRoute = require('../routes/login.route');

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(loginRoute);

module.exports = app;
