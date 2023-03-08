import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { updateMemberHouseholdId } from '../../api/mergedData';

export default function HouseholdCard({ householdObj }) {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = (householdObj.firebaseKey);
    updateMemberHouseholdId(payload)
      .then((response) => {
        router.push(`/household/${response.householdId}`);
      });
  };

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Img variant="top" src={householdObj.imageUrl} alt="Household Image" style={{ height: '200px' }} />
          <Card.Title>{householdObj.nickname}</Card.Title>
          <Link href={`/household/${householdObj.firebaseKey}`} passHref>
            <Button variant="primary" className="view-btn" onClick={handleSubmit}>Join</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

HouseholdCard.propTypes = {
  householdObj: PropTypes.shape({
    nickname: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  memberObj: PropTypes.shape({
    householdId: PropTypes.string,
  }).isRequired,
};
