const express = require("express");
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../../../controllers/orderControllers");
const { verifyAccessToken } = require("../../../middlewares/verifyaccess");

const router = express.Router();

router.post("/order/create", verifyAccessToken, createOrder);
router.get("/order", getAllOrders);
router.get("/order/i/:userId", getUserOrders);
router.get("/order/:orderId", getOrderById);
router.put("/order/:orderId", updateOrder);
router.delete("/order/:orderId", deleteOrder);

module.exports = router;
