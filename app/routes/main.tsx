/*
 * File: index.tsx
 * Project: *
 * Created: *
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import { useCatch } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

// - Component
export default function MainRoute() {
  const { t, i18n } = useTranslation()

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('meta.title')}</h1>

      <br />

      <section>
        <h2>{t('intro')}</h2>
        <p>{t('intro.body')}</p>
      </section>

      <br />

      <section>
        <img
          src='https://cdn.glitch.com/791b2241-459b-4a2e-8cca-c0fdc21f0487%2Fmockaroon-1333674-unsplash.jpg?1558958450566'
          alt={t('intro.img.alt')}
          width='400px'
        />
      </section>

      <br />

      {/* Change language */}
      <section>
        <h2>{t('option.title.2')}</h2>
        <form method='get'>
          <select name='lng' defaultValue={i18n.resolvedLanguage}>
            <option value='en'>English</option>
            <option value='bs'>Bosnian</option>
            <option value='sv'>Swedish</option>
            <option value='fi'>Finnish</option>
          </select>
          <button type='submit'>Save</button>
        </form>
      </section>

      <br />
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  )
}
