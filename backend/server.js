// backend/index.js
require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");

const app = express();

// Allow requests from your frontend
app.use(
  cors({
    origin: "https://razorpay-integration-tau.vercel.app",
  })
);

app.use(express.json());

/* =========================
   RAZORPAY INSTANCE
========================= */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* =========================
   CREATE ORDER
========================= */
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert rupees to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Order creation failed" });
  }
});

/* =========================
   VERIFY PAYMENT
========================= */
app.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({ status: "success" });
    } else {
      return res.status(400).json({ status: "failure" });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ status: "error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
