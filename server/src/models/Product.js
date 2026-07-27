const mongoose = require('mongoose');

const CATEGORIES = ['Ethnic Wear', 'Handicrafts', 'Wellness', 'Gourmet', 'Art & Books'];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: CATEGORIES,
        message: `Category must be one of: ${CATEGORIES.join(', ')}`,
      },
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    images: [
      {
        type: String,
      },
    ],
    seller: {
      name: { type: String, default: 'Artisan Heritage India' },
      rating: { type: Number, default: 4.8 },
      location: { type: String, default: 'Jaipur, Rajasthan' },
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

// Text index for search
productSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', productSchema);
module.exports.CATEGORIES = CATEGORIES;
