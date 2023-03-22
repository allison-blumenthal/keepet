/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel, Form } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ImageList, ImageListItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';
import { memberAvatars } from '../../utils/avatars';

const initialState = {
  isAdmin: false,
  memberName: '',
  memberAvatar: '',
  role: '',
  description: '',
};

function MemberForm({ memberObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (memberObj.firebaseKey) setFormInput(memberObj);
  }, [memberObj, user]);

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
        .then(() => router.back());
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateMember(patchPayload);
      }).then(() => {
        router.push('/choose');
      });
    }
  };

  return (
    <>
      <div
        className="basic-page-container text-center"
        style={{
          height: '280vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <Form onSubmit={handleSubmit}>
          <h1 className="red pc-font-md">{memberObj.firebaseKey ? 'UPDATE' : 'NEW'} MEMBER</h1>

          <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3 muller-light-xsm">
            <Form.Control
              type="text"
              placeholder="Name"
              name="memberName"
              value={formInput.memberName}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Role" className="mb-3 muller-light-xsm">
            <Form.Control
              type="text"
              placeholder="Role"
              name="role"
              value={formInput.role}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3 muller-light-xsm">
            <Form.Control
              as="textarea"
              placeholder="Description"
              style={{ height: '100px' }}
              name="description"
              value={formInput.description}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FormControl>
            <FormLabel>
              <h2 className="muller-med-sm">Choose an avatar:
              </h2>
            </FormLabel>

            <div className="image-list-container">
              <ImageList sx={{ width: 330, height: 1600 }} cols={3} rowHeight={80}>
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
                <button className="teal-btn pc-font-xsm" type="submit">UPDATE</button>
                <button type="button" className="red-btn pc-font-xsm" onClick={() => router.back()}>CANCEL</button>
              </>
            ) : (
              <>
                <button type="submit" className="red-btn pc-font-xsm">CHOOSE HOUSEHOLD</button>
              </>
            )}
          </div>
        </Form>
      </div>
    </>
  );
}

MemberForm.propTypes = {
  memberObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    householdId: PropTypes.string,
    uid: PropTypes.string,
    isAdmin: PropTypes.bool,
    memberName: PropTypes.string,
    memberAvatar: PropTypes.string,
    role: PropTypes.string,
    description: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  memberObj: initialState,
};

export default MemberForm;
