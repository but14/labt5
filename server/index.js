require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { type } = require('os');
const { error } = require('console');


app.use(express.json());
app.use(cors());

// MongoDB connection
const dbURL = process.env.MONGODB_URL;





const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images'));


app.post('/upload', upload.single('product'), (req, res) => {
    if (req.file) {
        res.json({
            success: 1,
            image_url: `http://localhost:${process.env.PORT || 4000}/images/${req.file.filename}`
        });
    } else {
        res.status(400).json({
            success: 0,
            message: 'No file uploaded'
        });
    }
});





const Product = mongoose.model('Product', { 
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});





app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const newProduct = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    try {
        await newProduct.save();
        console.log('Product saved!');
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving product',
        });
    }
});




app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id })
        console.log("Product remove!")
        res.json({
            success: true,
            name: req.body.name,
        })
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing product'
        })
    }
})



app.get('/allproducts', async (req, res) => {
    try {
        let product = await Product.find({});
        console.log("All Product fetched");
        res.send(product);
    } catch (error) {
        console.error('Error  All_Product:', error);
        res.status(500).json({
            success: false,
            message: 'Error  All_product'
        })
    }
})













































// MongoDB database connection: 

mongoose.connect(dbURL)
    .then(() => {
        console.log('MongoDB connected successfully!');

        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Basic route
app.get('/', (req, res) => {
    res.send("Express is running");
});





