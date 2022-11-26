import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/playing.module.css'

import CustomHead from '../components/customhead'
import { send } from 'process';

export default function Playing() {

    const socketRef = React.useRef<WebSocket>()
    const [isConnected, setIsConnected] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [sendMessage, setSendMessage] = React.useState('')

    const [uuid, setUuid] = React.useState('')
    const [score, setScore] = React.useState(0)
    const [progress, setProgress] = React.useState(0)
    const sendJson = createJson(uuid, score)

    React.useEffect(() => {
        
        // Dockerでバックエンドを動かす時用
        socketRef.current = new WebSocket('ws://localhost:8080/ws/123?v=1.0')
        // デプロイ先のバックエンドを動かす用
        // socketRef.current = new WebSocket('wss://hajimete-hackathon-2022.onrender.com/ws/123?v=1.0')
        

        console.log(socketRef)
        socketRef.current.onopen = function () {
            setIsConnected(true)
            console.log('Connected')
        }
        
        socketRef.current.onclose = function () {
            console.log('closed')
            localStorage.removeItem('uuid')
            setIsConnected(false)
        }

        const id = setInterval(() => {
            setSendMessage(sendJson)
            sendSocket()
            setProgress((e)=>e+1)
        }, 100);

        return () => {
            clearInterval(id);
        }
        
    }, [])

    React.useEffect(()=>{
        if(socketRef.current){
            socketRef.current.onmessage = function (ev) {
                if (!(ev.data.indexOf('{') === 0)) {
                    console.log(ev.data)
                    setUuid(ev.data)
                }
                setMessage(ev.data)
            }
        }
    }, [socketRef.current])

    const sendSocket = () => {
        socketRef.current?.send(sendMessage)
    }

    return (
        
        <div className='{styles.container}'>
            
        <CustomHead/>

            <main className='{styles.main}'>

                    <Link href="/">
                        <p>TopPage</p>
                    </Link><br/>

                    <p>WebSocket is connected : {`${isConnected}`}</p>
                    
                    {detRenderer(progress)}
                    
                    <p>{uuid}</p>
                    <p>{message}</p>

            </main>
        </div>

    );

}

const detRenderer = (prog: number) => {
    var prog5sec: number = Math.floor(prog/50)
    switch (prog5sec) {
        case(0): return <div>Loading...</div>
        case(1): return <div>Question1</div>
        case(2): return <div>Question2</div>
        case(3): return <div>Question3</div>
        case(4): return <div>Question4</div>
        case(5): return <div>Question5</div>
        case(6): return <div>Question6</div>
        case(7): return <div>Question7</div>
        case(8): return <div>Question8</div>
        case(9): return <div>Question9</div>
        case(10): return <div>Question10</div>
        case(11): return <div>Result</div>
        default: return <div>Error!</div>
    }
}

const useWindowSize = (): number[] => {
    const [
        size,
        setSize
    ] = React.useState([0, 0]);

    React.useLayoutEffect(() => {

        const updateSize = (): void => {
            setSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);

    }, []);

    return size;
};

const useMousePosition = () => {
    const [
        mousePosition,
        setMousePosition
    ] = React.useState([0, 0]);

    React.useEffect(() => {

        const updateMousePosition = (event: { clientX: any; clientY: any; }) => {
            setMousePosition([event.clientX, event.clientY]);
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
        
    }, []);

    return mousePosition;
};

const createJson = (clientUUID: string, clientScore: number) => {

    const [clientX, clientY] = [
        useMousePosition()[0]/useWindowSize()[0],
        useMousePosition()[1]/useWindowSize()[1]
    ];

    var obj = {
        name: clientUUID,
        room: 0,
        pos: {
            x: clientX,
            y: clientY
        },
        score: clientScore
    }

    return JSON.stringify(obj);

}