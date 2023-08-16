const Product = require('../models/product');
const slugify = require('slugify');
const shortid = require('shortid');

// create product 
exports.createProduct = (req, res) => {
    // return res.status(200).json({ file: req.file, body: req.body }); // for single file
    // return res.status(200).json({ file: req.files, body: req.body }); // for multiple files

    const { name, price, description, offer, quantity, category } = req.body;
    let productPictures = [];
    if( req.files.length > 0 ) {
        productPictures = req.files.map( file => {
            return {img: file.filename };
        })
    }

    const productObj = {
        name: name,
        slug: slugify(name),
        price: price, 
        description: description, 
        productPictures: productPictures, 
        offer: offer, 
        quantity: quantity, 
        category: category, 
        createdBy: req.user._id
    }
    
    const _product = new Product(productObj);
    
    _product.save()
    .then((data) => {
        if (data) {
            return res.status(201).json({ message: "Product created successfully", product: data });
        }

    })
    .catch((error) => {
        return res.status(400).json({ message: "Something went wrong", err: error });
    })
}