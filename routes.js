const express = require('express');
const BurgerController = require('./Controllers/BurgerController');

const router = express.Router();

router.get('/', BurgerController.index);
router.post('/', BurgerController.store);
router.post('/:id', BurgerController.update);

module.exports = router;