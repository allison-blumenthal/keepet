import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getMemberByUID } from '../api/memberData';
import { getPetsByHouseholdId } from '../api/petData';
import { useAuth } from '../utils/context/authContext';
import PetCard from '../components/cards/PetCard';
import add from '../src/assets/images/add-icon.png';

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
      <div
        className="basic-page-container text-center"
        style={{
          height: '120vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1 className="orange pc-font-md">PETS</h1>
        <button type="button" className="add-btn" onClick={() => router.push('/pet/new')}>
          <Image src={add} alt="add pet icon" />
        </button>
        <div className="d-flex flex-wrap">
          {householdPets.map((householdPet) => (
            <PetCard key={householdPet.firebaseKey} petObj={householdPet} onUpdate={getHouseholdPets} />
          ))}
        </div>
      </div>
    </>
  );
}
