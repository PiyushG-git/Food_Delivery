import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, placeDirectOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/direct", authMiddleware, placeDirectOrder); // New route for direct order
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/listorders", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;