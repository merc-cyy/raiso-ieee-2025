// import React, {useEffect, useState, useMemo }  from 'react';


// function ContactForm(){
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [submissionStatus, setSubmissionStatus] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmissionStatus('submitting');

//         const formData = {
//         name: name,
//         email: email,
//         message: message
//     };

//         const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxd9l9dZO-YXfSGQLNKHXUi3kRw2a0KeGmRzpJ0nn84RGdrnxMNQ5dCgWS3wceOjAUEGw/exec'



//          try {
//             const response = await fetch(WEB_APP_URL, {
//                 method: 'POST',
//                 mode: 'no-cors', // Important for some deployments
//                 headers: {
//                 'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 if (data.result === 'success') {
//                 setSubmissionStatus('success');
//                 setName('');
//                 setEmail('');
//                 setMessage('');
//                 } else {
//                 setSubmissionStatus('error');
//                 }
//             } else {
//                 setSubmissionStatus('error');
//             }
//             } catch (error) {
//             console.error('Form submission error:', error);
//             setSubmissionStatus('error');
//             }
//             };

    

//     return(
//     <div className='container mt-5'>
//         <h2>Contact Us</h2>
//         <p>Want to get in touch? </p>

//         {submissionStatus === 'success' && <div className="alert alert-success">Thank you for your submission!</div>}
//         {submissionStatus === 'error' && <div className="alert alert-danger">There was an error submitting your form. Please try again.</div>}
//         {submissionStatus === 'submitting' && <div>Submitting...</div>}
//         <form onSubmit={handleSubmit}> {/* Add onSubmit={handleSubmit} here */}
//             <div className="mb-3">
//                 <label htmlFor="name" className="form-label"><b>Name</b></label>
//                 <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//             </div>
//             <div className="mb-3">
//                 <label htmlFor="email" className="form-label"><b>Email address</b></label>
//                 <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     aria-describedby="emailHelp"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//             </div>
//             <div className="mb-3">
//                 <label htmlFor="message" className="form-label"><b>Message</b></label>
//                 <textarea
//                     className="form-control"
//                     id="message"
//                     rows="5"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     required
//                 ></textarea>
//             </div>
//             <button type="submit" className="btn btn-primary  custom-btn-post-color">Submit</button>
//         </form>
//     </div>
// )};

// export default ContactForm;


import React, {useEffect, useState, useMemo }  from 'react';

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

        const formData = {
        name: name,
        email: email,
        message: message
    };
        console.log('Form data:', formData); // Log the data being sent

        const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz512x1VAay-sv49YyR8pvIQjYjDAus2v8d8ZyBHu3_oF4iVK_pVu6Vi4cftBbBEd4hqA/exec'
        try{
            console.log('Attempting to fetch:', WEB_APP_URL); // Log before the fetch request
            const response = await fetch(WEB_APP_URL, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
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
            } else {
                console.log('Response status indicates an error:', response.status, response.statusText);
                setSubmissionStatus('error');
            }
            } catch (error) {
            console.error('Fetch error:', error); // Log any errors during the fetch process
            setSubmissionStatus('error');
            }
            console.log('handleSubmit function finished'); // Log when the handler completes
            };

    return(
        <div className='container mt-5'>
            <h2>Contact Us</h2>
            <p>Want to get in touch? </p>

            {submissionStatus === 'success' && <div className="alert alert-success">Thank you for your submission!</div>}
            {submissionStatus === 'error' && <div className="alert alert-danger">There was an error submitting your form. Please try again.</div>}
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
  