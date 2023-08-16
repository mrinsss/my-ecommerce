const Cart = require('../models/cart');

// add item to cart  
exports.addItemToCart = (req, res) => {
    const cartObj = {
        user: req.user._id,
        cartItems: req.body.cartItems
    }
    
    const _cart = new Cart(cartObj);
    
    _cart.save()
    .then((data) => {
        if (data) {
            return res.status(201).json({ message: "Cart items added successfully", cart: data });
        }

    })
    .catch((error) => {
        return res.status(400).json({ message: "Something went wrong", err: error });
    })

    // return res.json({ message: 'Hello Cart' }); 
}