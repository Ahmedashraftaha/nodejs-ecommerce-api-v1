const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const productModel = require("../models/productModel");

exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await productModel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });
  res.status(200).json({ result: products.length, page, data: products });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel
    .findById(id)
    .populate({ path: "category", select: "name" });

  if (!product) {
    return next(new ApiError(`No product found for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

exports.creatProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(200).json({ data: product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    return next(new ApiError(`No product found for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);

  if (!product) {
    return next(new ApiError(`No product found for this id ${id}`, 404));
  }
  res.status(204).send();
});
