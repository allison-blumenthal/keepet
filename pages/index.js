import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getMemberByUID } from '../api/memberData';

export default function Index() {
  const [member, setMember] = useState({});
  const router = useRouter();
  const { uid } = useAuth();

  useEffect(() => {
    getMemberByUID(uid).then(setMember);
  }, [uid]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <Button type="btn" className="mx-2 primary" onClick={() => router.push(`/household/${member[0].householdId}`)}>Go to My Household</Button>
      </div>
    </>
  );
}
