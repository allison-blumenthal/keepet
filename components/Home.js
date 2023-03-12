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
      <div>
        <h1>Welcome to Keepet!</h1>
        <h3>A place to keep your pets and people organized.</h3>
        <br />
        <h4>View my household</h4>
        <div>
          <HouseholdCard key={household.firebaseKey} householdObj={household} onUpdate={getMemberHousehold} />
        </div>
      </div>
    </>
  );
}
