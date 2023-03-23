/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  ImageList, ImageListItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';
import { getMemberByUID, getMembersByHouseholdId } from '../../api/memberData';
import { updateTask, createTask } from '../../api/taskData';
import { useAuth } from '../../utils/context/authContext';
import { getPetsByHouseholdId } from '../../api/petData';
import { taskAvatars } from '../../utils/avatars';

const initialState = {
  firebaseKey: '',
  memberId: '',
  petId: '',
  householdId: '',
  title: '',
  location: '',
  taskDescription: '',
  timeOfDay: '',
  due: '',
  lastDone: '',
  taskAvatar: '',
};

export default function TaskForm({ taskObj }) {
  // eslint-disable-next-line no-unused-vars
  const [member, setMember] = useState({});
  const [householdPets, setHouseholdPets] = useState([]);
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [formInput, setFormInput] = useState({
    ...initialState,
    uid: taskObj.uid,
  });
  const router = useRouter();
  const { user } = useAuth();

  const getWholeHousehold = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
      getPetsByHouseholdId(memberObj[0].householdId)
        .then((petArr) => {
          setHouseholdPets(petArr);
          getMembersByHouseholdId(memberObj[0].householdId)
            .then((memberArr) => {
              setHouseholdMembers(memberArr);
            });
        });
    });
  };

  useEffect(() => {
    getWholeHousehold();

    if (taskObj.firebaseKey) setFormInput(taskObj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, taskObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskObj.firebaseKey) {
      updateTask(formInput)
        .then(() => router.push(`/task/${taskObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, householdId: member.householdId };
      createTask(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        console.warn(patchPayload);

        updateTask(patchPayload);
      }).then(() => {
        router.push('/tasks');
      });
    }
  };

  return (
    <>
      <div className="basic-page-container text-center">
        <Form onSubmit={handleSubmit}>
          <h1 className="lime pc-font-md">{taskObj.firebaseKey ? 'UPDATE' : 'NEW'} Task</h1>

          <FloatingLabel controlId="floatingInput1" label="Task Title" className="mb-3 muller-light-xsm">
            <Form.Control
              type="text"
              placeholder="Task Title"
              name="title"
              value={formInput.title}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel className="muller-light-xsm" controlId="floatingSelect1" label="Pet">
            <Form.Select
              aria-label="Pet"
              name="petId"
              onChange={handleChange}
              className="mb-3 muller-light-xsm"
              value={formInput.petId}
            >
              <option value="">Which pet is this task for?</option>
              {
            householdPets.map((householdPet) => (
              <option
                key={householdPet.firebaseKey}
                value={householdPet.firebaseKey}
              >
                {householdPet.petName}
              </option>
            ))
          }
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel className="muller-light-xsm" controlId="floatingSelect2" label="Time of Day">
            <Form.Select
              aria-label="Time of Day"
              name="timeOfDay"
              onChange={handleChange}
              className="mb-3 muller-light-xsm"
              value={formInput.timeOfDay}
            >
              <option value="">Select the task time of day</option>
              <option value="Breakfast time">Breakfast time</option>
              <option value="Lunch time">Lunch time</option>
              <option value="Dinner time">Dinner time</option>
              <option value="Bed time">Bed time</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Task Location" className="mb-3 muller-light-xsm">
            <Form.Control
              type="text"
              placeholder="Task Location"
              name="location"
              value={formInput.location}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea" label="Task Description" className="mb-3 muller-light-xsm">
            <Form.Control
              as="textarea"
              placeholder="Description"
              style={{ height: '100px' }}
              name="taskDescription"
              value={formInput.taskDescription}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="When is this task due? (Daily, Weekly...)" className="mb-3 muller-light-xsm">
            <Form.Control
              type="text"
              placeholder="When is task due? (e.g., Daily, Tuesdays, Every other day, etc."
              name="due"
              value={formInput.due}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel className="muller-light-xsm" controlId="floatingSelect3" label="Member">
            <Form.Select
              aria-label="Member"
              name="memberId"
              onChange={handleChange}
              className="mb-3 muller-light-xsm"
              value={formInput.memberId}
              required
            >
              <option value="">Who is this task assigned to?</option>
              {
            householdMembers.map((householdMember) => (
              <option
                key={householdMember.uid}
                value={householdMember.uid}
              >
                {householdMember.memberName}
              </option>
            ))
          }
            </Form.Select>
          </FloatingLabel>

          <FormControl>
            <FormLabel>
              <h2 className="muller-med-sm">Choose a task avatar:
              </h2>
            </FormLabel>

            <div className="image-list-container">
              <ImageList sx={{ width: 330, height: 1400 }} cols={3} rowHeight={80}>
                {taskAvatars.map((avatar) => (
                  <RadioGroup
                    aria-labelledby="avatar-radio-buttons-group"
                    name="taskAvatar"
                    value={formInput.taskAvatar}
                    defaultValue="1.png"
                    checked={formInput.taskAvatar}
                    onClick={(e) => {
                      setFormInput((prevState) => ({
                        ...prevState,
                        taskAvatar: e.target.value,
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
                      name="taskAvatar"
                    >
                      <img
                        src={`/assets/images/taskAvatars/${avatar}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`/assets/images/taskAvatars/${avatar}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
            <button className="teal-btn pc-font-xsm" type="submit">{taskObj.firebaseKey ? 'UPDATE' : 'ADD'} TASK</button>
            <button type="button" className="red-btn pc-font-xsm" onClick={() => router.back()}>CANCEL</button>
          </div>
        </Form>
      </div>
    </>
  );
}

TaskForm.propTypes = {
  taskObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    memberId: PropTypes.string,
    petId: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
    taskDescription: PropTypes.string,
    timeOfDay: PropTypes.string,
    due: PropTypes.string,
    taskAvatar: PropTypes.string,
    uid: PropTypes.string,
    householdId: PropTypes.string,
  }),
};

TaskForm.defaultProps = {
  taskObj: initialState,
};
