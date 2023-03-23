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
      <div
        className="basic-page-container text-center"
        style={{
          height: 'auto',
          padding: '100px 30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1 className="lime pc-font-md">TASKS</h1>

        {member.isAdmin === true ? (
          <>
            <button type="button" className="add-btn" onClick={() => router.push('/task/new')}>
              <Image src={add} alt="add task icon" />
            </button>
          </>
        )
          : '' }
        <div className="d-flex flex-wrap">
          {householdTasks.map((householdTask) => (
            <TaskCard key={householdTask.firebaseKey} taskObj={householdTask} onUpdate={getHouseholdTasks} />
          ))}
        </div>
      </div>
    </>
  );
}
