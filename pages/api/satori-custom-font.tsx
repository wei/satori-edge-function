import satori, { init as initSatori } from 'satori/wasm'
import initYoga from 'yoga-wasm-web'
// @ts-ignore
import yoga_wasm from '../../yoga.wasm?module'

export const config = {
  runtime: 'experimental-edge',
}

const font = fetch(new URL('../../assets/TYPEWR__.TTF', import.meta.url)).then(
  (res) => res.arrayBuffer()
)

export default async function handler() {
  const yoga = await initYoga(yoga_wasm)
  initSatori(yoga)

  const fontData = await font

  const svg = await satori(
    (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          fontSize: 100,
          fontFamily: 'Typewriter',
          paddingTop: '100px',
          paddingLeft: '50px',
        }}
      >
        Hello world!
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Typewriter',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
    }
  })
}
