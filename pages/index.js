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

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      if (memberObj.length === 1) {
        setMember(memberObj[0]);
      } else {
        setMember(null);
      }
    });
  };

  useEffect(() => {
    getMemberInfo();
  }, [user, member]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Welcome to Keepet!</h1>
      <h3>A place to keep your pets and people organized.</h3>

      {member ? (
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
