const Card = require('../models/card');
const {
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  DEFAULT_ERROR,
  STATUS_OK,
} = require('../utills/errorConstants');

// получить карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(STATUS_OK).send(cards);
    })
    .catch(next);
};

// создать карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => {
      res.status(STATUS_OK).send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'переданы неккорректные данные в метод создания карточки' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'на севрере произошла ошибка, пожалуйста попробуйте снова' });
    });
};
// удалить карточку по id
const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card === null || card === undefined) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'карточка с данным id не найдена' });
      }
      return res.status(STATUS_OK).send({ message: 'данные карточки удалены' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'переданы некорректные данные при удалении карточки.' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'на севрере произошла ошибка, пожалуйста попробуйте снова' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null || card === undefined) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'карточка с данным id не найдена' });
      }
      return res.status(STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'переданы некорректные данные при удалении карточки.' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'на севрере произошла ошибка, пожалуйста попробуйте снова' });
    });
};
// удалить лайк с карточки
const deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null || card === undefined) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'карточка с данным id не найдена' });
      }
      return res.status(STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'переданы некорректные данные при удалении карточки.' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'на севрере произошла ошибка, пожалуйста попробуйте снова' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  deleteCardLike,
};
