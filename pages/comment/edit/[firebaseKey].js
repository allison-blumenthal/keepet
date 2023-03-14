import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleComment } from '../../../api/commentData';
import CommentForm from '../../../components/forms/CommentForm';

export default function EditComment() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleComment(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Edit Comment</title>
      </Head>
      <CommentForm commentObj={editItem} />
    </>
  );
}
