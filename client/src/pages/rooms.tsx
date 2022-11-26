import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/rooms.module.css'


export default function Home() {
    return (

        <div className='{styles.container}'>

            <Head>
                <title>Kizukuと愉快な仲間たち</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> 

            <main className='{styles.main}'>

                <div><div className="titlebox">Ailan busters</div>
                    <div className = "subbox">

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

                        <div className="bird"></div>
                        <div className="bird -type_2"></div>
                        <div className="bird -type_3"></div>

                    </div>
                </div>

                

            </main>
        </div>

    )
}