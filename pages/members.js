import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function members() {
  return (
    <>
      <h1>This is the members page.</h1>
      <Link passHref href="/member/new">
        <Button variant="success" size="lg">New Member</Button>
      </Link>
    </>
  );
}
