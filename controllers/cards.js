const Card = require('../models/card');

// получить карточки
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards)
    })
    .catch((err, cards) => {
      if (!cards) {
        return res.status(404).send({ message: 'карточки не найдены' })
      }
      return res.status(500).send({ message: "на севрере произошла ошибка, пожалуйста попробуйте снова" })
    })
}

// создать карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => {
      res.status(200).send(cards)
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы неккорректные данные в метод создания карточки' })
      }
      return res.status(500).send({ message: "на севрере произошла ошибка, пожалуйста попробуйте снова" })
    })
}
// удалить карточку по id
const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card === null || card === undefined) {
        return res.status(404).send({ message: 'карточка с данным id не найдена' })
      }
      return res.status(200).send({ message: 'данные карточки удалены' })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные при удалении карточки.' });
      }
      return res.status(500).send({ message: 'на севрере произошла ошибка, пожалуйста попробуйте снова' });
    })
}

//поставить карточке лайк
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null || card === undefined) {
        return res.status(404).send({ message: 'карточка с данным id не найдена' })
      }
      return res.status(200).send(card)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные при удалении карточки.' });
      }
      return res.status(500).send({ message: 'на севрере произошла ошибка, пожалуйста попробуйте снова' });
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
        return res.status(404).send({ message: 'карточка с данным id не найдена' })
      }
      return res.status(200).send(card)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные при удалении карточки.' });
      }
      return res.status(500).send({ message: 'на севрере произошла ошибка, пожалуйста попробуйте снова' });
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  deleteCardLike
}