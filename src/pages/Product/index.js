import React, {useEffect, useRef, useState} from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import Mouse from '../../components/VirtualMouse';

import debounce from '../../utils/debounce';

export default function Product() {
    const { name } = useParams();
    const { pathname } = useLocation();

    const [clicks, setClicks] = useState(0);
    const [useMouse, setUseMouse] = useState(false);
    // const [attached, setAttached] = useState('');

    const mouseRef = useRef();
    const divRef = useRef();

    const location = useRef();

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
        
        if(typeof location.current === 'function'){
            //console.log(pathname);
            location.current(pathname);
        }
        
    }, [pathname])

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
            
            socket.emit('setPath', {target, pathname});
            location.current = (path) => {
                socket.emit('setPath', {target, pathname: path});
            };

            setUseMouse(true);
            const mouseMove = debounce(handleMounseMove(socket, target), .6);
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
                const elements = document.elementsFromPoint(x+1, y+1);
                const element = elements[2];
                // console.log(elements, element, 2);
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
                        window.scrollTo(x, y - window.innerHeight/2);
                        break;
                    default:
                        break;
                }
            });

        });
    // eslint-disable-next-line
    }, []);

    return (
        <div ref={divRef}>
            <div id='mouseContainer'>
            {useMouse && <Mouse ref={mouseRef}/>}
            </div>
            <Link to='/product/Outro'>Next</Link>
            <h1 onClick={(e)=>{setClicks(c => c + 1)}}>{name}</h1>
            <h2>{clicks}</h2>
            {
                [...Array(20).keys()].map(e => <h2 key={e}>{e}</h2>)
            }
        </div>
    )
}
