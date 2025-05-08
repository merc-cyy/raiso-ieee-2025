import React from 'react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';




function Onboarding(){

    //state variables
    //const backendApiUrl = 'https://raiso-ieee-2025.onrender.com';
    const backendApiUrl = 'http://localhost:5001';

    // const navigate = useNavigate();

    const [registrationSuccess, setRegistrationSuccess] = useState(false); // to trakc if registration was successful
    const [registrationError, setRegistrationError] = useState('');
    const [email, setEmail] = useState(""); //"" is the intial value 
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [interests, setInterests] = useState('');

    const handleSubmit= async (e) => {
        e.preventDefault();//prevent default submission on page reload

        //then store the values
        const formData = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        city: city,
        state: state,
        zipcode: zip,
        description: interests};

        if (password !== retypePassword){
            setRegistrationError("Passwords do not match");
            setRegistrationSuccess(false);
            return;
        }

        if (password.length < 6) {
            setRegistrationError("Password must be at least 6 characters long");
            setRegistrationSuccess(false);
            return;
        }

        try{
            //then add the api call
            const res = await fetch(`${backendApiUrl}/auth/signup`,
            {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body : JSON.stringify(formData)
            })
            if (!res.ok)
            {
                const errorData = await res.json(); // Try to parse error message from server
                console.log("errordata:" + errorData)
                console.log("error" + errorData.error)
                throw new Error(errorData.error || 'User not added');
            }
            const data = await res.json()
            console.log('Registration successful', data);
            setRegistrationSuccess(true);
            setRegistrationError('');

        }
        catch(error) {
            console.error('Registration failed:', error);
            setRegistrationError(error.message || 'Registration failed. Please try again.');
            setRegistrationSuccess(false);

    }}

    // const handleLoginLinkClick = () => {
    //     navigate('/'); // Assuming '/' is your landing page route
    // }; // if login is successful




    return(
        <div className='container-fluid d-flex justify-content-center align-items-center'>
            <div className='custom-form-box d-flex flex-column align-items-center'>
                
                <div className='container-fluid text-center mt-4 custom-landing-text'>
                    <h3>Student Sign Up to Engage!</h3>
                </div>

                <div className='container-fluid mt-4 ps-5 pe-5 pb-3'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h5 className='custom-landing-text mb-0'>Personal Information</h5>
                            <p className='ps-3'>Input your profile info here!</p>
                        </div>

                        <div className='container pt-1 custom-form-section'>
                            <div class="row g-3 pb-3">
                                <div class="col">
                                    <label for="inputEmail" className="form-label">Email</label>
                                        <input type="email" className="form-control" placeholder='example@gmail.com' id="inputEmail" value={email} onChange={e => setEmail(e.target.value)}/>
                                </div>
                            </div>


                            <div class='row g-3 pb-3'>
                                <div class="col-md-6">
                                    <label for="inputPassword1" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="inputPassword1" value={password} onChange={e => setPassword(e.target.value)}/>
                                </div>

                                <div class="col-md-6">
                                    <label for="inputPassword2" class="form-label">Retype Password</label>
                                        <input type="password" class="form-control" id="inputPassword2" value={retypePassword} onChange={e => setRetypePassword(e.target.value)}/>
                                </div>

                            </div>

                            <div class='row g-3 pb-3'>
                                <div class="col-md-6">
                                    <label for="firstname" class="form-label">First Name</label>
                                        <input type="text" class="form-control" placeholder='Willie' id="firstname" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                </div>

                                <div class="col-md-6">
                                    <label for="lastname" class="form-label">Last Name</label>
                                        <input type="text" class="form-control"placeholder='Wildcat' id="lastname" value={lastName} onChange={e => setLastName(e.target.value)}/>
                                </div>

                            </div>
                            
                            <div className='row g-3 pb-3'>
                                <div class="col-md-6">
                                    <label for="inputCity" class="form-label">City</label>
                                        <input type="text" class="form-control" id="inputCity" value={city} onChange={e => setCity(e.target.value)}/>
                                </div>

                                <div class="col-md-4">
                                    <label for="inputState" class="form-label">State</label>
                                        <select id="inputState" class="form-select" value={state} onChange={e => setState(e.target.value)}>
                                            <option selected>Choose...</option>
                                            <option value="AL">Alabama</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="CA">California</option>
                                            <option value="CO">Colorado</option>
                                            <option value="CT">Connecticut</option>
                                            <option value="DE">Delaware</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="HI">Hawaii</option>
                                            <option value="ID">Idaho</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IN">Indiana</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">Louisiana</option>
                                            <option value="ME">Maine</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">Massachusetts</option>
                                            <option value="MI">Michigan</option>
                                            <option value="MN">Minnesota</option>
                                            <option value="MS">Mississippi</option>
                                            <option value="MO">Missouri</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NV">Nevada</option>
                                            <option value="NH">New Hampshire</option>
                                            <option value="NJ">New Jersey</option>
                                            <option value="NM">New Mexico</option>
                                            <option value="NY">New York</option>
                                            <option value="NC">North Carolina</option>
                                            <option value="ND">North Dakota</option>
                                            <option value="OH">Ohio</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="OR">Oregon</option>
                                            <option value="PA">Pennsylvania</option>
                                            <option value="RI">Rhode Island</option>
                                            <option value="SC">South Carolina</option>
                                            <option value="SD">South Dakota</option>
                                            <option value="TN">Tennessee</option>
                                            <option value="TX">Texas</option>
                                            <option value="UT">Utah</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">Washington</option>
                                            <option value="WV">West Virginia</option>
                                            <option value="WI">Wisconsin</option>
                                            <option value="WY">Wyoming</option>
                                        </select>
                                </div>

                                <div class="col-md-2">
                                    <label for="inputZip" class="form-label">Zip</label>
                                        <input type="text" class="form-control" id="inputZip" value={zip} onChange={e => setZip(e.target.value)}/>
                                </div>
                            </div>


                            

                                {/* <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                            <label class="form-check-label" for="gridCheck">
                                                Check me out
                                            </label>
                                    </div>
                                </div> */}
                                
                                {/* <div class="col-12">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>  */}

                        </div>

                        <div>
                            <h5 className='custom-landing-text pt-5'>Skills and Interests</h5>
                                <p className='ps-3 mt-2'>Our application uses the information you enter here to match you to relevant volunteer opportunities around your area. Don't be shy to include any skills you may have as well as areas you are interested in volunteering.</p>
                        </div>

                        <div className='container pt-1 custom-form-section'>
                            {/* <div className='row g-3 pb-3'>
                                <div class="col">
                                    <label for="interests" class="form-label">Interests</label>
                                        <select id="interests" class="form-select">
                                            <option selected>I want to...</option>
                                            <option value="AL">work with small children</option>
                                            <option value="AK">work with animals and animal shelters</option>
                                            <option value="AZ">be involved in healthcare</option>
                                            <option value="environment">Engage in environmental conservation</option>
                                            <option value="education">Tutor or mentor students</option>
                                            <option value="food">Support local food banks</option>
                                            <option value="senior">Assist senior citizens</option>
                                            <option value="community">Community development & outreach</option>
                                            <option value="arts">Promote arts and culture</option>
                                            <option value="disaster">Participate in disaster relief</option>
                                        </select>
                                </div>
                            </div> */}

                            <div className='row g-3 pb-3'>
                                <div class="col">
                                    <label for="interests" class="form-label"></label> 
                                        <textarea class="form-control" id="interests" rows="3" value={interests} onChange={e => setInterests(e.target.value)}></textarea>
                                </div>
                            </div>

                            <div class="col-12">
                                    <button type="submit" className="btn btn-primary" >Save</button>
                            </div>

                        </div>

              
                    </form>

                    
                    {registrationSuccess && (
                        <div className="mt-3 alert alert-success" role="alert">
                            Registration successful! Check your email to confirm your address then you will be redirected to login
                        </div>
                    )}

                    {registrationError && (
                        <div className="mt-3 alert alert-danger" role="alert">
                            Error: {registrationError}
                        </div>
                    )}

                </div>
            </div>
        </div>







    );
};


