import React, { useState, useEffect } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const RECAPTCHA_SITE_KEY = '6LckOjIrAAAAAM9rmsXhTMFWgL8kUFZ9BQijyRHk';
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyFoMK4qMNbGQeGCrAtVOREE1-i2bdCMFpQbgAHeoe4g9BbsxGt45v1x1lr_n-oN-qHjw/exec';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => console.log('reCAPTCHA v3 script loaded');
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);
      formData.append('recaptchaToken', token);

      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors', // Remove this if your Apps Script handles CORS
        body: formData
      });

      setSubmissionStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Fetch error:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className='contact-form-container'>
      <div className='container mt-5'>
        <h2>Contact Us</h2>
        <p>Want to get in touch?</p>

        {submissionStatus === 'success' && (
          <div className="alert alert-success">Thank you for your submission!</div>
        )}
        {submissionStatus === 'error' && (
          <div className="alert alert-danger">There was an error submitting your form. Please try again.</div>
        )}
        {submissionStatus === 'submitting' && <div>Submitting...</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label"><b>Name</b></label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label"><b>Email address</b></label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label"><b>Message</b></label>
            <textarea
              className="form-control"
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary custom-btn-post-color">Submit</button>
        </form>
      </div>
      </div>
  );
}

export default ContactForm;
