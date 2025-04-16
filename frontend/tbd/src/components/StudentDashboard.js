import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation if needed

function StudentDashboard() {
    // Mock data for interested posts - replace with actual data fetching
    const [interestedPosts, setInterestedPosts] = useState([
        {
            id: 1,
            role: 'Animal Shelter Volunteer',
            organization: 'Happy Tails Shelter',
            description: 'Help care for and find loving homes for our furry friends.',
        },
        {
            id: 3,
            role: 'Healthcare Assistant',
            organization: 'HealthFirst',
            description: 'Support healthcare professionals in providing community services.',
        },
        // so interestedposts has the array of posts and the setInterestedPosts is the function to update them
    ]);

    const [buttonText, setbuttonText] = useState("Apply");

    const handleDropdownItemClick = (event) => {
        const selectedText = event.target.textContent ;
        setbuttonText(selectedText);

    };


    return (
        <div className=" bg-light d-flex full-viewport"> 
            <div className='row '>
                <div className="col-md-3 bg-fefae0 p-4 rounded shadow"> {/* Similar background to navbar, rounded corners, shadow */}

                    <div className="d-flex align-items-center mb-3">
                        <div className="me-2">
                            {/* User Icon (replace with your actual icon) */}
                            <i class="bi bi-person-fill fs-1 custom-icon-color"></i>
                        </div>
                    <div>
                    <h6>Mercy Muiruri</h6>
                    {/* Optional: User Role */}
                    <p className="text-muted small">Student</p>
                            </div>
                            </div>

                                {/* Separator Line */}
                    <hr className="border-secondary my-2" />


                    <h5 className="custom-posts-title mb-3">Dashboard Menu</h5>
                    <ul className="list-unstyled">
                        <li className="mb-2">
                            <Link to="/home" className="nav-link custom-dashboard text-decoration-none">Go to Postings</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/studentprofile" className="nav-link custom-dashboard text-decoration-none">Profile</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/logout" className="nav-link custom-dashboard text-decoration-none">Logout</Link>
                        </li>
                        {/* Add more sidebar links as needed */}
                    </ul>
                </div>

                {/* Main Content - List of Interested Posts */}
                <div className="col-md-9 p-4">
                    <h2 className="custom-posts-title mb-4">Interested Opportunities</h2>
                    {interestedPosts.length > 0 ? (
                        interestedPosts.map((post) => (
                            <div key={post.id} className="card my-3 p-3 custom-card-bg-color custom-border d-flex flex-row justify-content-between align-items-center">
                                <div>
                                    <h5 className="custom-job-role mb-1">{post.role}</h5>
                                    <p className="mb-0"><span className="fw-bold">Organization:</span> {post.organization}</p>
                                    <p className="mb-0 custom-description-color">{post.description.substring(0, 100)}...</p> {/* Show a snippet */}
                                </div>
                                <div>
                                    <div className='dropdown'>
                                        <button className="btn btn-success custom-btn-interestedpost-color dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{buttonText}</button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#" onClick={handleDropdownItemClick}>Applied!</a></li>
                                            <li><a class="dropdown-item" href="#" onClick={handleDropdownItemClick}>Not Applied</a></li>
                                            <li><a class="dropdown-item" href="#" onClick={handleDropdownItemClick}>Started Applying</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>You haven't shown interest in any opportunities yet.</p>
                    )}
                </div>
            </div>
            
        </div>
    );
}

export default StudentDashboard;



