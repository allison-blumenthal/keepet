import React from 'react';
import Image from 'next/image';
import logo from '../../src/assets/images/logo-byline-transp.png';

export default function TransparentBylineLogo() {
  return (
    <>
      <Image src={logo} alt="Logo" />
    </>
  );
}
