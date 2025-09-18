import React from "react";

interface LegalProps {
  className?: string;
}

export const PrivacyPolicy: React.FC<LegalProps> = ({ className = "" }) => {
  return (
    <article
      className={`prose max-w-none p-6 bg-white rounded-2xl shadow-sm ${className}`}
    >
      <h1>Privacy Policy</h1>
      <p>
        We respect your privacy. This website collects only the information
        necessary to provide touch-typing lessons and track progress.
      </p>

      <h2>Data we collect</h2>
      <ul>
        <li>
          Name and email address (for account creation and communication).
        </li>
        <li>
          Basic usage data (lessons completed, speed/accuracy metrics) to
          personalize learning.
        </li>
        <li>
          Payment and billing details are processed by our third-party payment
          partner; we do not store full card numbers on our servers.
        </li>
      </ul>

      <h2>How we use your data</h2>
      <p>
        We use collected data to provide access to lessons, personalize practice
        sessions, and process payments. Aggregate, anonymized usage data may be
        used to improve the service.
      </p>

      <h2>Sharing and third parties</h2>
      <p>
        We never sell your personal information. We share necessary data with
        our payment processor and hosting/database providers to deliver the
        service. These parties process data under contract and are not allowed
        to use it for unrelated purposes.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies (and similar technologies) to keep you logged in,
        remember preferences, and improve user experience. You can control
        cookies through your browser settings.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access, correction, or deletion of your personal data by
        contacting us. We will respond to verifiable requests and remove your
        account data within a reasonable time frame, subject to legal retention
        requirements.
      </p>

      <h2>Contact</h2>
      <p>To request changes or deletion, email: support@yourdomain.example</p>

      <small>Last updated: {new Date().toLocaleDateString()}</small>
    </article>
  );
};
