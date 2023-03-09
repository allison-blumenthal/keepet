/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ImageList, ImageListItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { createMember, getMemberByUID, updateMember } from '../../api/memberData';
import { memberAvatars } from '../../utils/avatars';

const initialState = {
  firebaseKey: '',
  householdId: '',
  uid: '',
  isAdmin: false,
  name: '',
  age: '',
  memberAvatar: '',
  role: '',
  description: '',
};

function MemberForm({ memberObj }) {
  const [formInput, setFormInput] = useState({
    ...initialState,
    uid: memberObj.uid,
  });
  const router = useRouter();
  const { setUser, uid } = useAuth();

  useEffect(() => {
    if (memberObj.firebaseKey) setFormInput(memberObj);
  }, [memberObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberObj.firebaseKey) {
      updateMember(formInput)
        .then(() => router.back);
    } else {
      const payload = { ...formInput, uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateMember(patchPayload).then(() => {
          getMemberByUID(uid)
            .then((userData) => {
              setUser(userData);
            });
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-white mt-5">{memberObj.firebaseKey ? 'Update' : 'New'} Member</h1>

        <FloatingLabel controlId="floatingInput1" label="Member's Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Member's Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Member's Age" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Member's Age"
            name="age"
            value={formInput.age}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Member's Role" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Member's Role"
            name="role"
            value={formInput.role}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: '100px' }}
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FormControl>
          <FormLabel>Choose an avatar:</FormLabel>

          <div className="image-list-container">
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              {memberAvatars.map((avatar) => (
                <RadioGroup
                  aria-labelledby="avatar-radio-buttons-group"
                  name="avatar-buttons"
                  value={formInput.memberAvatar}
                  defaultValue="1.png"
                  checked={formInput.memberAvatar}
                  onClick={(e) => {
                    setFormInput((prevState) => ({
                      ...prevState,
                      memberAvatar: e.target.value,
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
                    name="memberAvatar"
                  >
                    <img
                      src={`/assets/images/memberAvatars/${avatar}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`/assets/images/memberAvatars/${avatar}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
          {memberObj.firebaseKey ? (
            <>
              <Button className="view-btn" type="submit" onClick={() => router.back}>Update</Button>
              <Button type="btn" className="mx-2 red-btn" onClick={() => router.back()}>Cancel</Button>
            </>
          ) : (

            <>
              <Button className="view-btn" type="submit" onClick={() => router.push('/household/new')}>Create A Household</Button>
              <Button className="view-btn" type="submit" onClick={() => router.push('/')}>Join A Household</Button>
            </>
          )}
        </div>
      </Form>
    </>
  );
}

MemberForm.propTypes = {
  memberObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    householdId: PropTypes.string,
    uid: PropTypes.string,
    isAdmin: PropTypes.bool,
    name: PropTypes.string,
    age: PropTypes.string,
    memberAvatar: PropTypes.string,
    role: PropTypes.string,
    description: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  memberObj: initialState,
};

export default MemberForm;
