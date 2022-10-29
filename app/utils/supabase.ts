import { createClient } from '@supabase/supabase-js'

import { serverEnv } from './env.server'

const isBrowser =
  typeof document !== 'undefined' && typeof process === 'undefined'

const { SUPABASE_ANON_KEY, SUPABASE_URL } = isBrowser ? window.env : serverEnv

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
