interface LegalProps {
  className?: string;
}

export const RefundPolicy: React.FC<LegalProps> = ({ className = "" }) => {
  return (
    <article
      className={`prose max-w-none p-6 bg-white rounded-2xl shadow-sm ${className}`}
    >
      <h1>Refund Policy</h1>

      <h2>Summary</h2>
      <p>
        We want you to be satisfied. If you are not happy with your purchase,
        you may request a refund within the window described below.
      </p>

      <h2>Refund window</h2>
      <p>
        Full refunds are available within <strong>7 days</strong> of the first
        payment, provided you have not completed more than <strong>20%</strong>{" "}
        of the paid course or content.
      </p>

      <h2>How to request</h2>
      <ol>
        <li>Email support with your account email and transaction ID.</li>
        <li>We will review eligibility and reply within 3 business days.</li>
        <li>
          If approved, refunds are processed to the original payment method
          within 5–7 business days (processing times depend on the payment
          provider and bank).
        </li>
      </ol>

      <h2>Non-refundable situations</h2>
      <ul>
        <li>Requests after the 7-day window.</li>
        <li>Accounts that have completed more than 20% of paid content.</li>
        <li>Subscription cycles that have already renewed.</li>
      </ul>

      <h2>Exceptions</h2>
      <p>
        In some jurisdictions, consumer protection laws may provide additional
        rights. We will comply with mandatory local laws where applicable.
      </p>

      <h2>Contact</h2>
      <p>To request a refund: support@yourdomain.example</p>

      <small>Last updated: {new Date().toLocaleDateString()}</small>
    </article>
  );
};
