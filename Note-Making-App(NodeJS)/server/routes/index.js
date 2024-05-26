const express = require('express');
const { homepage, about } = require('../controllers/main');
const router = express.Router();

router.route('/').get(homepage);
router.route('/about').get(about);


module.exports = router;