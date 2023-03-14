import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
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
      <Form onSubmit={handleSubmit}>
        <h1 className="mt-5 mb-3">{householdObj.firebaseKey ? 'Update' : 'Create'} Household</h1>

        <FloatingLabel controlId="floatingInput2" label="Household Name" className="mb-3 text-black">
          <Form.Control
            type="text"
            placeholder="Household name"
            name="householdName"
            value={formInput.householdName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button type="submit" className="blue-btn">
          {householdObj.firebaseKey ? 'Update' : 'Create'} Household
        </Button>

        <Button type="btn" className="mx-2 red-btn" onClick={() => router.back()}>Cancel</Button>

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
