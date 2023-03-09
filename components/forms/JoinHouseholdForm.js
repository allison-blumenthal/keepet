import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { updateMemberHouseholdId } from '../../api/mergedData';
import HouseholdCard from '../ cards/HouseholdCard';
import { getHouseholds } from '../../api/householdData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  householdId: '',
  uid: '',
};

function JoinHouseholdForm({ memberObj }) {
  const [households, setHouseholds] = useState([]);
  const [formInput, setFormInput] = useState({
    ...initialState,
    uid: memberObj.uid,
  });
  const router = useRouter();
  const { uid } = useAuth();

  const displayHouseholds = () => {
    getHouseholds().then(setHouseholds);
  };

  useEffect(() => {
    displayHouseholds();
    if (memberObj.firebaseKey) setFormInput(memberObj);
  }, [memberObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid };
    updateMemberHouseholdId(payload)
      .then((response) => {
        router.push(`/household/${response.householdId}`);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="household-radios">
          {households.map((household) => (
            <>
              <Form.Check
                type="radio"
                name="household-radio-btn"
                label={household.householdName}
                value={formInput.householdId}
                checked={formInput.householdId}
                onChange={(e) => {
                  setFormInput((prevState) => ({
                    ...prevState,
                    householdId: e.target.checked,
                  }));
                }}
                required
              />
              <HouseholdCard key={household.firebaseKey} householdObj={household} onUpdate={displayHouseholds} />
            </>
          ))}
        </Form.Group>
        <Button type="submit">Join Selected Household</Button>
      </Form>
    </>
  );
}

JoinHouseholdForm.propTypes = {
  memberObj: PropTypes.shape({
    householdId: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

JoinHouseholdForm.defaultProps = {
  memberObj: initialState,
};

export default JoinHouseholdForm;
