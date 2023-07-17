const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddlewares");
exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id "),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category required")
    .isLength({ min: 3 })
    .withMessage("too short category name")
    .isLength({ max: 32 })
    .withMessage("too long category name"),
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