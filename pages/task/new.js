import React from 'react';
import Head from 'next/head';
import TaskForm from '../../components/forms/TaskForm';

export default function AddTask() {
  return (
    <>
      <Head>
        <title>New Task</title>
      </Head>
      <div>
        <TaskForm />
      </div>
    </>
  );
}
