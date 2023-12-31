import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import prisma from '../../../libs/prismaDB'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID || '',
    //   clientSecret: process.env.GITHUB_SECRET || ''
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || ''
    }),
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'passord'
        }
      },
      async authorize (credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist')
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Incorrect password')
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/auth'
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  jwt: {
    secret: '!@#$%^&*QWERTYUI'
  },
  secret: 'QWERTYUIOASDFGHJK%^'
}

export default NextAuth(authOptions)
