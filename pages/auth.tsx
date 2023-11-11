import Input from '@/components/Input'
import { useState } from 'react'

export default function Auth () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

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
                <Input
                  label='Username'
                  id='username'
                  onChange={e => {
                    setUsername(e.target.value)
                  }}
                  type='username'
                  value={username}
                />
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
