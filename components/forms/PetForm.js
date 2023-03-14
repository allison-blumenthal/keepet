/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import {
  ImageList, ImageListItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { petAvatars } from '../../utils/avatars';
import { createPet, updatePet } from '../../api/petData';
import { getMemberByUID } from '../../api/memberData';

const initialState = {
  firebaseKey: '',
  householdId: '',
  memberId: '',
  petName: '',
  species: '',
  petAge: '',
  color: '',
  info: '',
  petAvatar: '',
};

function PetForm({ petObj }) {
  const [member, setMember] = useState({});
  const [formInput, setFormInput] = useState({
    ...initialState,
    uid: petObj.memberId,
  });
  const router = useRouter();
  const { uid } = useAuth();

  const getMemberInfo = () => {
    getMemberByUID(uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  useEffect(() => {
    getMemberInfo();
    if (petObj.firebaseKey) setFormInput(petObj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, petObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (petObj.firebaseKey) {
      updatePet(formInput)
        .then(() => router.push(`/pet/${petObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid, householdId: member.householdId };
      createPet(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updatePet(patchPayload);
      }).then(() => {
        router.push('/pets');
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-white mt-5">{petObj.firebaseKey ? 'Update' : 'New'} Pet</h1>

        <FloatingLabel controlId="floatingInput1" label="Pet's Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Pet's Name"
            name="petName"
            value={formInput.petName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Pet's Species" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Pet's Species"
            name="species"
            value={formInput.species}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Pet's Age" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Pet's Age"
            name="petAge"
            value={formInput.petAge}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Pet Color" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Pet Color"
            name="color"
            value={formInput.color}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea" label="Info" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: '100px' }}
            name="info"
            value={formInput.info}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FormControl>
          <FormLabel>Choose a pet avatar:</FormLabel>

          <div className="image-list-container">
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              {petAvatars.map((avatar) => (
                <RadioGroup
                  aria-labelledby="avatar-radio-buttons-group"
                  name="pet-avatar-buttons"
                  value={formInput.petAvatar}
                  defaultValue="1.png"
                  checked={formInput.petAvatar}
                  onClick={(e) => {
                    setFormInput((prevState) => ({
                      ...prevState,
                      petAvatar: e.target.value,
                    }));
                  }}
                  required
                >
                  <FormControlLabel
                    value={avatar}
                    control={<Radio />}
                    label=""
                  />
                  <ImageListItem
                    key={avatar}
                    name="petAvatar"
                  >
                    <img
                      src={`/assets/images/petAvatars/${avatar}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`/assets/images/petAvatars/${avatar}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={`avatar ${avatar}`}
                      loading="lazy"
                    />
                  </ImageListItem>
                </RadioGroup>
              ))}
            </ImageList>
          </div>

        </FormControl>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '80px',
          }}
        >
          <Button className="view-btn" type="submit">{petObj.firebaseKey ? 'Update' : 'Add'} Pet</Button>
          <Button type="btn" className="mx-2 red-btn" onClick={() => router.back()}>Cancel</Button>
        </div>
      </Form>
    </>
  );
}

PetForm.propTypes = {
  petObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    householdId: PropTypes.string,
    memberId: PropTypes.string,
    petName: PropTypes.string,
    species: PropTypes.string,
    petAge: PropTypes.string,
    color: PropTypes.string,
    info: PropTypes.string,
    petAvatar: PropTypes.string,
  }),
};

PetForm.defaultProps = {
  petObj: initialState,
};

export default PetForm;
