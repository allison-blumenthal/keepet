import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createHousehold, getSingleHousehold, updateHousehold } from '../../api/householdData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  householdName: '',
  imageUrl: '',
};

function HouseholdForm({ householdObj }) {
  const [formInput, setFormInput] = useState({
    ...initialState,
    uid: householdObj.uid,
  });
  const router = useRouter();
  const { uid } = useAuth();

  useEffect(() => {
    if (householdObj.firebaseKey) setFormInput(householdObj);
  }, [householdObj]);

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
        .then(() => router.back);
    } else {
      const payload = { ...formInput, uid };
      createHousehold(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateHousehold(patchPayload).then(() => {
          getSingleHousehold(householdObj.firebaseKey);
        });
      }).then(() => {
        router.push(`/household/${householdObj.firebaseKey}`);
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 className="mt-5 mb-3">Create Household</h1>

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

        <FloatingLabel controlId="floatingInput2" label="Household Image" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Image url"
            name="imageUrl"
            value={formInput.imageUrl}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button type="submit" className="blue-btn" onClick={() => router.push(`/household/${householdObj.firebaseKey}`)}>
          {householdObj.firebaseKey ? 'Update' : 'Create'} Household
        </Button>

        <Button type="btn" className="mx-2 red-btn" onClick={() => router.back()}>Cancel</Button>

      </Form>
    </>
  );
}

HouseholdForm.propTypes = {
  householdObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    householdName: PropTypes.string,
    imageUrl: PropTypes.string,
    uid: PropTypes.string,
  }),
};

HouseholdForm.defaultProps = {
  householdObj: initialState,
};

export default HouseholdForm;
