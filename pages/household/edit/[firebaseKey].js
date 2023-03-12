import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleHousehold } from '../../../api/householdData';
import CreateEditHouseholdForm from '../../../components/forms/CreateEditHouseholdForm';

export default function EditHousehold() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleHousehold(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<CreateEditHouseholdForm householdObj={editItem} />);
}
