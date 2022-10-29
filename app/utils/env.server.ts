import invariant from 'tiny-invariant'

type WindowEnvironemntVar = 'SUPABASE_URL' | 'SUPABASE_ANON_KEY'
type ServerEnvironemntVar = WindowEnvironemntVar

export interface WindowEnvironment
  extends Record<WindowEnvironemntVar, string> {}

export interface ServerEnvironment
  extends Record<ServerEnvironemntVar, string> {}

declare global {
  interface Window {
    env: WindowEnvironment
  }
}

invariant(process.env.SUPABASE_URL, 'SUPABASE_URL must be set')
invariant(process.env.SUPABASE_ANON_KEY, 'SUPABASE_ANON_KEY must be set')

export const windowEnv: WindowEnvironment = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
}

export const serverEnv: ServerEnvironment = {
  ...windowEnv,
}
