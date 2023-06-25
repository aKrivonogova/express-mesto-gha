const express = require('express');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const { createUser, login } = require('./controllers/users');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');
const { createUserValidation, loginUserValidation } = require('./middlewares/validation');

const auth = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');
app.use(errors());

app.post('/signin', loginUserValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);
app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(defaultErrorHandler);
app.listen(PORT, () => { });
