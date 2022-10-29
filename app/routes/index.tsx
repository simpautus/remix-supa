import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import type { User } from '@supabase/supabase-js'
import { getUser } from '~/utils/session'
import { Theme, useTheme } from '~/utils/theme-provider'
import { useSignOut } from '~/utils/use-sign-out'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

const navigation = [
  { translationKey: 'menu.product', href: '/' },
  { translationKey: 'menu.features', href: '/' },
  { translationKey: 'menu.marketplace', href: '/' },
  { translationKey: 'menu.company', href: '/' },
]

type LoaderData = {
  user: User | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  return json<LoaderData>({ user })
}

export default function IndexRoute() {
  const { user } = useLoaderData<LoaderData>()
  const [theme, setTheme] = useTheme()
  const { signOut } = useSignOut()
  const { t, i18n, ready } = useTranslation()

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    )
  }

  if (!ready) return null

  return (
    <div className='relative overflow-hidden bg-gray-50 dark:bg-gray-900'>
      <div className='mx-auto max-w-7xl'>
        <div className='relative z-10 bg-gray-50 dark:bg-gray-900 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32'>
          <svg
            className='absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block'
            fill='currentColor'
            viewBox='0 0 100 100'
            preserveAspectRatio='none'
            aria-hidden='true'
          >
            <polygon
              className='dark:fill-gray-800 fill-gray-100'
              points='50,0 100,0 50,100 0,100'
            />
          </svg>

          <Popover>
            <div className='relative px-4 pt-6 sm:px-6 lg:px-8'>
              <nav
                className='relative flex items-center justify-between sm:h-10 lg:justify-start'
                aria-label='Global'
              >
                <div className='flex flex-shrink-0 flex-grow items-center lg:flex-grow-0'>
                  <div className='flex w-full items-center justify-between md:w-auto'>
                    <img
                      alt='Your Company'
                      className='h-8 w-auto sm:h-10'
                      src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                    />
                    <div className='-mr-2 flex items-center md:hidden'>
                      <Popover.Button className='inline-flex items-center justify-center rounded-md bg-gray-50 dark:bg-gray-900 p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                        <span className='sr-only'>{t('menu-open')}</span>
                        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className='hidden md:ml-10 md:block md:space-x-8 md:pr-4'>
                  {navigation.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className='font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-50'
                    >
                      {t(item.translationKey)}
                    </Link>
                  ))}
                  {user ? (
                    <button
                      onClick={signOut}
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      {t('logout')}
                    </button>
                  ) : (
                    <Link
                      to='/login'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      {t('login')}
                    </Link>
                  )}
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter='duration-150 ease-out'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='duration-100 ease-in'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Popover.Panel
                focus
                className='absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden'
              >
                <div className='overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900 shadow-md ring-1 ring-black dark:ring-gray-500 ring-opacity-5'>
                  <div className='flex items-center justify-between px-5 pt-4'>
                    <div>
                      <img
                        className='h-8 w-auto'
                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                        alt=''
                      />
                    </div>
                    <div className='-mr-2'>
                      <Popover.Button className='inline-flex items-center justify-center rounded-md bg-gray-50 dark:bg-gray-900 p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                        <span className='sr-only'>{t('menu-close')}</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className='space-y-1 px-2 pt-2 pb-3'>
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-gray-900'
                      >
                        {t(item.translationKey)}
                      </Link>
                    ))}
                  </div>
                  {user ? (
                    <button
                      onClick={signOut}
                      className='block w-full bg-gray-50 dark:bg-gray-900 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                    >
                      {t('logout')}
                    </button>
                  ) : (
                    <Link
                      to='/login'
                      className='block w-full bg-gray-50 dark:bg-gray-900 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                    >
                      {t('login')}
                    </Link>
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <main className='mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
            <div className='sm:text-center lg:text-left'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>{t('hero.title.1')}</span>{' '}
                <span className='block text-indigo-600 xl:inline'>
                  {t('hero.title.2')}
                </span>
              </h1>
              <p className='mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0'>
                {t('hero.body')} anim aute id magna aliqua ad ad non deserunt
                sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              {user && (
                <p className='mt-3 text-sm text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-base md:mt-5 md:text-lg lg:mx-0 font-light'>
                  {t('signed-in-user')}
                  <span className='text-indigo-500'>{user.email}</span>
                </p>
              )}
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                <div className='rounded-md shadow'>
                  <Form method='get'>
                    <input
                      name='lng'
                      value={i18n.resolvedLanguage === 'en' ? 'fi' : 'en'}
                      type='hidden'
                    />
                    <button
                      type='submit'
                      className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg'
                    >
                      {i18n.resolvedLanguage === 'en'
                        ? 'Suomeksi'
                        : 'In English'}
                    </button>
                  </Form>
                </div>
                <div className='mt-3 sm:mt-0 sm:ml-3'>
                  <button
                    onClick={toggleTheme}
                    className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg'
                  >
                    {t(`theme.long.${theme === Theme.DARK ? 'light' : 'dark'}`)}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
        <img
          className='h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full'
          src='https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
          alt=''
        />
      </div>
    </div>
  )
}
