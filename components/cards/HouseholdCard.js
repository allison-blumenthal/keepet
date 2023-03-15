import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function HouseholdCard({ householdObj }) {
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Title>{householdObj.householdName}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

HouseholdCard.propTypes = {
  householdObj: PropTypes.shape({
    householdName: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
