const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddlewares");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id "),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validatorMiddleware,
];
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id "),
  validatorMiddleware,
];
exports.deletCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id "),
  validatorMiddleware,
];
