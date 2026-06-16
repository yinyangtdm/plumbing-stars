import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config'

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials?.email as string
        const password = credentials?.password as string

        const adminEmail = process.env.ADMIN_EMAIL
        const adminHash = process.env.ADMIN_PASSWORD_HASH
        const adminPlain = process.env.ADMIN_PASSWORD

        if (!email || !password) return null
        if (email !== adminEmail) return null

        // Support either a bcrypt hash (ADMIN_PASSWORD_HASH) or plain text (ADMIN_PASSWORD)
        let valid = false
        if (adminHash) {
          valid = await bcrypt.compare(password, adminHash)
        } else if (adminPlain) {
          valid = password === adminPlain
        }

        if (!valid) return null
        return { id: '1', email: adminEmail, name: 'Admin' }
      },
    }),
  ],
})
