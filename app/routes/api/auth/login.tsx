import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { commitSession, getSession } from '~/utils/session'

export const action: ActionFunction = async ({ request }) => {
  const { accessToken, refreshToken } = Object.fromEntries(
    await request.formData()
  )

  // create session
  const session = await getSession()

  // attach accessToken & refreshToken
  session.set('accessToken', accessToken)
  session.set('refreshToken', refreshToken)

  // commit our session
  const cookieString = await commitSession(session)

  return redirect('/', {
    headers: {
      'Set-Cookie': cookieString,
    },
  })
}
