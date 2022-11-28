import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Link } from '@remix-run/react'
import type { Provider } from '@supabase/supabase-js'
import { getUser } from '~/utils/session'
import { useSignIn } from '~/utils/use-sign-in'
import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  if (user) return redirect('/')
  return null
}

export default function LoginRoute() {
  const { t, ready } = useTranslation()

  if (!ready) return null

  return (
    <div className='flex min-h-full flex-col justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          className='mx-auto h-12 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='Your Company'
        />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50'>
          {t('sign-in')}
        </h2>
        <p className='mt-6 text-center text-sm text-gray-600 dark:text-gray-400'>
          {t('or')}{' '}
          <Link
            to='/'
            className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
          >
            {t('go-home')}
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-6 lg:px-8'>
        <div className='mt-6 grid grid-cols-2 gap-3'>
          <ProviderButton provider='facebook' t={t}>
            <svg
              className='h-5 w-5'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z'
                clipRule='evenodd'
              />
            </svg>
          </ProviderButton>
          <ProviderButton provider='github' t={t}>
            <svg
              className='h-5 w-5'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                clipRule='evenodd'
              />
            </svg>
          </ProviderButton>
        </div>
      </div>
    </div>
  )
}

function ProviderButton({
  children,
  provider,
  t,
}: {
  children: React.ReactNode
  provider: Provider
  t: TFunction
}) {
  const { handleProviderSignIn } = useSignIn()

  return (
    <div>
      <button
        onClick={() => handleProviderSignIn(provider)}
        className='inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 dark:bg-black bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800'
      >
        <span className='sr-only'>
          {t('sign-in-with')} {provider}
        </span>
        {children}
      </button>
    </div>
  )
}
