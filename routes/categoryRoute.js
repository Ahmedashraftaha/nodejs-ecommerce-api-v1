const express = require("express");
const { param, validationResult } = require("express-validator");
const {getCategoryValidator,createCategoryValidator,updateCategoryValidator,deletCategoryValidator} = require("../utils/validators/categoryValidator");
const {
  getCategories,
  creatCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryServices");

const router = express.Router();

router.route("/").get(getCategories).post(createCategoryValidator,creatCategory);
router
  .route("/:id")
  .get(
    getCategoryValidator,
    getCategory
  )
  .put(updateCategoryValidator,updateCategory)
  .delete(deletCategoryValidator,deleteCategory);

module.exports = router;
