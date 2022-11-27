import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/home.module.css'
// import ghost from '../../styles/index.module.css'
// import '../../styles/ghost.css'
import CustomHead from '../components/customhead'


export default function Home() {
    return (

        <div className='{styles.container} hogebody'>
            <CustomHead/>

            <main className='{styles.main}'>

                <div className="title">Alien Busters
                    <div className="subtitle">Let's Play Game! → 

                        <Link href="/rooms">
                            <p className='roomlist'>RoomList</p>
                        </Link>
                       

                        <div className="content">

                            <div className="right">
                                <div className="door"></div>
                            </div>

                            <div className="left">
                                <div className="stairs">
                                    <div className="bars"></div>
                                </div>
                                <div className="nosferatu"></div>
                            </div>

                            <div className="cinema">
                                <div className="effect">
                                    <div className="grain"></div>
                                </div>
                            </div>

                        </div>
                            
                    </div>
                </div>

            {
                /*
                <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                >
                    <h2 className='text-orange-400'>
                        Deploy &rarr;
                    </h2>
                    <p>
                        Instantly deploy your Next.js site to a public URL with Vercel.
                    </p>
                </a>
                */
            }

            </main>

        {
            /*
            <footer className={styles.footer}>
                <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
            */
        }

        </div>

// 「検証」Module cssデモがいた
// <div className={ghost2.content}>

//   <div className={ghost2.right}>
//     <div className={ghost2.door}></div>
//   </div>

//   <div className={ghost2.left}>
//     <div className={ghost2.stairs}>
//       <div className={ghost2.bars}></div>
//     </div>
//     <div className={ghost2.nosferatu}></div>
//   </div>

//   <div className={ghost2.cinema}>
//     <div className={ghost2.effect}>
//       <div className={ghost2.grain}></div>
//     </div>
//   </div>

// </div>


// 「検証」普通のCSSが使いたい
// <div className="content">

//   <div className="right">
//     <div className="door"></div>
//   </div>

//   <div className="left">
//     <div className="stairs">
//       <div className="bars"></div>
//     </div>
//     <div className="nosferatu"></div>
//   </div>

//   <div className='cinema'>
//     <div className="effect">
//       <div className="grain"></div>
//     </div>
//   </div>
// </div>

    )
}