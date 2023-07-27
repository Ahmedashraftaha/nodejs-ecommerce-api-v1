const express = require("express");

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");
const {
  getProducts,
  creatProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productServices");

const router = express.Router();

router.route("/").get(getProducts).post(createProductValidator, creatProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
