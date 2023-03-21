/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Form, FloatingLabel } from 'react-bootstrap';
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
  const { user } = useAuth();

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  useEffect(() => {
    getMemberInfo();
    if (petObj.firebaseKey) setFormInput(petObj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, petObj]);

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
      const payload = {
        ...formInput, uid: user.uid, householdId: member.householdId, memberId: member.firebaseKey,
      };
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
      <div
        className="basic-page-container text-center"
        style={{
          height: '160vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <Form onSubmit={handleSubmit}>
          <h1 className="orange pc-font-md">{petObj.firebaseKey ? 'UPDATE' : 'NEW'} PET</h1>

          <FloatingLabel controlId="floatingInput1" label="Pet's Name" className="mb-3 muller-light-xsm">
            <Form.Control
              type="text"
              placeholder="Pet's Name"
              name="petName"
              value={formInput.petName}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Pet's Species" className="mb-3 muller-light-xsm">
            <Form.Control
              type="text"
              placeholder="Pet's Species"
              name="species"
              value={formInput.species}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Pet's Age" className="mb-3 muller-light-xsm">
            <Form.Control
              type="text"
              placeholder="Pet's Age"
              name="petAge"
              value={formInput.petAge}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput4" label="Pet Color" className="mb-3 muller-light-xsm">
            <Form.Control
              type="text"
              placeholder="Pet Color"
              name="color"
              value={formInput.color}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea" label="Info" className="mb-3 muller-light-xsm">
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
            <FormLabel>
              <h2 className="muller-med-sm">Choose an avatar:</h2>
            </FormLabel>

            <div className="image-list-container">
              <ImageList sx={{ width: 330, height: 650 }} cols={3} rowHeight={80}>
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
            <button className="teal-btn pc-font-xsm" type="submit">{petObj.firebaseKey ? 'UPDATE' : 'ADD'} PET</button>
            <button type="button" className="red-btn pc-font-xsm" onClick={() => router.back()}>CANCEL</button>
          </div>
        </Form>
      </div>
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
