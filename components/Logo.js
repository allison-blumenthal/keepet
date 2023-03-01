import React from 'react';
import Image from 'next/image';
import logo from '../src/assets/images/logo_transparent.png';

export default function Logo() {
  return (
    <>
      <Image src={logo} alt="Logo" />
    </>
  );
}
