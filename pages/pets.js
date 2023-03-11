import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getMemberByUID } from '../api/memberData';
import { getPetsByHouseholdId } from '../api/petData';
import { useAuth } from '../utils/context/authContext';
import PetCard from '../components/cards/PetCard';

export default function ShowPets() {
  // eslint-disable-next-line no-unused-vars
  const [member, setMember] = useState({});
  const [householdPets, setHouseholdPets] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getHouseholdPets = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
      getPetsByHouseholdId(memberObj[0].householdId).then((petArr) => {
        setHouseholdPets(petArr);
      });
    });
  };

  useEffect(() => {
    getHouseholdPets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>Pets</title>
      </Head>
      <h1>This is the pets page.</h1>
      <Button type="btn" className="mx-2 red-btn" onClick={() => router.push('/pet/new')}>Add a Pet</Button>
      <div className="d-flex flex-wrap">
        {householdPets.map((householdPet) => (
          <PetCard key={householdPet.firebaseKey} petObj={householdPet} onUpdate={getHouseholdPets} />
        ))}
      </div>
    </>
  );
}
