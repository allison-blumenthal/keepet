import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Head from 'next/head';

export default function Members() {
  return (
    <>
      <Head>
        <title>Members</title>
      </Head>
      <h1>This is the members page.</h1>
      <Link passHref href="/member/new">
        <Button variant="success" size="lg">New Member</Button>
      </Link>
    </>
  );
}
