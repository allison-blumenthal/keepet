import React from 'react';
import Image from 'next/image';
import logo from '../../src/assets/images/logo-transp.png';

export default function TransparentLogo() {
  return (
    <>
      <Image src={logo} alt="Logo" />
    </>
  );
}
