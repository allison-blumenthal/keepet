import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import members from '../src/assets/images/members.png';
import pets from '../src/assets/images/pets.png';
import tasks from '../src/assets/images/tasks.png';

export default function home() {
  return (
    <>
      <h1>Welcome to Keepet!</h1>
      <h3>A place to keep your pets and people organized.</h3>
      <Link passHref href="/members">
        <Image src={members} alt="Members" />
      </Link>
      <Link passHref href="/pets">
        <Image src={pets} alt="Pets" />
      </Link>
      <Link passHref href="/tasks">
        <Image src={tasks} alt="Tasks" />
      </Link>
    </>
  );
}
