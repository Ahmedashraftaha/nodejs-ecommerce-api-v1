const express = require('express');

const { getCategories,creatCategory} = require('../services/categoryServices');

const router = express.Router();

router.route('/').get(getCategories).post(creatCategory)




module.exports = router;