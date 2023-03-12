/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleMember, getMemberByUID } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewMember() {
  const [member, setMember] = useState({});
  const [memberDetails, setMemberDetails] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  useEffect(() => {
    getMemberInfo();
    getSingleMember(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{memberDetails?.title}</title>
      </Head>
      {(memberDetails.uid === member.uid) || (member.isAdmin === true) ? (
        <>
          <Link href={`/member/edit/${firebaseKey}`} passHref>
            <Button variant="info" className="edit-btn">EDIT</Button>
          </Link>
        </>
      ) : ''}
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={`/assets/images/memberAvatars/${memberDetails.memberAvatar}`} alt={memberDetails.memberName} style={{ width: '300px' }} />
        </div>
        <div className="text-black ms-5 details">
          <h2>{memberDetails.memberName}</h2>
          <h3>{memberDetails.role}</h3>
          <h3>{memberDetails.memberAge}</h3>
          <p>{memberDetails.description}</p>
        </div>
      </div>
    </>
  );
}
