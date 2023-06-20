const User = require('../models/user');
const {
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  DEFAULT_ERROR,
  STATUS_OK,
} = require('../utills/errorConstants');
// Запросить всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_OK).send((users));
    })
    .catch(next);
};

// Запросить конкретного пользователя
const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'пользователь с таким id не найден' });
      }
      return res.status(STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'переданы некорректные данные в метод создания пользователя' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'на сервере произошла ошибка, пожалуйста попробуйте снова' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'переданы некорректные данные при методе обновления профиля' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'на сервере произошла ошибка, пожалуйста попробуйте снова' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'переданы некорректные данные при методе обновления аватара' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'на сервере произошла ошибка, пожалуйста попробуйте снова' });
    });
};

// Создание нового юзера

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'переданы неккорректные данные в метод создания пользователя' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'на севрере произошла ошибка, пожалуйста попробуйте снова' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
