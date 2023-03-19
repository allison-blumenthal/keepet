import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';
import TransparentBylineLogo from './logos/TransparentBylineLogo';

function Signin() {
  return (
    <>
      <div className="gradient-background">
        <div
          className="text-center d-flex flex-column justify-content-center align-content-center"
          style={{
            height: '90vh',
            padding: '30px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <TransparentBylineLogo />
          <Button type="btn" className="red-btn pc-font-sm" onClick={signIn}>
            Login
          </Button>
        </div>
        <div
          className="text-center d-flex flex-column justify-content-center align-content-center"
          style={{
            height: '10vh',
            padding: '30px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <h6 className="muller-light-xsm" style={{ color: 'white' }}>This app was inspired by and is dedicated to my sweet seven kitties and three-legged pittie.</h6>
        </div>
      </div>
    </>
  );
}

export default Signin;
