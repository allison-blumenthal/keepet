import React from 'react';
import { signIn } from '../utils/auth';
import TransparentBylineLogo from './logos/TransparentBylineLogo';

function Signin() {
  return (
    <>
      <div className="gradient-background1">
        <div
          className="text-center d-flex flex-column justify-content-center align-content-center"
          style={{
            height: '100vh',
            padding: '30px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <TransparentBylineLogo />
          <button type="button" className="login-btn pc-font-sm" onClick={signIn}>
            LOGIN
          </button>
          <h6 className="muller-light-xsm" style={{ color: 'white', padding: '30px' }}>This app is inspired by and dedicated to my sweet seven kitties and <br />three-legged pittie.</h6>
        </div>
      </div>
    </>
  );
}

export default Signin;
