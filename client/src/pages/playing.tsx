import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/playing.module.css'

import CustomHead from '../components/customhead'
import { send } from 'process';

var clientUUID: string;
const score: number = 0;
const prog: number = 0;

export default function Playing() {

    const socketRef = React.useRef<WebSocket>()
    const [isConnected, setIsConnected] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [sendMessage, setSendMessage] = React.useState('')

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
   
    setTimeout(() => {
        setSendMessage(sendJson)
        sendSocket()
    }, 100);

    const sendSocket = () => {
        socketRef.current?.send(sendMessage)
    }

    if(socketRef.current){
        socketRef.current.onmessage = function (ev) {
            console.log(ev.data)
            setMessage(ev.data)
        }
    }

    React.useEffect(()=>{
        if(socketRef.current){
            socketRef.current.onmessage = function (ev) {
                console.log(ev.data)
                setMessage(ev.data)
            }
        }
    },[socketRef.current?.onmessage])

    return (
        
        <div className='{styles.container}'>
            
        <CustomHead/>

            <main className='{styles.main}'>

                    <p>WebSocket is connected : {`${isConnected}`}</p>

                    <Link href="/">
                        <p>TopPage</p>
                    </Link><br/>

                    <div>{message}</div>

                    <img src="/minecraft.png" />;

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