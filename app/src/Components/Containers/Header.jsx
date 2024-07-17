import { useEffect } from 'react';
import Sp_logo from '/Sp_Logo.png'
import styled, {css} from 'styled-components'

export default function Header(){

    const electron = window.electron;
    const ipc = window.ipcRenderer;

    const CloseWindow = ()=>{
        ipc.send("window:close", null);
    }

    const MinimizeWindow = ()=>{
        ipc.send("window:minimize", null);
    }

    const ToggleMaximizeWindow = ()=>{
        ipc.send("window:toggleMaximize", null);
    }

    const MoveWindow = ()=>{
        const titleBar = document.querySelector('#titleBar');

        let offsetX = 0;
        let offsetY = 0;

        titleBar.addEventListener('mousedown', (e) => {
            if (e.target === titleBar) {
                offsetX = e.offsetX;
                offsetY = e.offsetY;
            }
        });

        titleBar.addEventListener('mouseup', () => {
            offsetX = 0;
            offsetY = 0;
        });

        titleBar.addEventListener('mousemove', (e) => {
            if (offsetX !== 0 && offsetY !== 0) {
                ipc.send("window:move", [e.screenX - offsetX, e.screenY - offsetY]);
            }
        });

    }

    useEffect(()=>{

    })

    return (
        <header className="bg-offBlack flex sticky top-0">

            <div className=' my-4 w-full h-4' id='titleBar'>
                <img className='mx-9 w-6 h-full selection:bg-none' src={Sp_logo} alt="" />
            </div>

            <div className='w-44 h-full flex columns-3 flex-row-reverse'>
                <Button bgcolor="red" onClick={CloseWindow}>
                    <i className="fa-solid fa-xmark"></i>
                </Button>
                <Button bgcolor="#424242" onClick={ToggleMaximizeWindow}>
                    <i className="fa-solid fa-compress"></i>
                </Button>
                <Button bgcolor="#424242" onClick={MinimizeWindow}>
                    <i className="fa-solid fa-minus"></i>
                </Button>
            </div>
        </header>
    )
}

const Button = styled.button`
    width: 33%;
    color: white;
    transition: background-color .2s;

    &:hover{
        background-color: ${(props)=>props.bgcolor};
    }
`