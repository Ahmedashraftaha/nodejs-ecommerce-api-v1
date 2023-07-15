const CategoryModel = require('../models/categoryModel');
const slugify = require('slugify')
exports.getCategories = (req, res) => {
//   const name = req.body.name;
//   console.log(req.body);

//   const newCategory = new CategoryModel({ name });
//   newCategory
//     .save()
//     .then((doc) => {
//       res.json(doc);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
res.send();
};

exports.creatCategory=(req,res)=>{
    const name = req.body.name;
    CategoryModel.create({name,slug:slugify(name)}).then(category=>res.status(200).json({data:category})).catch(err=>res.status(400).send(err))
}