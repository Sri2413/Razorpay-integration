// frontend/src/Cart.js
import { useLocation, useNavigate } from "react-router-dom";
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
  const totalAmount = price + gstAmount;

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      // Call your deployed backend instead of localhost
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
        alert("Order creation failed");
        return;
      }

      const options = {
        key: "rzp_test_Ry6xHsPcUus7rj", // PUBLIC key
        amount: order.amount,
        currency: "INR",
        name: "Course Platform",
        description: course.title,
        order_id: order.id,

        handler: async function (response) {
          // Verify payment on backend
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
            alert("Payment verification failed");
          }
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

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
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
          <span>Base Price</span>
          <span>₹{price.toFixed(2)}</span>
        </div>

        <div className="cart-row">
          <span>GST (18%)</span>
          <span>₹{gstAmount.toFixed(2)}</span>
        </div>

        <hr />

        <div className="cart-total">
          <span>Total Amount</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Proceed to Pay
        </button>

        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Courses
        </button>
      </div>
    </div>
  );
}
