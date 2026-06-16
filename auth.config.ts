import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/admin/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isAdmin = request.nextUrl.pathname.startsWith('/admin')
      const isLogin = request.nextUrl.pathname === '/admin/login'
      if (isAdmin && !isLogin && !isLoggedIn) return false
      return true
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/admin`
    },
  },
}
