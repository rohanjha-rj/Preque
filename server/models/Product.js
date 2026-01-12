const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true,
        uppercase: true,
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Men', 'Women', 'Unisex'],
            message: 'Category must be Men, Women, or Unisex'
        }
    },
    subCategory: {
        type: String,
        required: [true, 'Subcategory is required'],
        enum: {
            values: ['Shirts', 'Trousers', 'Outerwear', 'Accessories', 'Dresses', 'Tops', 'Bottoms'],
            message: 'Please select a valid subcategory'
        }
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [20, 'Description must be at least 20 characters long']
    },
    fabric: {
        type: String,
        required: [true, 'Fabric information is required']
    },
    dyeMethod: {
        type: String,
        required: [true, 'Dye method is required']
    },
    fit: {
        type: String,
        required: [true, 'Fit information is required']
    },
    colors: [{
        name: {
            type: String,
            required: true
        },
        hex: {
            type: String,
            match: [/^#[0-9A-F]{6}$/i, 'Please provide a valid hex color code']
        }
    }],
    sizes: [{
        size: {
            type: String,
            required: true
        },
        inventory: {
            type: Number,
            required: true,
            default: 0,
            min: [0, 'Inventory cannot be negative']
        }
    }],
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    discountPrice: {
        type: Number,
        min: [0, 'Discount price cannot be negative'],
        validate: {
            validator: function (value) {
                return !value || value < this.price;
            },
            message: 'Discount price must be less than regular price'
        }
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0,
        min: 0
    },
    reviews: [reviewSchema],
    sustainabilityInfo: {
        treesPlanted: {
            type: Number,
            default: 1,
            min: 0
        },
        waterSaved: {
            type: Number,
            default: 0
        },
        co2Reduced: {
            type: Number,
            default: 0
        },
        details: String
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        public_id: String,
        alt: String
    }],
    isNewArrival: {
        type: Boolean,
        default: false
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    tags: [String]
}, {
    timestamps: true
});

// Calculate total inventory across all sizes
productSchema.virtual('totalInventory').get(function () {
    return this.sizes.reduce((total, size) => total + size.inventory, 0);
});

// Check if product is in stock
productSchema.virtual('inStock').get(function () {
    return this.totalInventory > 0;
});

// Index for better query performance
productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ price: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ isNewArrival: 1, isPopular: 1 });

module.exports = mongoose.model('Product', productSchema);
