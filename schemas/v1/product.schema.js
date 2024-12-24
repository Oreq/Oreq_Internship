const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    prd_code: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    prd_name: {
        type: String,
        required: true
    },
    prd_desc: {
        type: String,
        default: "ไม่มีคำอธิบาย"
    },
    prd_price: {
        type: Number,
        required: true,
        min: 0
    },
    prd_stock_quan: {
        type: Number,
        required: true,
        min: 0
    },
    prd_category: {
        type: String,
        enum: ['หมวด1', "หมวด2", "หมวด3","อื่นๆ"],
        default: "อื่นๆ"
    },
    prd_images: {
        type: [String]
    },
    prd_tags: {
        type: [String]
    },
    prd_status: {
        type: String,
        enum: ["Active","Inactive"],
        default: "Active"
    }

},{timestamps: true , versionKey: false})

module.exports = Product = mongoose.model("product",ProductSchema)