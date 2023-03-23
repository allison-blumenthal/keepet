import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, FloatingLabel } from 'react-bootstrap';
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
      .then((response) => {
        router.push(`/household/${response.householdId}`);
      });
  };

  return (
    <>
      <Form
        className="text-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
        onSubmit={handleSubmit}
      >

        <FloatingLabel className="muller-light-xsm" controlId="floatingSelect" label="Household">
          <Form.Select
            aria-label="Household"
            name="householdId"
            onChange={handleChange}
            className="mb-3 muller-light-xsm"
            value={formInput.householdId}
            size="sm"
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
        <button className="teal-btn pc-font-sm" type="submit">JOIN HOUSEHOLD</button>
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
