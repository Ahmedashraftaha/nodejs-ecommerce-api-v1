const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddlewares");

exports.getSubCategoryValidator = [
  check("id").notEmpty().isMongoId().withMessage("Invalid SubCategory id "),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid Category id format"),
  validatorMiddleware,
];
exports.updateSubCategoryValidator = [
  check("id").notEmpty().isMongoId().withMessage("Invalid id for Subcategory "),
  validatorMiddleware,
];
exports.deletSubCategoryValidator = [
  check("id")
    .notEmpty()
    .isMongoId()
    .withMessage("Invalid id  for Subcategory "),
  validatorMiddleware,
];
