const express = require('express');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const notFoundRoute = require('./utills/notFoundRoute');
const { createUser, login } = require('./controllers/users');
const { createUserValidation, loginUserValidation } = require('./middlewares/validation');

const auth = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.post('/signin', loginUserValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);
app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use('*', (req, res) => {
  notFoundRoute(req, res);
});

app.listen(PORT, () => { });
