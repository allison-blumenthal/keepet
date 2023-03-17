import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getHouseholds } from '../../api/householdData';
import { useAuth } from '../../utils/context/authContext';
import { getMemberByUID, updateMember } from '../../api/memberData';

const initialState = {
  householdId: '',
};

function JoinHouseholdForm({ memberObj }) {
  const [households, setHouseholds] = useState([]);
  const [member, setMember] = useState({});
  const [formInput, setFormInput] = useState({
    ...initialState,
    uid: memberObj.uid,
  });
  const router = useRouter();
  const { user } = useAuth();

  const displayHouseholds = () => {
    getHouseholds().then(setHouseholds);
  };

  useEffect(() => {
    displayHouseholds();
    getMemberByUID(user.uid).then((memberInfo) => {
      setMember(memberInfo[0]);
    });

    if (memberObj.firebaseKey) setFormInput(memberObj);
  }, [user, memberObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { householdId: formInput.householdId, firebaseKey: member.firebaseKey };
    updateMember(payload)
      .then(() => {
        router.push(`/household/${member.householdId}`);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <FloatingLabel controlId="floatingSelect" label="Household">
          <Form.Select
            aria-label="Household"
            name="householdId"
            onChange={handleChange}
            className="mb-3"
            value={formInput.householdId}
            required
          >
            <option value="">Select a household:</option>
            {
            households.map((household) => (
              <option
                key={household.firebaseKey}
                value={household.firebaseKey}
              >
                {household.householdName}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>

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
