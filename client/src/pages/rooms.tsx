import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/rooms.module.css'

import CustomHead from '../components/customhead'

export default function Rooms() {

    return (

        <div className='{styles.container}'>
            
            <CustomHead/>

            <main className='{styles.main}'>

                <div><div className="titlebox"><a>Ailan busters</a></div>
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
                        <br></br>
                        <Link href="/gamepage">
                            <p>gamepage</p>
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