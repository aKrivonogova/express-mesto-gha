const express = require('express');
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '648f944d68db3be7600a1f7f'
  };
  next();
});

app.use('/', usersRoutes);
app.use('/', cardsRoutes);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})