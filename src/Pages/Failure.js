import "./Failure.css";

export default function Failure() {
  return (
    <div className="failure-wrapper">
      <div className="failure-card">
        <div className="failure-icon">
          ✕
        </div>

        <h1>Payment Failed</h1>
        <p>
          Unfortunately, your payment could not be completed.
          <br />
          Please try again or use a different payment method.
        </p>

        <div className="failure-actions">
          <a href="/" className="btn secondary">
            Go to Home
          </a>
          <a href="/cart" className="btn primary">
            Try Again
          </a>
        </div>
      </div>
    </div>
  );
}
