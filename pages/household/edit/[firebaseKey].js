import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getSingleHousehold } from '../../../api/householdData';
import CreateEditHouseholdForm from '../../../components/forms/CreateEditHouseholdForm';

export default function EditHousehold() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleHousehold(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Edit Household</title>
      </Head>
      <CreateEditHouseholdForm householdObj={editItem} />
    </>
  );
}
