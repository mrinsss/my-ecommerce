const Cart = require('../models/cart');

// add item to cart  
exports.addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
    .then( (cartExist) => { 
        
        if( cartExist ) {
            // if cart already exist then update cart
            const productId = req.body.cartItems.product;
            // need to find if the same item already added then update quantity
            const findItem = cartExist.cartItems.find( c => c.product == productId );
            let condn, updtPro;
            if( findItem ) {
                condn   = { "user": req.user._id, "cartItems.product": productId };
                updtPro = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems, 
                            quantity: parseInt(findItem.quantity) + parseInt(req.body.cartItems.quantity)
                        }
                    }
                };

                // now find with user as well as product                
                // Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": productId }, {
                //     "$set": {
                //         // "cartItems": { // this will updt the whole cart
                //         "cartItems.$": { // this will updt the only the same product
                //             ...req.body.cartItems, // spread the items 
                //             quantity: parseInt(findItem.quantity) + parseInt(req.body.cartItems.quantity)
                //         }
                //     }
                // })            
                // .then( (updatedCart) => { 
                //     return res.status(201).json({ message: "Cart items added successfully", cart: updatedCart });
                // })
                // .catch((ex) => {
                //     return res.status(400).json({ message: "Something went wrong", err: ex });
                // })

            }
            else 
            {
                condn   = { "user": req.user._id };
                updtPro = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                };

                // below comented to reuse same code using function as above block
                // Cart.findOneAndUpdate({ user: req.user._id }, {
                //     "$push": {
                //         "cartItems": req.body.cartItems
                //     }
                // })            
                // .then( (updatedCart) => { 
                //     return res.status(201).json({ message: "Cart items added successfully", cart: updatedCart });
                // })
                // .catch((ex) => {
                //     return res.status(400).json({ message: "Something went wrong", err: ex });
                // })
            }
            
            // bring into one call instead of above two blocks
            Cart.findOneAndUpdate( condn, updtPro )            
            .then( (updatedCart) => { 
                return res.status(201).json({ message: "Cart items added successfully", cart: updatedCart });
            })
            .catch((ex) => {
                return res.status(400).json({ message: "Something went wrong", err: ex });
            })

            // return res.status(201).json({ message: "Cart items added successfully", cart: cartExist });
        }
        else 
        {
            const cartObj = {
                user: req.user._id,
                cartItems: [req.body.cartItems]
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
        }
        
    })
    .catch((error) => {
        return res.status(400).json({ message: "Something went wrong", err: error });
    })

    /*
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
    })*/

    // return res.json({ message: 'Hello Cart' }); 
}