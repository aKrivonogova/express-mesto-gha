const router = require('express').Router();
const { getCards, createCard , deleteCardById, likeCard, deleteCardLike} = require('../controllers/cards');
router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCardById);
router.put('/cards/:id/likes', likeCard);
router.delete('/cards/:id/likes', deleteCardLike)

module.exports = router;