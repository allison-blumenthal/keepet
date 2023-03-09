import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import {
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';
import PropTypes from 'prop-types';
import { updateMemberHouseholdId } from '../../api/mergedData';
import HouseholdCard from '../ cards/HouseholdCard';
import { getHouseholds } from '../../api/householdData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  householdId: '',
  uid: '',
};

function JoinHouseholdForm({ memberObj }) {
  const [households, setHouseholds] = useState([]);
  const [formInput, setFormInput] = useState({
    ...initialState,
    uid: memberObj.uid,
  });
  const router = useRouter();
  const { uid } = useAuth();

  const displayHouseholds = () => {
    getHouseholds().then(setHouseholds);
  };

  useEffect(() => {
    displayHouseholds();
    if (memberObj.firebaseKey) setFormInput(memberObj);
  }, [memberObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid };
    updateMemberHouseholdId(payload)
      .then((response) => {
        router.push(`/household/${response.householdId}`);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Choose a household:</FormLabel>
          <div className="household-card-container">
            {households.map((household) => (
              <RadioGroup
                aria-labelledby="household-radio-buttons-group"
                name="household-buttons"
                value={formInput.householdId}
                defaultValue=""
                checked={formInput.householdId}
                onClick={(e) => {
                  setFormInput((prevState) => ({
                    ...prevState,
                    householdId: e.target.value,
                  }));
                }}
                required
              >
                <FormControlLabel
                  value={household}
                  control={<Radio />}
                  label={household.householdName}
                />
                <HouseholdCard key={household.firebaseKey} householdObj={household} onUpdate={displayHouseholds} />
              </RadioGroup>
            ))}
          </div>
        </FormControl>
      </Form>

      <Button className="view-btn" type="submit">Join Selected Household</Button>
    </>
  );
}

JoinHouseholdForm.propTypes = {
  memberObj: PropTypes.shape({
    householdId: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

JoinHouseholdForm.defaultProps = {
  memberObj: initialState,
};

export default JoinHouseholdForm;
