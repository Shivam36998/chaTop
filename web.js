const express = require('express');
const homeController = require('./controller.js');
const router = express.Router();

router.get('/', homeController);

module.exports = router;