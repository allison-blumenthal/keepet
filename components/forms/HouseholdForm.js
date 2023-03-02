import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel, { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createHousehold, updateHousehold } from '../../api/householdData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  firebaseKey: '',
  nickname: '',
};

export default function HouseholdForm() {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      uid: user.uid,
    };
    createHousehold(payload)
      .then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateHousehold(patchPayload)
          .then(() => {
            router.push('/');
          });
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 className="mt-5 mb-3">Create Household</h1>

        <FloatingLabel controlId="floatingInput2" label="Household Nickname" className="mb-3 text-black">
          <Form.Control
            type="text"
            name="nickname"
            value={formInput.nickname}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button type="submit" className="blue-btn">Create Household</Button>
        <Button type="btn" className="mx-2 red-btn" onClick={() => router.back()}>Cancel</Button>

      </Form>
    </>
  );
}

HouseholdForm.propTypes = {
  householdObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    nickname: PropTypes.string,
  }),
};

HouseholdForm.defaultProps = {
  householdObj: initialState,
};
