import React from 'react';
import Head from 'next/head';
import CreateEditHouseholdForm from '../../components/forms/CreateEditHouseholdForm';

export default function CreateHousehold() {
  return (
    <>
      <Head>
        <title>Create Household</title>
      </Head>
      <div>
        <CreateEditHouseholdForm />
      </div>
    </>
  );
}
