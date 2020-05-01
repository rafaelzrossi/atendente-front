import React, {useEffect, useRef, useState} from 'react';
import { useLocation, BrowserRouter, Switch, Route } from 'react-router-dom';
import socketio from 'socket.io-client';

import Mouse from '../components/VirtualMouse';

import Product from '../pages/Product';

import debounce from '../utils/debounce';

export default function Client() {
    const { pathname } = useLocation();
    const isClient = useQuery().get('isClient') !== 'false';
    
    const [useMouse, setUseMouse] = useState(false);

    const mouseRef = useRef();
    const divRef = useRef();
    const name = useRef();
    const timer = useRef();
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

    useEffect(() => {
        
        if(typeof location.current === 'function'){
            //console.log(pathname);
            location.current(pathname);
        }
        
    }, [pathname])

    useEffect(() => {
        
        
        if(isClient){

            name.current = prompt("Nome?", name.current);

            const socket = socketio(process.env.REACT_APP_API_URL.replace(/^http/, 'ws'), {
                query: {
                    // pathname,
                    type: 'client',
                    name: name.current
                }
            });
    
            socket.on('connected', id => {
                // console.log('My id: ', id);
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
    
                
                const keepAlive = debounce(()=>{
                    socket.emit('addClient');
                }, 5000);

                
                socket.on('keepAlive', () => {
                    keepAlive();
                    socket.emit('keepAlive', target);
                })

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

        }

        
    // eslint-disable-next-line
    }, []);

    return (
        <div ref={divRef}>
            <div id='mouseContainer'>
            {useMouse && <Mouse ref={mouseRef}/>}
            </div>
            <BrowserRouter>
                <Switch>
                    <Route path='/product/:name' component={Product} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}