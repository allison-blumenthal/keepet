import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getMemberByUID } from '../api/memberData';
import { getTasksByHouseholdId } from '../api/taskData';
import { useAuth } from '../utils/context/authContext';
import TaskCard from '../components/cards/TaskCard';
import add from '../src/assets/images/add-icon.png';
import NavBar from '../components/NavBar';

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
      <NavBar />
      <div className="basic-page-container text-center">
        <h1 className="lime pc-font-md">TASKS</h1>

        {member.isAdmin === true ? (
          <>
            <div className="task-btn-container">
              <button type="button" className="add-btn pc-font-xsm" onClick={() => router.push('/task/new')}>
                <Image src={add} alt="add task icon" height="30px" width="30px" />
                ADD A TASK
              </button>
            </div>
          </>
        )
          : (
            <h2 className="muller-light-xsm" style={{ padding: '10px' }}>Please note: Only the head of household may create, edit, and delete tasks.</h2>
          )}
        <div className="d-flex flex-wrap">
          {householdTasks.map((householdTask) => (
            <TaskCard key={householdTask.firebaseKey} taskObj={householdTask} onUpdate={getHouseholdTasks} />
          ))}
        </div>

      </div>
    </>
  );
}
