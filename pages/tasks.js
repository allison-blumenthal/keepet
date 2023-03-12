import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getMemberByUID } from '../api/memberData';
import { getTasksByHouseholdId } from '../api/taskData';
import { useAuth } from '../utils/context/authContext';
import TaskCard from '../components/cards/TaskCard';

export default function ShowTasks() {
  // eslint-disable-next-line no-unused-vars
  const [member, setMember] = useState({});
  const [householdTasks, setHouseholdTasks] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getHouseholdTasks = () => {
    getMemberByUID(user.uid).then((memberObj) => {
      setMember(memberObj[0]);
      getTasksByHouseholdId(memberObj[0].householdId).then((taskArr) => {
        setHouseholdTasks(taskArr);
      });
    });
  };

  useEffect(() => {
    getHouseholdTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>Tasks</title>
      </Head>
      <h1>This is the tasks page.</h1>
      <Button type="btn" className="mx-2 red-btn" onClick={() => router.push('/task/new')}>Add a Task</Button>
      <div className="d-flex flex-wrap">
        {householdTasks.map((householdTask) => (
          <TaskCard key={householdTask.firebaseKey} taskObj={householdTask} onUpdate={getHouseholdTasks} />
        ))}
      </div>
    </>
  );
}
