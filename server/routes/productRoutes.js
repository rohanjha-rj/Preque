const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../utils/cloudinary');

// Public routes
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

// Admin routes
router.route('/').post(protect, admin, createProduct);
router.post('/upload', protect, admin, upload.array('images', 8), (req, res) => {
    const images = req.files.map(file => ({
        url: file.path,
        public_id: file.filename
    }));
    res.json(images);
});
router.route('/:id')
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;
