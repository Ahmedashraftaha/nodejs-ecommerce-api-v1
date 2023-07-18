const express = require("express");

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deletCategoryValidator,
} = require("../utils/validators/categoryValidator");
const {
  getCategories,
  creatCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryServices");

const subcategoriesRoute = require("./subCategoryRoute");

const router = express.Router();

router.use("/:categoryId/subcategories", subcategoriesRoute);
router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, creatCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deletCategoryValidator, deleteCategory);

module.exports = router;
