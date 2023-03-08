import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getHouseholds } from '../api/householdData';
import HouseholdCard from '../components/ cards/HouseholdCard';

export default function Households() {
  const [households, setHouseholds] = useState([]);
  const { user } = useAuth();

  const displayHouseholds = () => {
    getHouseholds(user.uid).then(setHouseholds);
  };

  useEffect(() => {
    displayHouseholds();
  }, [user]);

  return (
    <>
      <Head>
        <title>Choose Household</title>
      </Head>
      <h1>Choose a household</h1>
      <div className="household-card-container">
        {households.map((household) => (
          <HouseholdCard key={household.firebaseKey} householdObj={household} onUpdate={displayHouseholds} />
        ))}
      </div>
    </>
  );
}
