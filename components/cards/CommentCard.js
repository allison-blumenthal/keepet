import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import Image from 'next/image';
import { deleteComment, updateComment } from '../../api/commentData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleTask } from '../../api/taskData';
import trash from '../../src/assets/images/delete-icon.png';
import { getMemberByUID } from '../../api/memberData';

function CommentCard({ commentObj, onUpdate }) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState({});
  const [member, setMember] = useState({});

  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [task, setTask] = useState({});

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteThisComment = () => {
    if (window.confirm('Delete your comment?')) {
      deleteComment(commentObj.firebaseKey).then(() => onUpdate());
    }
  };

  const getMemberInfo = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
    });
  };

  useEffect(() => {
    getMemberInfo();
    getSingleTask(commentObj.taskId).then(setTask);

    if (commentObj.firebaseKey) setFormInput(commentObj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, commentObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commentObj.firebaseKey) {
      updateComment(formInput)
        .then(() => handleClose())
        .then(onUpdate);
    }
  };

  return (
    <>
      {commentObj.firebaseKey ? (
        <>
          <Card className="comment-card">
            <div className="comment-container">
              <Card.Header className="muller-light-xsm">{(commentObj.madeComment)}</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p className="muller-reg-sm">
                    {' '}
                    {commentObj.text}
                    {' '}
                  </p>
                  <footer className="blockquote-footer muller-light-sm">
                    {commentObj.author}
                    {(commentObj.memberId === user.uid) || (member.isAdmin === true)
                      ? (
                        <>
                          <div className="btn-container">
                            <button
                              type="button"
                              className="edit-btn pc-font-sm text-black"
                              onClick={handleShow}
                            >
                              EDIT
                            </button>
                            <button
                              type="button"
                              className="delete-btn"
                              onClick={deleteThisComment}
                            >
                              <Image src={trash} alt="delete comment icon" />
                            </button>
                          </div>
                          {show === true ? (
                            <>
                              <Form onSubmit={handleSubmit}>
                                <Form.Control
                                  type="text"
                                  aria-label="Comment text"
                                  style={{ height: '50px' }}
                                  name="text"
                                  value={formInput.text}
                                  onChange={handleChange}
                                  required
                                />
                                <button className="teal-btn pc-font-xsm" type="submit">UPDATE</button>
                                <button type="button" className="red-btn pc-font-xsm" onClick={handleClose}>CANCEL</button>
                              </Form>
                            </>
                          ) : ''}
                        </>
                      ) : ''}
                  </footer>
                </blockquote>

              </Card.Body>
            </div>
          </Card>
        </>
      ) : ''}
    </>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    taskId: PropTypes.string,
    memberId: PropTypes.string,
    timestamp: PropTypes.string,
    madeComment: PropTypes.string,
    text: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
