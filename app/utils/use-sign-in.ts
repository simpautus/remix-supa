import type { Location } from '@remix-run/react'
import { useLocation } from '@remix-run/react'
import { useFetcher, useSearchParams } from '@remix-run/react'
import type { Provider } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'

import supabase from './supabase'

type SignInResult = (
  | {
      success: true
      accessToken: string
      refreshToken: string
    }
  | {
      success: false
      accessToken?: string
      refreshToken?: string
    }
) & {
  providerToken?: string
  expiresIn?: string
  tokenType?: string
}

function getCredentials(location: Location): SignInResult {
  const { hash } = location

  if (!hash) return { success: false }

  const urlParams = new URLSearchParams(hash.replace('#', ''))
  const {
    access_token,
    refresh_token,
    provider_token,
    expires_in,
    token_type,
  } = Object.fromEntries(urlParams)

  if (!access_token || !refresh_token) return { success: false }

  return {
    success: true,
    accessToken: access_token,
    refreshToken: refresh_token,
    providerToken: provider_token,
    expiresIn: expires_in,
    tokenType: token_type,
  }
}

function useLoginSubmit() {
  const { submit } = useFetcher()

  const submitToLogin = useCallback(
    (accessToken: string, refreshToken: string) => {
      submit(
        { accessToken, refreshToken },
        { method: 'post', action: '/api/auth/login' }
      )
    },
    [submit]
  )

  return { submitToLogin }
}

function useOnSignInCallBack() {
  const location = useLocation()
  const [handled, setHandled] = useState(false)
  const { submitToLogin } = useLoginSubmit()

  useEffect(() => {
    if (!handled) {
      const { success, accessToken, refreshToken } = getCredentials(location)
      if (success) {
        submitToLogin(accessToken, refreshToken)
      }
    }
    setHandled(true)
  }, [submitToLogin, location, handled])
}

function useOnAuthStateChange() {
  const [searchParams] = useSearchParams()
  const { submitToLogin } = useLoginSubmit()

  const redirectTo = searchParams.get('redirectTo') ?? '/'

  useEffect(() => {
    const {
      data: { subscription: listener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log({ event })
      if (event === 'SIGNED_IN') {
        const { access_token: accessToken, refresh_token: refreshToken } =
          session || {}
        if (!accessToken || !refreshToken) return
        submitToLogin(accessToken, refreshToken)
      }
      if (event === 'SIGNED_OUT') {
        // Already posted by useSignOut hook
        // submit(null, {
        //   method: "post",
        //   action: "/api/auth/logout",
        // });
      }
    })

    return () => {
      listener?.unsubscribe()
    }
  }, [submitToLogin, redirectTo])
}

async function handleProviderSignIn(provider: Provider) {
  const redirectTo = `${window.location.origin}/api/auth/callback`
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  })

  if (error) console.error({ error })
}

export function useSignIn() {
  return { useOnAuthStateChange, useOnSignInCallBack, handleProviderSignIn }
}
