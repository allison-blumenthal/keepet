/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { getSingleHousehold } from '../../api/householdData';
import members from '../../src/assets/images/members.png';
import pets from '../../src/assets/images/pets.png';
import tasks from '../../src/assets/images/tasks.png';
import { getMemberByUID } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';

function ViewHousehold() {
  const [member, setMember] = useState({});
  const [householdDetails, setHouseholdDetails] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  const getHouseholdDetails = () => {
    getSingleHousehold(firebaseKey).then(setHouseholdDetails);
  };

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  useEffect(() => {
    getMemberInfo();
    getHouseholdDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{householdDetails?.householdName}</title>
      </Head>
      <h1>Welcome to Keepet!</h1>
      <h3>A place to keep your pets and people organized.</h3>

      <div className="text-black ms-5 details">
        <h2>Your household:
          {householdDetails?.householdName}
        </h2>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src={householdDetails?.imageUrl} alt={householdDetails?.householdName} style={{ width: '300px' }} />
      </div>
      {member.isAdmin === true ? (
        <Link href={`/household/edit/${firebaseKey}`} passHref>
          <Button variant="info" className="edit-btn">EDIT</Button>
        </Link>
      ) : ''}
      <Link passHref href="/members">
        <Image src={members} alt="Members" />
      </Link>
      <Link passHref href="/pets">
        <Image src={pets} alt="Pets" />
      </Link>
      <Link passHref href="/tasks">
        <Image src={tasks} alt="Tasks" />
      </Link>
    </>
  );
}

export default ViewHousehold;
