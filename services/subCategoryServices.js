const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const subCategoryModel = require("../models/subCategoryModel");

exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
exports.createSubCategory = asyncHandler(async (req, res) => {
  if (!req.body.category) req.body.category = req.params.categoryId;

  const { name, category } = req.body;

  const subCategory = await subCategoryModel.create({
    name,
    category,
    slug: slugify(name),
  });

  res.status(201).json({
    success: true,
    data: subCategory,
  });
});

exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }
  const subCategories = await subCategoryModel

    .find(filterObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });

  res.status(200).json({
    results: subCategories.length,
    page: page,
    success: true,
    data: subCategories,
  });
});

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await subCategoryModel.findById(id);
  if (!subCategory) {
    return next(new ApiError(`No SubCategory find for this ${id} `, 404));
  }
  res.status(200).json({
    success: true,
    data: subCategory,
  });
});

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subCategory) {
    return next(new ApiError(`No subCategory found for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findByIdAndDelete(id);

  if (!subCategory) {
    return next(new ApiError(`No subCategory found for this id ${id}`, 404));
  }
  res.status(204).send();
});
