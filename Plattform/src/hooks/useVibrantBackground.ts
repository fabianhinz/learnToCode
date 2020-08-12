import Vibrant from 'node-vibrant'
import { ImageSource } from 'node-vibrant/lib/typing'
import { useLayoutEffect, useState } from 'react'

type PaletteKey = 'Vibrant' | 'Muted' | 'DarkVibrant' | 'DarkMuted' | 'LightVibrant' | 'LightMuted'

const useVibrantBackground = (src: ImageSource, paletteKey?: PaletteKey) => {
    const [background, setBackground] = useState<string | null>(null)

    useLayoutEffect(() => {
        if (!src) return

        Vibrant.from(src)
            .getSwatches()
            .then(palette =>
                setBackground(paletteKey ? palette[paletteKey].hex : palette.LightVibrant.hex)
            )
    }, [paletteKey, src])

    return background
}

export default useVibrantBackground
