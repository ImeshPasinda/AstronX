import React, { useEffect, useState } from 'react';
import { NAVIGATE_TO_ABOUT, NAVIGATE_TO_BLOG, NAVIGATE_TO_FAQ, NAVIGATE_TO_HOME, NAVIGATE_TO_LOGIN, NAVIGATE_TO_PROFILE, NAVIGATE_TO_REGISTER } from '../../constant/routeConstant';
import { LOGO, USER_AVATAR } from '../../constant/imageConstant';
import { handleLogout, isUserLoggedIn } from '../../utils/utility';
import useUserAuthInfo from '../authentication/useUserAuthInfo';
import { VERSION } from '../../constant/commonConstant';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userDetails = useUserAuthInfo();

  useEffect(() => {
    const loggedIn = isUserLoggedIn();
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg p-3 mb-5 navbar-dark custom-bg-color fixed-top`}>
      <div className="container-fluid" style={{ marginLeft: isMobile ? 0 : '15%', marginRight: isMobile ? 0 : '15%' }}>
        <a className="navbar-brand" href={NAVIGATE_TO_HOME}>
          <img src={LOGO} alt="" width="130" height="45" className="d-inline-block align-text-top" />
          {isLoggedIn && <span className="navbar-brand-text" style={{ color: 'gray', fontSize: 12 }}>{VERSION}</span>}
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item mt-1 text-center">
                  <a className="nav-link" href={NAVIGATE_TO_LOGIN} onClick={handleLogout}>
                    <h6 style={{ color: '#0056d2' }}>Logout</h6>
                  </a>
                </li>
                <div className="dropdown m-2 nav-item text-center">
                  <a href={NAVIGATE_TO_PROFILE} style={{ color: '#0056d2', textDecoration: 'none', display: 'inline-block' }}>
                    <h6 style={{ display: 'inline', marginRight: '10px' }}>Hi, {userDetails.username.split(' ')[0]}</h6>
                    <img src={USER_AVATAR} style={{ height: '30px', width: '30px', display: 'inline' }} alt="User Avatar" />
                  </a>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item mt-1 text-center">
                  <a className="nav-link" href={NAVIGATE_TO_ABOUT}>
                    <h6 style={{ color: '#404040', fontWeight: 400 }}>About Us</h6>
                  </a>
                </li>
                <li className="nav-item mt-1 text-center">
                  <a className="nav-link" href={NAVIGATE_TO_BLOG}>
                    <h6 style={{ color: '#404040', fontWeight: 400 }}>Blog</h6>
                  </a>
                </li>
                <li className="nav-item mt-1 text-center">
                  <a className="nav-link" href={NAVIGATE_TO_FAQ}>
                    <h6 style={{ color: '#404040', fontWeight: 400 }}>FAQ</h6>
                  </a>
                </li>
                <li className="nav-item mt-1 text-center">
                  <a className="nav-link" href={NAVIGATE_TO_LOGIN}>
                    <h6 style={{ color: '#0056d2' }}>{isLoggedIn ? 'Logout' : 'Login'}</h6>
                  </a>
                </li>
                {userDetails ? (
                  <div className="dropdown m-2 nav-item text-center">
                    <a style={{ color: '#0056d2', textDecoration: 'none', display: 'inline-block' }}>
                      <h6 style={{ display: 'inline', marginRight: '10px' }}>Hi, {userDetails.username.split(' ')[0]}</h6>
                      <img src={USER_AVATAR} style={{ height: '30px', width: '30px', display: 'inline' }} alt="User Avatar" />
                    </a>
                  </div>
                ) : (
                  <div style={{ paddingLeft: '10px' }}>
                    <li className="nav-item text-center" style={{ paddingTop: '3px', border: '2px solid #0056d2', borderRadius: '5px', height: '45px' }}>
                      <a className="nav-link" href={NAVIGATE_TO_REGISTER} >
                        <h6 style={{ color: '#0056d2', fontWeight: 'bold' }}>Join for free</h6>
                      </a>
                    </li>
                  </div>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
