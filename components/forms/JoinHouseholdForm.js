import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import HouseholdCard from '../ cards/HouseholdCard';
import { getHouseholds } from '../../api/householdData';
import { useAuth } from '../../utils/context/authContext';
import { getMemberByUID, updateMember } from '../../api/memberData';

const initialState = {
  householdId: '',
  uid: '',
};

function JoinHouseholdForm({ memberObj }) {
  const [households, setHouseholds] = useState([]);
  const [member, setMember] = useState({});
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
    getMemberByUID(uid).then(setMember);

    if (memberObj.firebaseKey) setFormInput(memberObj);
  }, [uid, memberObj]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { householdId: formInput.householdId, firebaseKey: member[0].firebaseKey };
    updateMember(payload)
      .then(() => {
        router.push(`/household/${member[0].householdId}`);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="household-card-container">
          {households.map((household) => (
            <>
              <Form.Group controlId="household-radios">
                <Form.Check
                  type="radio"
                  name="household-radio-btn"
                  label={household.householdName}
                  value={formInput.householdId}
                  checked={formInput.householdId}
                  onChange={() => {
                    setFormInput((prevState) => ({
                      ...prevState,
                      householdId: (household.firebaseKey),
                    }));
                  }}
                  required
                />
                <HouseholdCard key={household.firebaseKey} householdObj={household} onUpdate={displayHouseholds} />
              </Form.Group>
            </>
          ))}
        </div>
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
