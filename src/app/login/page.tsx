'use client';

import { PagePath } from '@/shared/constant';
import LoginForm from '@/shared/views/login/LoginForm';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/webauthn';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Login() {
  const { data: session, update, status } = useSession();

  useEffect(() => {
    console.log(status)
  }, [status]);


  return (
    <div className='min-h-screen relative flex flex-col  w-full'>

      <div className=' h-[100vh]'>
        <div
          className='mx-auto flex w-full flex-col justify-center gap-2 space-y-6 sm:w-[350px] h-full p-5'
          style={{ height: '93vh' }}
        >
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Sign In</h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email below to sign in into our website
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
