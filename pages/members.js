import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getMemberByUID, getMembersByHouseholdId } from '../api/memberData';
import MemberCard from '../components/ cards/MemberCard';
import { useAuth } from '../utils/context/authContext';

export default function ShowMembers() {
  // eslint-disable-next-line no-unused-vars
  const [member, setMember] = useState({});
  const [householdMembers, setHouseholdMembers] = useState([]);
  const { user } = useAuth();

  const getHouseholdMembers = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
      getMembersByHouseholdId(memberObj[0].householdId).then(setHouseholdMembers);
    });
  };

  useEffect(() => {
    getHouseholdMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>Members</title>
      </Head>
      <h1>This is the members page.</h1>
      <div className="d-flex flex-wrap">
        {householdMembers.map((householdMember) => (
          <MemberCard key={householdMember.firebaseKey} memberObj={householdMember} onUpdate={getHouseholdMembers} />
        ))}
      </div>
    </>
  );
}
