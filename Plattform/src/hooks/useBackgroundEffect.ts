import { useLayoutEffect } from 'react'

import { useBackgroundContext } from '../components/Provider/BackgroundProvider'

export const useBackgroundEffect = (background: any) => {
    const { onBackgroundChange } = useBackgroundContext()

    useLayoutEffect(() => {
        onBackgroundChange(background)

        return () => {
            onBackgroundChange(null)
        }
    }, [background, onBackgroundChange])
}

export default useBackgroundEffect
