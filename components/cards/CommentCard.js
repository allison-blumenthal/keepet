import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { deleteComment } from '../../api/commentData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleTask } from '../../api/taskData';

function CommentCard({ commentObj, onUpdate }) {
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [task, setTask] = useState({});

  const deleteThisComment = () => {
    if (window.confirm('Delete your comment?')) {
      deleteComment(commentObj.firebaseKey).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getSingleTask(commentObj.taskId).then(setTask);
  }, [commentObj.taskId]);

  return (
    <>
      {commentObj.firebaseKey ? (
        <>
          <Card className="comment-card">
            <div className="comment-container">
              <Card.Header>{commentObj.dateAdded}</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    {' '}
                    {commentObj.text}
                    {' '}
                  </p>
                  <footer className="blockquote-footer">
                    {commentObj.author}
                    {commentObj.memberId === user.uid
                      ? (
                        <Button
                          className="delete-comment-btn"
                          onClick={deleteThisComment}
                        >
                          Delete
                        </Button>
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
    dateAdded: PropTypes.string,
    text: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
