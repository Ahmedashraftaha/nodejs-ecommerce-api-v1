const express = require('express');

const { getCategories,creatCategory,getCategory,updateCategory,deleteCategory} = require('../services/categoryServices');

const router = express.Router();

router.route('/').get(getCategories).post(creatCategory);
router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory);


module.exports = router;