const Product = require('../schemas/v1/product.schema')

exports.createProduct = async (req, res) => {
    try {
        const { prd_code, prd_name, prd_desc, prd_price, prd_stock_quan, prd_category, prd_images, prd_tags, prd_status } = req.body;
        var prd = await Product.findOne({prd_code})
        if(prd){
            return res.status(400).send("Product Code Already exists");
        }
        const newProduct = new Product({
            prd_code,
            prd_name,
            prd_desc,
            prd_price,
            prd_stock_quan,
            prd_category,
            prd_images,
            prd_tags,
            prd_status
        });

        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ prd_code: req.params.id });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
};
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { prd_code: req.params.id }, // เงื่อนไขค้นหาด้วย prd_code
            req.body,
            { new: true, runValidators: true } // คืนค่าหลังอัปเดตและตรวจสอบข้อมูล
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({prd_code: req.params.id});

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        res.status(200).json({ success: true, message: "Product deleted!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
};
