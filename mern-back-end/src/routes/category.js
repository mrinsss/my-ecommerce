const express = require('express');
const { addCategory, getCategories } = require('../controllers/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');

// for image upoad we need below lines
const multer  = require('multer');
const shortid = require('shortid');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, '../../uploads/product')
        cb(null, path.join(path.dirname(__dirname), 'uploads/category'))
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, shortid.generate() + '-'  + Math.round(Math.random() * 1E9) + '-' + file.originalname)
    }
});
// const uploadPicMiddle = multer({ dest: 'uploads/product'});
const uploadPicMiddle = multer({ storage: multerStorage });

const router = express.Router();

router.post('/category/create', requireSignin, adminMiddleware, uploadPicMiddle.single('categoryImage'), addCategory);
router.get('/category/list', getCategories);

module.exports = router;