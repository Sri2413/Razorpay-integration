import { useLocation, useNavigate } from "react-router-dom";
import loadRazorpay from "../utils/loadRazorpay";
import "./Cart.css";

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state || {
    title: "No course selected",
    price: 0,
  };

  const price = Number(course.price);
  const GST_RATE = 0.18;
  const gstAmount = price * GST_RATE;
  const totalAmount = Math.round(price + gstAmount);

  const handlePayment = async () => {
    // 1️⃣ Load Razorpay SDK
    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      // 2️⃣ Create order
      const res = await fetch(
        "https://razorpay-integration-2-u3am.onrender.com/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount }),
        }
      );

      const order = await res.json();

      if (!order.id) {
        navigate("/payment-failed");
        return;
      }

      // 3️⃣ Razorpay options
      const options = {
        key: "rzp_test_Ry6xHsPcUus7rj",
        amount: order.amount,
        currency: "INR",
        name: "Course Platform",
        description: course.title,
        order_id: order.id,

        handler: async function (response) {
          const verifyRes = await fetch(
            "https://razorpay-integration-2-u3am.onrender.com/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const result = await verifyRes.json();

          if (result.status === "success") {
            navigate("/payment-success");
          } else {
            navigate("/payment-failed");
          }
        },

        modal: {
          ondismiss: function () {
            navigate("/payment-failed");
          },
        },

        prefill: {
          name: "Srikanth",
          email: "srikanth@gmail.com",
          contact: "9876543210",
        },

        theme: {
          color: "#33cc8f",
        },
      };

      // 4️⃣ Create Razorpay instance
      const rzp = new window.Razorpay(options);

      // 5️⃣ FAILURE EVENT (THIS WAS MISSING PROPERLY)
      rzp.on("payment.failed", function () {
        navigate("/payment-failed");
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      navigate("/payment-failed");
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-card">
        <h2>Cart Summary</h2>

        <div className="cart-row">
          <span>Course</span>
          <span>{course.title}</span>
        </div>

        <div className="cart-row">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
