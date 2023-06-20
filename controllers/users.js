const User = require('../models/user');
// Запросить всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send((users));
    })
    .catch((err, users) => {
      if (users === null || users === undefined) {
        return res.status(404).send({ message: 'пользователи не найдены' });
      }
      return res.status(500).send({ message: 'на сервере произошла ошибка, пожалуйста попробуйте снова' })
    })
}

// Запросить конкретного пользователя
const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'пользователь с таким id не найден' });
      }
      return res.status(200).send({ data: user })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные в метод создания пользователя' });
      }
      return res.status(500).send({ message: 'на сервере произошла ошибка, пожалуйста попробуйте снова' })
    })
}


//Обновить данные пользователя
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные при методе обновления профиля' });
      }
      return res.status(500).send({ message: 'на сервере произошла ошибка, пожалуйста попробуйте снова' });
    })
}

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные при методе обновления аватара' });
      }
      return res.status(500).send({ message: 'на сервере произошла ошибка, пожалуйста попробуйте снова' });
    })
}

// Создание нового юзера

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы неккорректные данные в метод создания пользователя' })
      }
      return res.status(500).send({ message: "на севрере произошла ошибка, пожалуйста попробуйте снова" })
    })
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar
}