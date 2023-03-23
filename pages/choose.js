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
        className="text-center"
        style={{
          height: '100vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1 className="purple pc-font-md">CHOOSE ONE:</h1>
        <button type="button" className="teal-btn pc-font-xsm" onClick={() => router.push('/household/new')}>CREATE HOUSEHOLD</button>
        <button type="button" className="orange-btn pc-font-xsm" onClick={() => router.push('/join')}>JOIN HOUSEHOLD</button>
      </div>
    </>
  );
}
