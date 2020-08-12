import { useLayoutEffect } from 'react'

import { useNavTextContext } from '../components/Provider/NavTextProvider'

const useNavTextEffect = (navText: string) => {
    const { onNavTextChange } = useNavTextContext()

    useLayoutEffect(() => {
        onNavTextChange(navText)

        return () => {
            onNavTextChange(null)
        }
    }, [navText, onNavTextChange])
}

export default useNavTextEffect
