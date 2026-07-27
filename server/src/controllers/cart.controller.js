const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET /api/cart
exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      'items.product',
      'name price imageUrl stock category'
    );

    if (!cart) {
      return res.json({
        cart: { items: [], totalPrice: 0, totalItems: 0 },
      });
    }

    // Compute totals
    const totalPrice = cart.items.reduce((sum, item) => {
      if (item.product) {
        return sum + item.product.price * item.quantity;
      }
      return sum;
    }, 0);

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      cart: {
        items: cart.items,
        totalPrice: Math.round(totalPrice * 100) / 100,
        totalItems,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/cart
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate product exists and has stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Increment quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} items available. You already have ${cart.items[existingItemIndex].quantity} in your cart.`,
        });
      }

      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    // Populate and return
    await cart.populate('items.product', 'name price imageUrl stock category');

    const totalPrice = cart.items.reduce((sum, item) => {
      if (item.product) {
        return sum + item.product.price * item.quantity;
      }
      return sum;
    }, 0);

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.status(200).json({
      message: 'Item added to cart',
      cart: {
        items: cart.items,
        totalPrice: Math.round(totalPrice * 100) / 100,
        totalItems,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/cart/:itemId
exports.updateQuantity = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((i) => i._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const product = await Product.findById(item.product);
    if (product && quantity > product.stock) {
      return res.status(400).json({ message: `Only ${product.stock} available in stock` });
    }

    item.quantity = quantity;
    await cart.save();

    await cart.populate('items.product', 'name price imageUrl stock category');

    const totalPrice = cart.items.reduce((sum, item) => {
      if (item.product) {
        return sum + item.product.price * item.quantity;
      }
      return sum;
    }, 0);

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      message: 'Cart updated',
      cart: {
        items: cart.items,
        totalPrice: Math.round(totalPrice * 100) / 100,
        totalItems,
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cart/:itemId
exports.removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);

    if (cart.items.length === 0) {
      await Cart.deleteOne({ _id: cart._id });
      return res.json({
        message: 'Item removed from cart',
        cart: {
          items: [],
          totalPrice: 0,
          totalItems: 0,
        },
      });
    }

    await cart.save();

    // Populate and return
    await cart.populate('items.product', 'name price imageUrl stock category');

    const totalPrice = cart.items.reduce((sum, item) => {
      if (item.product) {
        return sum + item.product.price * item.quantity;
      }
      return sum;
    }, 0);

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      message: 'Item removed from cart',
      cart: {
        items: cart.items,
        totalPrice: Math.round(totalPrice * 100) / 100,
        totalItems,
      },
    });
  } catch (error) {
    next(error);
  }
};
