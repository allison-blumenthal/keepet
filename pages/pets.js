import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getMemberByUID } from '../api/memberData';
import { getPetsByHouseholdId } from '../api/petData';
import { useAuth } from '../utils/context/authContext';
import PetCard from '../components/cards/PetCard';
import add from '../src/assets/images/add-icon.png';
import NavBar from '../components/NavBar';

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
      <NavBar />
      <div className="basic-page-container text-center">
        <h1 className="orange pc-font-md">PETS</h1>
        <div className="task-btn-container">
          <button type="button" className="add-btn pc-font-xsm" onClick={() => router.push('/pet/new')}>
            <Image src={add} alt="add pet icon" height="30px" width="30px" />
            ADD A PET
          </button>
        </div>
        <div className="d-flex flex-wrap">
          {householdPets.map((householdPet) => (
            <PetCard key={householdPet.firebaseKey} petObj={householdPet} onUpdate={getHouseholdPets} />
          ))}
        </div>
      </div>
    </>
  );
}
