import React from 'react';

function Footer () {
    const currentYear = new Date().getFullYear();

    return (
            <footer>
            <div className="footer-color">
                <div className="footer-top">
                <h6>Copyright © {currentYear}. All rights reserved.</h6>
                </div>

                <div className="footer-middle">
                <a href="/privacy" className="text-decoration-none text-muted">Privacy Policy</a>
                <a href="/terms" className="text-decoration-none text-muted">Terms of Service</a>
                </div>

                <div className="footer-bottom">
                <p className="small">
                    NUVolunteers is a student-led project and is not affiliated with or endorsed by Northwestern University.
                </p>
                </div>
            </div>
            </footer>
    );
}

export default Footer;