import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div 
      className='container-fluid d-flex justify-content-center align-items-center py-5'
      style={{ backgroundColor: '#F4EDFF', minHeight: '90vh' }}>
        <div className='custom-form-box p-4 shadow-lg rounded' style={{ maxWidth: '1200px', width: '100%', backgroundColor: 'white' }}>
        <h1 className="mb-3">Privacy Policy</h1>
          <p className="text-muted">Last updated: May 8, 2025</p>

          <hr />

          <h4>1. Information We Collect</h4>
          <ul>
            <li>Name, email address, and password when creating an account</li>
            <li>Website usage data collected via Google Analytics</li>
            <li>Browser/device data collected via cookies</li>
          </ul>
          <p>
            We do <strong>not</strong> collect sensitive personal info or financial data.
          </p>

          <h4>2. How We Use Your Information</h4>
          <ul>
            <li>To create and manage your account</li>
            <li>To operate and improve the platform</li>
            <li>To understand general website usage trends</li>
          </ul>
          <p>We <strong>do not sell</strong> your data or share it with advertisers.</p>

          <h4>3. Cookies and Analytics</h4>
          <p>
            NUVolunteers uses cookies and Google Analytics for anonymous usage tracking. By using the site, you consent to this. You can opt out of Analytics here:{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              tools.google.com/dlpage/gaoptout
            </a>
          </p>

          <h4>4. Data Security</h4>
          <p>
            We apply reasonable technical and organizational safeguards, but no method is 100% secure. Protect your account with a strong password.
          </p>

          <h4>5. Your Rights</h4>
          <p>
            You can request to view, change, or delete your data by emailing{" "}
            <a href="mailto:arora@u.northwestern.edu">arora@u.northwestern.edu</a>.
          </p>

          <h4>6. Children’s Privacy</h4>
          <p>
            We do not knowingly collect data from users under 18. If we learn a minor has registered, we will delete their information.
          </p>

          <h4>7. Changes to This Policy</h4>
          <p>
            We may revise this notice. The updated version will be posted here with a new “Last updated” date.
          </p>

          <h4>8. Contact</h4>
          <p>
            Questions? Email us at{" "}
            <a href="mailto:arora@u.northwestern.edu">arora@u.northwestern.edu</a>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;