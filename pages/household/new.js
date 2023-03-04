import React from 'react';
import Head from 'next/head';
import HouseholdForm from '../../components/forms/HouseholdForm';

export default function AddHousehold() {
  return (
    <>
      <Head>
        <title>New Household</title>
      </Head>
      <div>
        <HouseholdForm />
      </div>
    </>
  );
}
