const Order = require("../schemas/v1/order.schema");
const Product = require('../schemas/v1/product.schema')
const createOrder = async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).send({ message: "Products are required and should be an array" });
        }
        console.log("test " + req.user)
        if (!req.user || !req.user.userId) {
        return res.status(401).send({ message: "Unauthorized: User ID not found" });
        }

        const productsData = await Promise.all(
        products.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
            }
            return {
            product: product._id,
            quantity: item.quantity,
            price: product.prd_price,
            };
        })
        );

        const totalPrice = productsData.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const newOrder = new Order({
        user: req.user.userId,
        products: productsData,
        totalPrice: totalPrice,
        });

        await newOrder.save();

        res.status(201).send({
        message: "Order created successfully",
        data: newOrder,
        });
    } catch (error) {
        if (error.message.includes("Product not found")) {
        return res.status(404).send({ message: error.message });
        }
        res.status(500).send({ message: "Server error", error });
    }
};
  

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user",'user.name user.email')
        .populate("products.product",'prd_code prd_name ');
        res.status(200).send({ data: orders });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
    const orders = await Order.find({ user: req.params.userId })
    .populate("user",'user.name user.email')
    .populate("products.product",'prd_code prd_name ');
    res.status(200).send({ data: orders });
    } catch (error) {
    res.status(500).send({ message: "Server error", error });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        console.log('test ' + order )
        if (!order) return res.status(404).send({ message: "Order not found" });
        res.status(200).send({ data: order });
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};


const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { ...req.body, updatedDate: Date.now() },
      { new: true }
    );
    if (!order) return res.status(404).send({ message: "Order not found" });

    res.status(200).send({ message: "Order updated successfully", data: order });
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) return res.status(404).send({ message: "Order not found" });

    res.status(200).send({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
