import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getMemberByUID } from '../api/memberData';
import { signOut } from '../utils/auth';
import NavBar from '../components/NavBar';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, member]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <NavBar />
      <div
        className="basic-page-container text-center"
      >
        <h1 className="pc-font-md purple">Welcome to<br /> KEEPET!</h1>

        {member ? (
          <div>
            <button type="button" className="teal-btn pc-font-sm" onClick={() => router.push(`/household/${member.householdId}`)}>MY HOUSEHOLD</button>
          </div>
        ) : (
          <div>
            <button type="button" className="teal-btn pc-font-sm" onClick={() => router.push('/member/new')}>GET STARTED</button>
          </div>
        ) }
        <div>
          <button
            type="button"
            className="logout-btn pc-font-xsm"
            onClick={signOut}
          >LOGOUT
          </button>
        </div>
      </div>
    </>
  );
}
