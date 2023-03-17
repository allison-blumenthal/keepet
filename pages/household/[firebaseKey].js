/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
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

      <div className="household-page-container text-center">
        <h2>{householdDetails?.householdName}</h2>
        <div className="ms-5 text-center">
          {member.isAdmin === true ? (
            <Link href={`/household/edit/${member.householdId}`} passHref>
              <Button variant="info" className="edit-btn">EDIT</Button>
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
