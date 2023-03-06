import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function HouseholdCard({ householdObj }) {
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Title>{householdObj.nickname}</Card.Title>
          <Link href={`/household/${householdObj.firebaseKey}`} passHref>
            <Button variant="primary" className="view-btn">Select</Button>
          </Link>
          <Link href={`/household/edit/${householdObj.firebaseKey}`} passHref>
            <Button variant="warning" className="edit-btn">EDIT</Button>
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
  }).isRequired,
};
