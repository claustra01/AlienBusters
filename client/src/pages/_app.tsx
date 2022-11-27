import '../../styles/globals.css'
// import '../../styles/ghost.css'
import '../../styles/index.css'
import '../../styles/room.css'
import'../../styles/gamepage.css'
import type { AppProps } from 'next/app'

import { useState,createContext } from 'react'

export const clickProp = createContext<any>(null)

export default function App({ Component, pageProps }: AppProps) {
  const [temp, setTemp] = useState(-1)
  return (    
      <clickProp.Provider value={{clickedObj:temp,setClickedObj:setTemp}}>
        <Component {...pageProps} />
      </clickProp.Provider>
    )
}
