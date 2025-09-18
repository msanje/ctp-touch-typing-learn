interface LegalProps {
  className?: string;
}

export const TermsAndConditions: React.FC<LegalProps> = ({
  className = "",
}) => {
  return (
    <article
      className={`prose max-w-none p-6 bg-white rounded-2xl shadow-sm ${className}`}
    >
      <h1>Terms &amp; Conditions</h1>

      <h2>Acceptance</h2>
      <p>
        By using this website you agree to these Terms &amp; Conditions. If you
        do not agree, do not use the service.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be at least 13 years old to create an account and use the
        platform.
      </p>

      <h2>Account responsibility</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activity that occurs under your account.
      </p>

      <h2>Permitted use</h2>
      <p>
        The platform is provided for personal learning only. You may not copy,
        redistribute, reproduce, or resell content without explicit permission.
      </p>

      <h2>Payments</h2>
      <p>
        Paid features require payment in advance. Fees, billing cycles, and
        renewal behavior will be displayed at the point of purchase. All
        payments are processed by third-party payment providers; you agree to
        any processor terms in addition to these terms.
      </p>

      <h2>Service availability</h2>
      <p>
        We aim to keep the service available, but we do not guarantee 100%
        uptime. We are not liable for service interruptions outside our control
        (e.g., hosting outages, force majeure).
      </p>

      <h2>Modifications</h2>
      <p>
        We may update features or these terms at any time. We will post the
        updated terms on this page and update the "Last updated" date. Continued
        use after changes means you accept them.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction where the site
        operator resides. For users in India, this will be Indian law unless
        otherwise stated at the point of sale.
      </p>

      <h2>Contact</h2>
      <p>Questions about these terms: support@yourdomain.example</p>

      <small>Last updated: {new Date().toLocaleDateString()}</small>
    </article>
  );
};
