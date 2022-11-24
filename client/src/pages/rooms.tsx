import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/rooms.module.css'

export default function Home() {
    return (

        <div className='{styles.container} hogebody'>

            <Head>
                <title>Kizukuと愉快な仲間たち</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> 

            <main className='{styles.main}'>

                <div className="title">ghost busters
                    <div className="subtitle">

                        <Link href="/">
                            <p>TopPage</p>
                        </Link>
                        <br></br>
                        <Link href="/playing">
                            <p>Start</p>
                        </Link>
                        <br></br>
                        <Link href="/test_socket">
                            <p>SocketTest</p>
                        </Link>

                    </div>
                </div>

            </main>
        </div>

    )
}