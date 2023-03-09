import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getMembers } from '../api/memberData';
import MemberCard from '../components/ cards/MemberCard';

export default function ShowMembers() {
  const [members, setMembers] = useState([]);

  const getHouseholdMembers = () => {
    getMembers().then(setMembers);
  };

  useEffect(() => {
    getHouseholdMembers();
  }, []);

  return (
    <>
      <Head>
        <title>Members</title>
      </Head>
      <h1>This is the members page.</h1>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getHouseholdMembers} />
        ))}
      </div>
    </>
  );
}
