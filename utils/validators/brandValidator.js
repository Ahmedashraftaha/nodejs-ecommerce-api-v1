const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddlewares");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid id "),
  validatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name"),
  validatorMiddleware,
];
exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid id "),
  validatorMiddleware,
];

exports.deletBrandValidator = [
  check("id").isMongoId().withMessage("Invalid id "),
  validatorMiddleware,
];
