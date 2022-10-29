import { createCookieSessionStorage } from '@remix-run/node'
import type { User } from '@supabase/supabase-js'

import supabase from './supabase'

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'demo-app-auth',
      maxAge: 604_800,
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'production',
      secrets: ['supabase is the dopest!'],
    },
  })

export { getSession, commitSession, destroySession }

export const getUser = async (request: Request): Promise<User | null> => {
  const session = await getSession(request.headers.get('Cookie'))

  const accessToken = session.get('accessToken')

  if (!accessToken) return null

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken)

  return user
}
