const CategoryModel = require('../models/categoryModel');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
exports.getCategories = asyncHandler(async(req, res) => {
    const page=req.query.page  * 1 || 1;
    const limit =req.query.limit  * 1 || 5;
    const skip=(page-1)*limit;
 const categories= await  CategoryModel.find({}).skip(skip).limit(limit);
 res.status(200).json({result:categories.length ,page, data :categories})

});

exports.getCategory= asyncHandler(async(req,res)=>{
    const {id}= req.params;
    const category= await CategoryModel.findById(id);
    
    if(!category){
        res.status(404).json({msg : "No Category found"});
    }else
{
    res.status(200).json({data : category});
}
})

exports.creatCategory=asyncHandler(async(req,res)=>{
    const name = req.body.name;
    const category= await CategoryModel.create({name,slug:slugify(name)})
    res.status(200).json({data:category})
})

exports.updateCategory = asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const name =req.body.name;

    const category = await CategoryModel.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
      );

    if(!category){
        res.status(404).json({msg : "No Category found"});
    }else
{
    res.status(200).json({data : category});
}
})
exports.deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
  
    if (!category) {
      res.status(404).json({ msg: `No category for this id ${id}` });
    }
    res.status(204).send();
  });