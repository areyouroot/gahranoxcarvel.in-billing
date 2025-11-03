const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/logos'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, JPG, and PNG files are allowed'));
        }
    }
});

// Routes
router.post('/generate', upload.single('logo'), invoiceController.generateInvoice);
router.get('/default-logo', invoiceController.getDefaultLogo);
router.post('/upload-logo', upload.single('logo'), invoiceController.uploadLogo);

module.exports = router;