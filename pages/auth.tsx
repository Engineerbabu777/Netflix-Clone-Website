import Input from '@/components/Input'
import { useCallback, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Auth () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const router = useRouter()
  const [variant, setVariant] = useState('login')



  const toggleVariant = useCallback(() => {
    setVariant(currentVariant =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])

  
  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });

      router.push('/profiles');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);


  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        username,
        password
      });

      login();
    } catch (error) {
        console.log(error);
    }
  }, [email, username, password]);

  return (
    <>
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed">
        <div className='w-full h-full bg-black lg:bg-opacity-50'>
          {/* NAVIGATION! */}
          <nav className='px-12 py-5'>
            <img src='/images/logo.png' alt='logo' className='h-12' />
          </nav>

          {/* LOGIN BOX */}
          <div className='flex justify-center'>
            <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full'>
              <h2 className='text-4xl font-semibold text-white mb-8'>
                Sign in
              </h2>
              {/* INPUTS! */}
              <div className='flex flex-col gap-4 '>
                {variant === 'register' && (
                  <Input
                    label='Username'
                    id='username'
                    onChange={e => {
                      setUsername(e.target.value)
                    }}
                    type='username'
                    value={username}
                  />
                )}
                <Input
                  label='Email'
                  id='email'
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                  type='email'
                  value={email}
                />
                <Input
                  label='Password'
                  id='password'
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                  type='password'
                  value={password}
                />
              </div>

              {/* BUTTON! */}
              <button
                onClick={variant === 'login' ? login : register}
                className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
              >
                {variant === 'login' ? 'Login' : 'Sign up'}
              </button>
              <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
                <div
                  // onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                  className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
                >
                  <FcGoogle size={32} />
                </div>
                <div
                  // onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                  className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
                >
                  <FaGithub size={32} />
                </div>
              </div>
              <p className='text-neutral-500 mt-12'>
                {variant === 'login'
                  ? 'First time using Netflix?'
                  : 'Already have an account?'}
                Already have an account?
                <span
                  onClick={toggleVariant}
                  className='text-white ml-1 hover:underline cursor-pointer'
                >
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
