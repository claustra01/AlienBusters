import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/playing.module.css'

import { send } from 'process';
import { render } from 'react-dom';
import { json } from 'stream/consumers';

import CustomHead from '../components/customhead'
import GamePage from './gamepage'

var questions: number[];

export default function Playing() {

    const socketRef = React.useRef<WebSocket>()
    const [isConnected, setIsConnected] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [sendMessage, setSendMessage] = React.useState('')

    const [clock, setClock] = React.useState(false)
    const [uuid, setUuid] = React.useState('')
    const [score, setScore] = React.useState(0)
    const [progress, setProgress] = React.useState(0)
    const [mousePos, setMousePos] = React.useState([0, 0])
    const [windowSize, setWindowSize] = React.useState([0, 0])

    React.useEffect(() => {
        
        // Dockerでバックエンドを動かす時用
        socketRef.current = new WebSocket('ws://localhost:8080/ws/123?v=1.0')
        // デプロイ先のバックエンドを動かす用
        // socketRef.current = new WebSocket('wss://hajimete-hackathon-2022.onrender.com/ws/123?v=1.0')

        // 接続時のソケット処理
        console.log(socketRef)
        socketRef.current.onopen = function () {
            setIsConnected(true)
            console.log('Connected')
        }
        
        // 切断時のソケット処理
        socketRef.current.onclose = function () {
            console.log('closed')
            localStorage.removeItem('uuid')
            setIsConnected(false)
        }

        // マウス座標取得
        const updateMousePosition = (event: { clientX: any; clientY: any; }) => {
            setMousePos([event.clientX, event.clientY]);
        };
        window.addEventListener('mousemove', updateMousePosition);

        // タイマー設定
        const id = setInterval(() => {
            setClock(true)
        }, 50);
        return () => {
            clearInterval(id);
        }
        
    }, [])

    // 常時実行すること
    React.useEffect(() => {

        setSendMessage(createJson(uuid, windowSize, mousePos, score))
        sendSocket()
        setProgress(progress+1)

        if (jsonFormatter(message).indexOf('{') === 0) {
            const json = JSON.parse(jsonFormatter(message))
            questions = json.question
        }

        setClock(false)
    }, [clock])

    // ソケット受信, UUID取得
    React.useEffect(() => {
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

    // ウィンドウサイズ取得
    React.useLayoutEffect(() => {
        const updateSize = (): void => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
    }, []);

    // ソケット送信
    const sendSocket = () => {
        if (socketRef.current?.readyState === 1)
            socketRef.current?.send(sendMessage)
    }

    return (
        
        <div>
            <CustomHead/>
            {detRenderer(progress)}
            {renderPointers(jsonFormatter(message), uuid, windowSize)}
        </div>

    );

}

const detRenderer = (prog: number) => {
    var prog5sec: number = Math.floor(prog/100)
    switch (prog5sec) {
        case(0): return <GamePage/>
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

const createJson = (uuid: string, windowSize: number[], mousePos: number[], score: number) => {

    var obj = {
        name: uuid,
        room: 0,
        pos: {
            x: mousePos[0]/windowSize[0],
            y: mousePos[1]/windowSize[1]
        },
        score: score
    }

    return JSON.stringify(obj);

}

const renderPointers = (message: string, uuid: string, windowSize: number[]) => {
    console.log(message)
    if (message.indexOf('{') === 0) {
        const json = JSON.parse(message)
        var ret = []
        for (let id in json.pos) {
            if (id === uuid) {
                var x = (json.pos[id].x * windowSize[0]).toString() + 'px'
                var y = (json.pos[id].y * windowSize[1]).toString() + 'px'
                var e = (
                    <div style={{position: 'absolute', top: y, left: x}}>
                        <img src={'/doseiblue.png'} alt='mouse pointer' width="20px"/>
                    </div>
                )
                ret.push(e)
            }
        }
        return ret
    }
}

const renderScores = (scoreData: any, uuid: string) => {

}

const jsonFormatter = (json: string) => {
    var n = json.indexOf('}{')
    if (n == -1) return json
    else return json.substring(0,n+1)
}