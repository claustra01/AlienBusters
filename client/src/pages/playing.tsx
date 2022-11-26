import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/playing.module.css'

import CustomHead from '../components/customhead'
import { send } from 'process';

var clientUUID: string;

export default function Playing() {

    const socketRef = React.useRef<WebSocket>()
    const [isConnected, setIsConnected] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [sendMessage, setSendMessage] = React.useState('')

    const [UUID, setUUID] = React.useState('')
    const [score, setScore] = React.useState(0)
    const [progress, setProgress] = React.useState(0)
    const sendJson = createJson(score)

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
            setIsConnected(false)
        }

    }, [])

    React.useEffect(()=>{
        if(socketRef.current){
            socketRef.current.onmessage = function (ev) {
                console.log(ev.data)
                setMessage(ev.data)
            }
        }
    },[socketRef.current?.onmessage])

    const sendSocket = () => {
        socketRef.current?.send(sendMessage)
    }
   
    setTimeout(() => {

        setSendMessage(sendJson)
        sendSocket()
    
        setProgress(progress+1)

    }, 100);

    return (
        
        <div className='{styles.container}'>
            
        <CustomHead/>

            <main className='{styles.main}'>

                    <Link href="/">
                        <p>TopPage</p>
                    </Link><br/>

                    <p>WebSocket is connected : {`${isConnected}`}</p>

                    <p>{UUID}</p>
                    <p>{message}</p>

            </main>
        </div>

    );

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

const createJson = (clientScore: number) => {

    const [clientX, clientY] = [
        useMousePosition()[0]/useWindowSize()[0],
        useMousePosition()[1]/useWindowSize()[1]
    ];

    var obj = {
        mouse: true,
        response: false,
        room: 0,
        name: clientUUID,
        pos: {
            x: clientX,
            y: clientY
        },
        score: clientScore
    }

    return JSON.stringify(obj);

}