export default Onboarding;



        // LOGIN You can now <button className="btn btn-link p-0" onClick={handleLoginLinkClick}>Log In</button> to see open postings.<br></br> 
        // <div>
        //     <div className='container-fluid mt-5 custom-landing-logo'>
        //         <a className="navbar-brand me-4 d-flex" href="#">
        //             <i className="bi bi-person-arms-up d-inline-block align-text-top fs-3 custom-icon-color pb-2"></i>
        //             NUVolunteers!
        //         </a>
        //     </div>

        //     <div className='container-fluid mt-5 text-center'>
        //         <h1 className='custom-landing-text'>Please fill out the following information:</h1>
        //     </div>

        //     <div className='container-fluid mt-5 text-center'>
        //         <form>
        //             <div className="mb-3">
        //                 <label for="exampleInputEmail1" className="form-label">Email address</label>
        //                 <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        //                 <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        //             </div>
        //             <div className="mb-3">
        //                 <label for="exampleInputPassword1" className="form-label">Password</label>
        //                 <input type="password" className="form-control" id="exampleInputPassword1"/>
        //             </div>
        //             <div className="mb-3 form-check">
        //                 <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        //                 <label className="form-check-label" for="exampleCheck1">Check me out</label>
        //             </div>
        //             <button type="submit" className="btn btn-primary">Submit</button>
        //         </form>
        //      </div>
        // </div>