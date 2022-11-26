import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import type { NextPage } from 'next'
import { useRef, useEffect, useState } from 'react'

// テスト用ページ（いずれ削除してください）

export default function Test() {
    const socketRef = useRef<WebSocket>()
    const [isConnected, setIsConnected] = useState(false)
    const [message, setMessage] = useState('')
    const [sendMessage, setSendMessage] = useState('')
    
    useEffect(() => {
      // Dockerでバックエンドを動かす時用
      socketRef.current = new WebSocket('ws://localhost:8080/ws/123?v=1.0')

      // デプロイ先のバックエンドを動かすよう
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
      // return () => {
      //   if (socketRef.current == null) {
      //     return
      //   }
      //   socketRef.current.close()
      // }
    }, [])

    const test = () => {
      socketRef.current?.send(sendMessage)
    }
    if(socketRef.current){
      socketRef.current.onmessage = function (ev) {
        console.log(ev.data)
        setMessage(ev.data)
      }
    }
    useEffect(()=>{
      if(socketRef.current){
        socketRef.current.onmessage = function (ev) {
          console.log(ev.data)
          setMessage(ev.data)
        }
      }

    },[socketRef.current?.onmessage])
    // const read = () =>{
    //   socketRef.current?.onmessage = function (ev) {
    //     console.log(ev.data)
    //     return 't'
    //   }
    // }
    
      return (
        <div>

          <h1  className="flagment">WebSocket is connected : {`${isConnected}`}</h1>

          <div className="buttun"><button onClick={test}>test</button></div>

          <div className="inbox">
           <input onChange={(e)=>{setSendMessage(e.target.value)}}>
           </input>
          </div>
          <div>
            {message}
          </div>
        </div>
      )
    
}
