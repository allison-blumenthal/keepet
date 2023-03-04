import { Button } from 'react-bootstrap';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getHouseholds } from '../api/householdData';
import HouseholdCard from '../components/forms/HouseholdCard';

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
      <h1>Hello {user.displayName}! </h1>
      <p>Choose your household, or create a new one</p>
      <div className="household-card-container">{households.map((household) => (
        <HouseholdCard key={household.firebaseKey} householdObj={household} onUpdate={displayHouseholds} />
      ))}
      </div>
      <div>
        <Link passHref href="/household/new">
          <Button className="create-household-btn" variant="success">Create Household</Button>
        </Link>
      </div>
    </>
  );
}
