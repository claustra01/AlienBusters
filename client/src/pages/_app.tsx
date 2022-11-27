import '../../styles/globals.css'
// import '../../styles/ghost.css'
import '../../styles/index.css'
import '../../styles/room.css'
import'../../styles/test_socket.css'
import'../../styles/gamepage.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
