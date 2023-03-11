import React from 'react';
import Head from 'next/head';
import PetForm from '../../components/forms/PetForm';

export default function AddPet() {
  return (
    <>
      <Head>
        <title>New Pet</title>
      </Head>
      <div>
        <PetForm />
      </div>
    </>
  );
}
