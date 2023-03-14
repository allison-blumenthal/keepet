import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getMemberByUID } from '../api/memberData';

export default function Index() {
  const [member, setMember] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getMemberByUID(user.uid).then(setMember[0]);
  }, [user]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Welcome to Keepet!</h1>
      <h3>A place to keep your pets and people organized.</h3>

      {member.firebaseKey ? (
        <div>
          <Button type="btn" className="mx-2 primary" onClick={() => router.push(`/household/${member.householdId}`)}>Go to My Household</Button>
        </div>
      ) : (
        <div>
          <Button type="btn" className="mx-2 primary" onClick={() => router.push('/member/new')}>Get Started</Button>
        </div>
      ) }
    </>
  );
}
