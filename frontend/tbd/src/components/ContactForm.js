
import React, {useState }  from 'react';

function ContactForm(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit function called'); // Log when the submit handler starts
        setSubmissionStatus('submitting');
        console.log('Submission status set to: submitting');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        console.log('Form data:', formData); // Log the data being sent

        const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyFoMK4qMNbGQeGCrAtVOREE1-i2bdCMFpQbgAHeoe4g9BbsxGt45v1x1lr_n-oN-qHjw/exec'
        try{
            console.log('Attempting to fetch:', WEB_APP_URL); // Log before the fetch request
            const response = await fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
            console.log('Fetch response:', response); // Log the raw response object

            if (response.ok) {
                console.log('Response status is OK');
                const data = await response.json();
                console.log('Response data:', data); // Log the parsed JSON data
                if (data.result === 'success') {
                    console.log('Submission successful!');
                    setSubmissionStatus('success');
                    setName('');
                    setEmail('');
                    setMessage('');
                } else {
                    console.log('Submission failed on server:', data);
                    setSubmissionStatus('error');
                }
            } else 
            {
                console.log('Response status indicates an error:', response.status, response.statusText);
                setSubmissionStatus('error');
                setName('');
                setEmail('');
                setMessage('');
            }
            } catch (error) 
            {
            console.error('Fetch error:', error); // Log any errors during the fetch process
            setSubmissionStatus('error');
            
            }
            console.log('handleSubmit function finished'); // Log when the handler completes
            };

    return(
        <div className='container mt-5'>
            <h2>Contact Us</h2>
            <p>Want to get in touch? </p>

            {submissionStatus === 'error' && <div className="alert alert-success">Thank you for your submission!</div>}
            {/* {submissionStatus === 'error' && <div className="alert alert-danger">There was an error submitting your form. Please try again.</div>} */}
            {submissionStatus === 'submitting' && <div>Submitting...</div>}
            <form onSubmit={handleSubmit}> {/* Add onSubmit={handleSubmit} here */}
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
                        aria-describedby="emailHelp"
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
                <button type="submit" className="btn btn-primary  custom-btn-post-color">Submit</button>
            </form>
        </div>
    )};

export default ContactForm;
  