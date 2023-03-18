import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getSingleHousehold } from '../api/householdData';
import { getMemberByUID } from '../api/memberData';
import HouseholdCard from './cards/HouseholdCard';
import { useAuth } from '../utils/context/authContext';

export default function Home() {
  const [member, setMember] = useState({});
  const [household, setHousehold] = useState({});
  const { user } = useAuth();

  const getMemberHousehold = () => {
    getMemberByUID(user.uid).then(setMember);
    getSingleHousehold(member[0].householdId).then(setHousehold);
  };

  useEffect(() => {
    getMemberHousehold();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Welcome to Keepet!</h1>

        <br />
        <h4>View my household</h4>
        <div>
          <HouseholdCard key={household.firebaseKey} householdObj={household} onUpdate={getMemberHousehold} />
        </div>
      </div>
    </>
  );
}
