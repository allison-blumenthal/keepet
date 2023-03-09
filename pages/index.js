import React from 'react';
import Head from 'next/head';
import JoinHouseholdForm from '../components/forms/JoinHouseholdForm';

export default function JoinHousehold() {
  return (
    <>
      <Head>
        <title>Join Household</title>
      </Head>
      <div>
        <JoinHouseholdForm />
      </div>
    </>
  );
}
