import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import Loading from "@Components/Animated/Loading";
import "@Styles/Buttons/Install.css"

export default function Game(){

    const ipc = window.ipcRenderer;

    const gameName = useParams('game').game;

    const {data, loading} = useFetch(`https://starplus.onrender.com/games/${gameName}/`);


    return (
        <>
        {
            loading?<Loading/>:
            <div className="flex flex-col lg:flex-row w-full min-h-full gap-4 justify-between overflow-hidden p-4">
                <Trailer video_url={data.trailer}/>

                <div className="flex gap-4 flex-col min-h-full">
                    <Details name={data.name} desc={data.desc} genres={data.genres}/>
                    <Install game_files={data.game_files} name={data.name}/>
                    <DownloadBar/>
                </div>
                
            </div>
        }
        </>
    )
}

function Trailer({video_url}){

    return (
        
        <div className="overflow-hidden w-full lg:w-screen lg:h-screen lg:absolute top-0 left-0 -z-1">

            <div className="hidden lg:block absolute w-full h-full bg-[#1414146e]">

            </div>

            <iframe className="w-full h-full" src={`${video_url}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1`} title="YouTube video player" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        
    )
}

function Details({name, desc, genres, size}){

    return (
        <div className="flex flex-col gap-4 lg:w-[60%] z-10">
            <h1 className="text-5xl font-extrabold">{name}</h1>

            <div className="flex gap-2">{genres.map((g)=>
                <p className="px-4 py-2 rounded-full bg-[#00000077]" key={g}>{g}</p>
            )}</div>

            <p className="text-lg text-[#b6b6b6]">{desc}</p>

        </div>
    )
}

function Install({game_files, name}){

    const ipc = window.ipcRenderer;

    const SendFileUrl = ()=>{
        ipc.send("game:install", {
            payload:{
                url: game_files,
                filename: name
            }
        })
    }

    return (
        <button className="animated-button" onClick={SendFileUrl}>
            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
            </svg>
            <span className="text">Install</span>
            <span className="circle"></span>
            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
            </svg>
        </button>
    )
}

function DownloadBar(){
    const ipc = window.ipcRenderer;

    useEffect(()=>{
        ipc.on("downloading", (args)=>{
            console.log(event)
            document.getElementById("load-bar").style.width = `${args.process}%`;
        })
    }, [])

    return (
        <div className="w-full h-10 bg-amber-50 z-10">
            <div id="load-bar" className={`h-full bg-green-700 transition-all`}></div>
        </div>
    )
}