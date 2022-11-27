import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/playing.module.css'

import { send } from 'process';
import { render } from 'react-dom';
import { json } from 'stream/consumers';

import CustomHead from '../components/customhead'
import LoadingPage from '../components/loadingpage'
import ResultPage from '../components/resultpage'
import ErrorPage from '../components/errorpage'
import Question01 from '../components/question01'
import Question02 from '../components/question02'
import Question03 from '../components/question03'
import Question04 from '../components/question04'
import Question05 from '../components/question05'
import Question06 from '../components/question06'
import Question07 from '../components/question07'
import Question08 from '../components/question08'
import Question09 from '../components/question09'
import Question10 from '../components/question10'
import Question11 from '../components/question11'
import Question12 from '../components/question12'
import Question13 from '../components/question13'
import Question14 from '../components/question14'
import Question15 from '../components/question15'
import Question16 from '../components/question16'
import Question17 from '../components/question17'
import Question18 from '../components/question18'
import Question19 from '../components/question19'
import Question20 from '../components/question20'
import Question21 from '../components/question21'
import Question22 from '../components/question22'
import Question23 from '../components/question23'
import Question24 from '../components/question24'
import Question25 from '../components/question25'
import { clickProp } from './_app';

var questions: number[];
const answers: number[] = [
    1, 4, 2, 5, 4,
    3, 1, 4, 2, 1,
    5, 5, 3, 1, 3,
    4, 2, 1, 5, 4,
    3, 1, 2, 5, 2
]

export default function Playing() {

    const socketRef = React.useRef<WebSocket>()
    const {clickedObj, setClickedObj} = React.useContext(clickProp)
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

        console.log(clickedObj)

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

    // 答え合わせ
    React.useEffect(() => {
        var prog5sec: number = Math.floor(progress/200)
        console.log('called')
        if (prog5sec > 0 && prog5sec <= 10) {
            var qNow = questions[prog5sec-1]
            var aNow = answers[qNow]
            if (clickedObj == aNow) setScore(score+5)
            else setScore(Math.max(0, score-5))
        }
    }, [clickedObj])

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

    // ページ描画
    return (
        <div>
            <CustomHead/>
            {detRenderer(progress, questions)}
            {renderTimer(progress)}
            {renderScores(jsonFormatter(message), uuid)}
            {renderPointers(jsonFormatter(message), uuid, windowSize)}
        </div>
    );

}

const detRenderer = (prog: number, qList: number[]) => {
    var prog5sec: number = Math.floor(prog/200)
    switch (prog5sec) {
        case(0): return <ResultPage/>
        case(1): return getQuestion(qList[0])
        case(2): return getQuestion(qList[1])
        case(3): return getQuestion(qList[2])
        case(4): return getQuestion(qList[3])
        case(5): return getQuestion(qList[4])
        case(6): return getQuestion(qList[5])
        case(7): return getQuestion(qList[6])
        case(8): return getQuestion(qList[7])
        case(9): return getQuestion(qList[8])
        case(10): return getQuestion(qList[9])
        case(11): return <ResultPage/>
        default: return <ErrorPage/>
    }
}

const getQuestion = (qId: number) => {
    switch (qId) {
        case(0): return <Question01/>
        case(1): return <Question02/>
        case(2): return <Question03/>
        case(3): return <Question04/>
        case(4): return <Question05/>
        case(5): return <Question06/>
        case(6): return <Question07/>
        case(7): return <Question08/>
        case(8): return <Question09/>
        case(9): return <Question10/>
        case(10): return <Question11/>
        case(11): return <Question12/>
        case(12): return <Question13/>
        case(13): return <Question14/>
        case(14): return <Question15/>
        case(15): return <Question16/>
        case(16): return <Question17/>
        case(17): return <Question18/>
        case(18): return <Question19/>
        case(19): return <Question20/>
        case(20): return <Question21/>
        case(21): return <Question22/>
        case(22): return <Question23/>
        case(23): return <Question24/>
        case(24): return <Question25/>
        default: return <ErrorPage/>
    }
}

const renderTimer = (prog: number) => {
    var barString = ''
    for (var i=0; i<20; i++) {
        barString += (i < (prog%200)/10) ? '' : '█'
    }
    if (Math.floor(prog/200) > 0 && Math.floor(prog/200) <= 10)
        return (
            <div className = "scorebox">
                <div style={{top: '3%', left: '5%', fontSize: '160%', color: '#ffffff'}}>TIME</div>
                <div style={{top: '10%', left: '5%', fontSize: '120%', color: '#ffffff'}}>{barString}</div>
                <div style={{top: '15%', left: '5%', fontSize: '120%', color: '#ffffff'}}>{barString}</div>
            </div>
        )
    else return <></>
}

const renderScores = (message: string, uuid: string) => {
    if (message.indexOf('{') === 0) {
        const json = JSON.parse(message)
        var ret = [], cnt = 0;
        for (let id in json.score) {
            if (id === uuid) {
                ret.push(
                    <div style={{top: '30%', left: '5%', fontSize: '200%', color: '#ffffff'}}>
                        YOU {json.score[id]}pt</div>
                )
            }
        }
        for (let id in json.score) {
            cnt++;
            var margin = cnt*10 + 30
            if (id !== uuid) {
                ret.push(
                    <div style={{top: margin.toString()+'%', left: '5%', fontSize: '200%', color: '#ffffff'}}>
                        Other {json.score[id]}pt</div>
                )
            }
        }
        return (
            <div className = "scorebox">
                {ret}
            </div>
        )
    }
}

const renderPointers = (message: string, uuid: string, windowSize: number[]) => {
    if (message.indexOf('{') === 0) {
        const json = JSON.parse(message)
        var ret = []
        for (let id in json.pos) {
            if (id !== uuid) {
                var x = (json.pos[id].x * windowSize[0]).toString() + 'px'
                var y = (json.pos[id].y * windowSize[1]).toString() + 'px'
                var e = (
                    <div style={{position: 'absolute', top: y, left: x, zIndex:1000}}>
                        <img src={'/hogefuga.png'} alt=' ' width='200px'/>
                    </div>
                )
                ret.push(e)
            }
        }
        return ret
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

const jsonFormatter = (json: string) => {
    var n = json.indexOf('}{')
    if (n == -1) return json
    else return json.substring(0,n+1)
}