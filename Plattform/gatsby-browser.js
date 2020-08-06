import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
import React from 'react'

import RootLayout from './src/components/Layout/RootLayout'

deckDeckGoHighlightElement()

export const wrapRootElement = ({ element }) => <RootLayout>{element}</RootLayout>

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm('Neue Version der Anwendung verfügbar. Jetzt aktualisieren?')

    if (answer === true) {
        window.location.reload()
    }
}
