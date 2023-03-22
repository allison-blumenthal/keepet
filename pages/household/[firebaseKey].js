/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getSingleHousehold } from '../../api/householdData';
import members from '../../src/assets/images/members.png';
import pets from '../../src/assets/images/pets.png';
import tasks from '../../src/assets/images/tasks.png';
import { getMemberByUID } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';
import NavBar from '../../components/NavBar';

function ViewHousehold() {
  const [member, setMember] = useState({});
  const [householdDetails, setHouseholdDetails] = useState([]);
  const { user } = useAuth();

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  const getHouseholdDetails = () => {
    getSingleHousehold(member.householdId).then(setHouseholdDetails);
  };

  useEffect(() => {
    getMemberInfo();
    getHouseholdDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, member]);

  return (
    <>
      <Head>
        <title>{householdDetails?.householdName}</title>
      </Head>
      <NavBar />
      <div
        className="basic-page-container text-center"
        style={{
          height: '120vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h2 className="pc-font-md purple">{householdDetails?.householdName}</h2>
        <div style={{ maxHeiht: '15px' }}>
          {member.isAdmin === true ? (
            <Link href={`/household/edit/${member.householdId}`} passHref>
              <button type="button" className="edit-btn pc-font-xsm">EDIT
              </button>
            </Link>
          ) : ''}
        </div>
        <Link passHref href="/members">
          <Image className="household-menu-img" src={members} alt="Members" />
        </Link>
        <Link passHref href="/pets">
          <Image className="household-menu-img" src={pets} alt="Pets" />
        </Link>
        <Link passHref href="/tasks">
          <Image className="household-menu-img" src={tasks} alt="Tasks" />
        </Link>
      </div>
    </>
  );
}

export default ViewHousehold;
