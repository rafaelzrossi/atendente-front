import React, {useEffect, useRef, useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import socketio from 'socket.io-client';

import Mouse from '../../components/VirtualMouse';

import debounce from '../../utils/debounce';

export default function Product() {
    const { name } = useParams();
    // const { pathname } = useLocation();

    const [clicks, setClicks] = useState(0);
    const [useMouse, setUseMouse] = useState(false);
    // const [attached, setAttached] = useState('');

    const mouseRef = useRef();
    const divRef = useRef();

    const handleMounseMove = (socket, target) => event => {
        const coordinates = {
            x: event.pageX,
            y: event.pageY, 
        }
        if(socket){
            socket.emit('mouseMove', {coordinates, target});
        }
    }

    useEffect(() => {
        const socket = socketio(process.env.REACT_APP_API_URL.replace(/^http/, 'ws'), {
            query: {
                // pathname,
                type: 'client'
            }
        });

        socket.on('connected', id => {
            console.log('My id: ', id);
        });

        socket.on('attach', target => {
            console.log('attached', target);
            
            setUseMouse(true);
            const mouseMove = debounce(handleMounseMove(socket, target), 3);
            document.body.onmousemove = mouseMove;
            document.body.onclick = (event) => {
                if(event.isTrusted)
                    socket.emit('mouseClick', target);
            };

            socket.on('mouseMove', params => {
                mouseRef.current.setPosition(params);
            });
    
            socket.on('mouseClick', () => {
                const {x, y} = mouseRef.current.getPosition();
                const element = document.elementsFromPoint(x, y)[1];
                if(element)
                    element.click();
            });
    
            socket.on('keyPress', key => {
                switch (key) {
                    case 'b':
                        mouseRef.current.blink(b => !b);
                        break;
                    case 's':
                        const {x, y} = mouseRef.current.getPosition();
                        window.scrollTo(x, y-50);
                        break;
                    default:
                        break;
                }
            });

        });
    }, [])

    return (
        <div ref={divRef}>
            <div id='mouseContainer'>
            {useMouse && <Mouse ref={mouseRef}/>}
            </div>
            <h1 onClick={(e)=>{setClicks(c => c + 1)}}>{name}</h1>
            <h2>{clicks}</h2>
            {
                [...Array(20).keys()].map(e => <h2 key={e}>{e}</h2>)
            }
        </div>
    )
}
