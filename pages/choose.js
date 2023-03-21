import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Choose() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Create or Join A Household</title>
      </Head>
      <div
        className="basic-page-container text-center"
        style={{
          height: '160vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <button type="button" className="teal-btn pc-font-xsm" onClick={() => router.push('/household/new')}>CREATE HOUSEHOLD</button>
        <button type="button" className="orange-btn pc-font-xsm" onClick={() => router.push('/join')}>JOIN HOUSEHOLD</button>
      </div>
    </>
  );
}
