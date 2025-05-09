import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <div className='container-fluid d-flex justify-content-center align-items-center py-5'
      style={{ backgroundColor: '#F4EDFF', minHeight: '90vh' }}>
        <div className='custom-form-box p-4 shadow-lg rounded' style={{ maxWidth: '1200px', width: '100%', backgroundColor: 'white' }}>
          <h1 className="mb-4">Terms and Conditions</h1>
          <p className="text-muted">Last Updated: May 8, 2025</p>
          <hr />

          <h2>1. Who We Are</h2>
          <p>
            Our platform, in partnership with local organizations, transforms how nonprofits and similar
            organizations find talent. Powered by artificial intelligence, we dynamically match students with
            volunteer and internship opportunities based on their skills, availability, and interests. This tailored
            approach helps students find opportunities they are passionate about while enabling organizations to
            connect with their ideal candidates.
          </p>

          <h2>2. Eligibility</h2>
          <p>You must be at least 18 years old to use NUVolunteers. By using our Services, you represent that you are legally able to form a binding contract.</p>

          <h2>3. Acceptable Use</h2>
          <ul>
            <li>Do not violate any applicable laws or regulations</li>
            <li>Do not post or transmit unlawful or infringing content</li>
            <li>Do not scrape or collect data using automated means</li>
            <li>Do not impersonate others</li>
            <li>Do not disrupt or harm the platform</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on NUVolunteers, including code, text, branding, and design, is owned or licensed by us unless otherwise stated.
            <strong> Users may not copy, distribute, reverse-engineer, publicly display, or otherwise exploit any part of NUVolunteers without express written permission.</strong>
          </p>

          <h2>5. User Accounts</h2>
          <ul>
            <li>You must provide accurate info and keep your credentials secure</li>
            <li>You are responsible for activity on your account</li>
            <li>We may suspend or delete accounts for misuse</li>
          </ul>

          <h2>6. Privacy</h2>
          <p>
            Please review our <a href="/privacy">Privacy Policy</a> to understand how we handle your data.
          </p>

          <h2>7. Third-Party Services</h2>
          <p>
            We may link to third-party sites or tools. We are not responsible for their content or practices.
          </p>

          <h2>8. Service Availability</h2>
          <p>
            We aim for uptime but do not guarantee service availability. We may modify or discontinue any part of the platform.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may suspend or terminate your access at any time for misuse or violation of these terms.
          </p>

          <h2>10. Disclaimers</h2>
          <p>
            The Services are provided “as is.” We disclaim all warranties, including fitness for a particular purpose.
          </p>

          <h2>11. Limitation of Liability</h2>
          <p>
            We are not liable for indirect, incidental, or consequential damages arising from your use of the platform.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We may revise these Terms. We’ll update the date above and notify you when appropriate.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            Questions? Email us at <a href="mailto:arora@u.northwestern.edu">arora@u.northwestern.edu</a>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}