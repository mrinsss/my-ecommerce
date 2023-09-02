const Category = require('../models/category');
const slugify = require('slugify');
const env = require('dotenv');

function genRecursiveCategory(paramCategories, parentId = null) {
    const categoryList = [];
    let prepCategory;
    if( parentId == null ) {
        prepCategory = paramCategories.filter( cat => cat.parentId == undefined );
    } else {
        prepCategory = paramCategories.filter( cat => cat.parentId == parentId );
    }

    // now loop through
    for(let catItem of prepCategory ) {
        categoryList.push({
            _id: catItem._id,
            name: catItem.name,
            slug: catItem.slug,
            children: genRecursiveCategory(paramCategories, catItem._id)
        });
    }

    return categoryList;
}

// add 
exports.addCategory = (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if( req.file ) {
        categoryObj.categoryImage = process.env.API_URL+'/public/category/' + req.file.filename;;
    }
    // if parent id exist
    if( req.body.parentId ) {
        categoryObj.parentId = req.body.parentId;
    }
    const _cat = new Category(categoryObj);

    _cat.save()
    .then((data) => {
        if (data) {
            return res.status(201).json({ message: "Category created successfully", category: data });
        }

    })
    .catch((error) => {
        return res.status(400).json({ message: "Something went wrong", err: error });
    })
}

// get categories
exports.getCategories = (req, res) => {
    Category.find({})
    .then((data) => {
        if (data) {
            const categoryList = genRecursiveCategory(data); // function to prepare catgory lists
            return res.status(201).json({ message: "Category fetch successfully", categories: categoryList });
        }
    })
    .catch((error) => {
        return res.status(400).json({ message: "Something went wrong", err: error });
    })

}