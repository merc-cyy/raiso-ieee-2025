import React from 'react';


function Footer () {
    return (
        <footer>
            <div className='footer-color'>
            <div className='d-flex  mt-4 pt-2 '>
                <h6 className='ps-2'>Copyright (c) 2025.  All rights reserved. </h6> <br></br>
                <div className='ms-auto'>
                <p className='mb-0'><>Privacy Policy</></p>
                </div>
                <div className='ms-4 justify-content-between '>
                        
                        <i className="bi bi-instagram pe-4 "></i>
                        <i className="bi bi-facebook pe-4 "></i>
                        <i className="bi bi-whatsapp pe-4 "></i>
                </div>
            </div>
             <div className='ps-2 mt-1'> {/* Added a div to wrap the disclaimer and some margin */}
                    <p className="mb-0 small text-muted">NUVolunteers is a student-led project and is not affiliated with or endorsed by Northwestern University</p>
            </div>
            </div>
        </footer>
    );
};



export default Footer;