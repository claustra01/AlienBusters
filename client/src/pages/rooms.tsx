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

                    </div>
                </div>


                <img src="./ailian-min.png" className = "sample"></img>

            </main>
        </div>

    )
}