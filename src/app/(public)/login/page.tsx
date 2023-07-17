'use client';

import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setJwt, setUser } from '@/store/features/user';
import { useRouter } from 'next/navigation';
import { login } from '@/services/api';

export default function LoginPage() {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const dispatch = useAppDispatch();
  const jwt = useAppSelector((state: RootState) => state.user.jwt);
  const { replace } = useRouter();

  useEffect(() => {
    if (jwt !== undefined) {
      replace('/dashboard');
    }
  }, [ jwt ]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login({ identifier: email, password });
    dispatch(setJwt(result.jwt));
    dispatch(setUser(result.user));
  };

  return (
    <div className={'flex items-center justify-center flex-col w-3/5 h-3/5 drop-shadow-md rounded-lg bg-white p-10'}>
      <h2 className={'mb-5 text-xl'}>Connexion</h2>
      <form onSubmit={handleLogin} className={'flex items-center justify-center flex-col w-1/2'}>
        <input className={'m-2 p-3 rounded-md bg-blue-50 w-full'} type={'text'} name={'email'} placeholder={'Email'} value={email} onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
        <input className={'m-2 p-3 rounded-md bg-blue-50 w-full'} type={'password'} name={'password'} placeholder={'Password'} value={password} onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
        <button className={'mt-5 text-lg w-full bg-blue-950 text-white rounded-md p-3'} type={'submit'}>Se connecter</button>
      </form>
    </div>
  );
};
