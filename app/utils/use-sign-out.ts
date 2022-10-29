import { useFetcher } from '@remix-run/react'
import supabase from '~/utils/supabase'

export function useSignOut() {
  const { submit } = useFetcher()

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log({ error })
    submit(
      {},
      {
        method: 'post',
        action: '/api/auth/logout',
      }
    )
  }
  return { signOut }
}
