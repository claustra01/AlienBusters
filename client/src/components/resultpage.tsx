import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/rooms.module.css'

import CustomHead from './customhead'

export default function resultpage() {
    return (
        <div className='{styles.container}'>
          <CustomHead/>
          <main className='{styles.main}'>
             <div className="resultbox">
              Thank for playing!
             </div>
             <Link href="/">
              <p>TopPage</p>
             </Link>
          </main>
        </div>
    );
}