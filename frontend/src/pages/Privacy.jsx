import React from "react";
import "../css/PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <h2>Privacy Policy</h2>
      <p>
        <b>Last updated: June 7, 2024</b>
      </p>

      <h3>What Information We Collect</h3>
      <p>
        We collect only the necessary information to create and manage your account and planned trips: email address, password (securely stored), destination names, trip dates, and any trip notes you choose to add.
      </p>

      <h3>How We Use Your Data</h3>
      <p>
        Your data is used solely to provide and improve the TripPlanner experience. We do not sell, share, or rent your personal information to third parties.
      </p>

      <h3>Data Security</h3>
      <p>
        All user data is stored securely using encryption methods and access is strictly limited to you (the account holder). Your password is never exposed or shared with anyone.
      </p>

      <h3>Your Rights</h3>
      <ul>
        <li>
          You can request to view, update, or delete your account and all your data at any time.
        </li>
        <li>
          If you have any questions or concerns about your personal data, please contact us at <a href="mailto:contact@tripplanner.com">contact@tripplanner.com</a>.
        </li>
      </ul>

      <h3>Cookies and Analytics</h3>
      <p>
        We may use cookies solely for authentication or for improving the user experience. No cookies are used for advertising purposes or unnecessary tracking.
      </p>

      <h3>Policy Updates</h3>
      <p>
        TripPlanner may update this privacy policy from time to time. Any changes will be posted on this page.
      </p>

      <p>
        By using TripPlanner, you agree to the terms described above.
      </p>
    </div>
  );
}