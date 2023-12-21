'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post,setPost] = useState({
        prompt:'',
        tag:'',
    });
    
const CreatePrompt = async (e) => {
  e.preventDefault(); // this is going to prevent default behaviour of the browser when submitting a form which is to do a reload in react and next we want more native feel and we want the least amount of reloads 

  setSubmitting(true);

  try{ // this is an api call
    const response = await fetch('/api/prompt/new',{
        method: 'POST',
        body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag
        })
    })

    if(response.ok) {
        router.push('/'); //meaning home page
    }
  } catch(error){
    console.log(error);
  } finally {
    setSubmitting(false);
  }
}

  return (
    <Form
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={CreatePrompt}
    />
  )
}

export default CreatePrompt