const mongoose = require('mongoose');
const User = require('../models/user');
const Category = require('../models/category');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    productPictures: [
        { img: { type: String} }
    ],
    reviews: [
        { 
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            review: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date

}, {timestamps: true} );

module.exports = mongoose.model('Product', productSchema);