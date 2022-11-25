import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/rooms.module.css'

import CustomHead from '../components/customhead'

export default function Home() {
    return (

        <div className='{styles.container}'>
            
            <CustomHead/>

            <main className='{styles.main}'>

                    <Link href="/">
                        <p>TopPage</p>
                    </Link>
                    <br/>
                    <Link href="/playing">
                        <p>Start</p>
                    </Link>
                    <br/>
                    <Link href="/test_socket">
                        <p>SocketTest</p>
                    </Link>

            </main>
        </div>

    )
}