import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../api/commentData';
import { getMemberByUID } from '../../api/memberData';

const initialState = {
  firebaseKey: '',
  taskId: '',
  memberId: '',
  timestamp: '',
  text: '',
  author: '',
};

export default function CommentForm({ taskFirebaseKey, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const [member, setMember] = useState({});
  const { user } = useAuth();

  const time = new Date();

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  useEffect(() => {
    getMemberInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
      taskId: taskFirebaseKey,
      memberId: member.uid,
      timestamp: time,
      author: member.memberName,
    };

    createComment(payload)
      .then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateComment(patchPayload)
          .then(() => onUpdate())
          .then(setFormInput(initialState));
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mt-3 mb-3">Add A Comment</h4>

      <FloatingLabel controlId="floatingTextArea" label="Comment about this task..." className="mb-3 text-black">
        <Form.Control
          type="textarea"
          style={{ height: '100px' }}
          name="text"
          value={formInput.text}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit" className="blue-btn">Submit Comment</Button>
    </Form>
  );
}

CommentForm.propTypes = {
  taskFirebaseKey: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
