import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSinglePet } from '../../../api/petData';
import PetForm from '../../../components/forms/PetForm';

export default function EditPet() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePet(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Edit Pet</title>
      </Head>
      <PetForm petObj={editItem} />
    </>
  );
}
