import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { updateHousehold } from '../../api/householdData';
import { useAuth } from '../../utils/context/authContext';
import createHouseholdAndUpdateMember from '../../api/mergedData';

const initialState = {
  householdName: '',
};

function CreateEditHouseholdForm({ householdObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (householdObj.firebaseKey) setFormInput(householdObj);
  }, [householdObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (householdObj.firebaseKey) {
      updateHousehold(formInput)
        .then(() => {
          router.push(`/household/${householdObj.firebaseKey}`);
        });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createHouseholdAndUpdateMember(payload)
        .then((response) => {
          router.push(`/household/${response.householdId}`);
        });
    }
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
        <h1 className="purple pc-font-md">{householdObj.firebaseKey ? 'UPDATE' : 'CREATE'} HOUSEHOLD</h1>

        <FloatingLabel controlId="floatingInput1" label="Household Name" className="mb-3 muller-light-xsm">
          <Form.Control
            className="muller-reg-sm"
            type="text"
            placeholder="Household name"
            name="householdName"
            value={formInput.householdName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <button type="submit" className="teal-btn pc-font-xsm">
          {householdObj.firebaseKey ? 'UPDATE' : 'CREATE'} HOUSEHOLD
        </button>
        <button type="button" className="red-btn pc-font-xsm" onClick={() => router.back()}>CANCEL</button>

      </Form>
    </>
  );
}

CreateEditHouseholdForm.propTypes = {
  householdObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    householdName: PropTypes.string,
    uid: PropTypes.string,
  }),
};

CreateEditHouseholdForm.defaultProps = {
  householdObj: initialState,
};

export default CreateEditHouseholdForm;
