import React, {useEffect, useRef, useState, useCallback} from 'react';
import { useLocation, BrowserRouter, Switch, Route } from 'react-router-dom';
import socketio from 'socket.io-client';

import Mouse from '../components/VirtualMouse';
import KeepMousePosition from '../components/KeepMousePosition';
import Call from '../components/Call';
import Login from '../components/Login';

import Product from '../pages/Product';
import Shop from '../pages/Shop';

import debounce from '../utils/debounce';

export default function Client() {
    const { pathname } = useLocation();
    const isClient = useQuery().get('isClient') !== 'false';
    
    const [useMouse, setUseMouse] = useState(false);
    const [name, setName] = useState(undefined);

    const mouseRef = useRef();
    const myMouseRef = useRef();
    // const name = useRef();
    const location = useRef();


    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const handleMounseMove = (socket, target) => event => {
        const coordinates = {
            x: event.pageX,
            y: event.pageY, 
        }
        if(socket){
            socket.emit('mouseMove', {coordinates, target});
        }
    }

    function myMouse(event) {
        const coordinates = {
            x: event.pageX,
            y: event.pageY, 
        }
        myMouseRef.current.setPosition(coordinates);
    }

    const nameChange = useCallback(
        (name) => {
            setName(name);
        },
        [setName],
    )

    useEffect(() => {
        
        if(typeof location.current === 'function'){
            location.current(pathname);
        }
        
    }, [pathname])

    useEffect(() => {
        
        const keep_name = name;
        let keep_socket = undefined; 
        if(isClient && keep_name){

            const socket = socketio(process.env.REACT_APP_API_URL.replace(/^http/, 'ws'), {
                query: {
                    // pathname,
                    type: 'client',
                    name: keep_name
                }
            });
            keep_socket = socket;

            socket.on('connected', id => {
                // console.log('My id: ', id);
            });
     
            socket.on('attach', target => {
                console.log('attached', target);
                
                socket.emit('setPath', {target, pathname});
                location.current = (path) => {
                    socket.emit('setPath', {target, pathname: path});
                };

                socket.emit('setWindow', {target, width: window.innerWidth, height: window.innerHeight});
                // document.body.addEventListener('resize', event => console.log(event))
                window.onresize = () => {
                    socket.emit('setWindow', {target, width: window.innerWidth, height: window.innerHeight});
                };

                socket.emit('setPath', {target, pathname});
                location.current = (path) => {
                    socket.emit('setPath', {target, pathname: path});
                };
    
                setUseMouse(true);
                const mouseMove = debounce(handleMounseMove(socket, target), .6);
                document.body.onmousemove = undefined;
                document.body.addEventListener('mousemove', mouseMove);
                document.body.addEventListener('mousemove', myMouse);
                document.body.onclick = (event) => {
                    if(event.isTrusted)
                        socket.emit('mouseClick', {target, coordinates: myMouseRef.current.getPosition()});
                };
                
                const keepAlive = debounce(()=>{
                    socket.emit('addClient');
                    setUseMouse(false);
                }, 6000);

                // console.log('Emit keepAlive');
                socket.emit('keepAlive', target);

                socket.on('keepAlive', () => {
                    keepAlive();
                    setTimeout(()=>{
                        socket.emit('keepAlive', target);
                    }, 4000);
                })

                socket.on('mouseMove', params => {
                    mouseRef.current.setPosition(params);
                });
        
                socket.on('mouseClick', ({x, y}) => {
                    // const {x, y} = mouseRef.current.getPosition();
                    const elements = document.elementsFromPoint(x, y);
                    const element = elements[1];
                    // console.log(elements)
                    console.log('click coordenadas', {x, y});
                    console.log('click no elemento', element);
                    console.log('click nos elementos', elements);
                    if(element){
                        // element.click();
                        element.dispatchEvent(new MouseEvent('click', {bubbles: true}))
                    }
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

        }
   
        return () => {
            if(keep_socket){
                keep_socket.disconnect()
            }
        }

    // eslint-disable-next-line
    }, [name]);

    return (
        <>
            
            { isClient && <> 
                <Call />
                <Login onChange={nameChange} />
            </>}
            <KeepMousePosition ref={myMouseRef} />
            <div id='mouseContainer'>
            {useMouse && <Mouse ref={mouseRef}/>}
            </div>
            <div id='blinkContainer'></div>
            <BrowserRouter>
                <Switch>
                    <Route path='/shop' component={Shop} />
                    <Route path='/product/:name' component={Product} />
                </Switch>
            </BrowserRouter>
        </>
    )
}