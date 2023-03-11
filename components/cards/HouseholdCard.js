import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function HouseholdCard({ householdObj }) {
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Img variant="top" src={householdObj.imageUrl} alt="Household Image" style={{ height: '200px' }} />
          <Card.Title>{householdObj.nickname}</Card.Title>
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
};
