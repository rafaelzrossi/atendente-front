import React, {useState, useEffect, useRef, } from 'react';
import ReactDOM from 'react-dom';
import socketio from 'socket.io-client';

import IFrame from '../../components/iFrame';
import Mouse from '../../components/VirtualMouse';
import KeepMousePosition from '../../components/KeepMousePosition';
import Blink from './Blink';
import debounce from '../../utils/debounce';

export default function VirtualSeller() {
    const [socket, setSocket] = useState(undefined);
    const [target, setTarget] = useState('');
    const [clientPath, setClientPath] = useState('');
    const [clients, setClients] = useState([]);
    const [frameSize, setFrameSize] = useState();

    const client_ref = useRef();
    const mouseRef = useRef();
    const blinkRef = useRef();
    const myMouseRef = useRef();

    function handleMouse(event) {
        const coordinates = {
            x: event.pageX,
            y: event.pageY, 
        }
        if(socket){
            socket.emit('mouseMove', {coordinates, target});
            // if(blinkRef.current){
            //     blinkRef.current.setPosition(coordinates);
            // }
        }
    }

    function myMouse(event) {
        const coordinates = {
            x: event.pageX,
            y: event.pageY, 
        }
        myMouseRef.current.setPosition(coordinates);
        blinkRef.current.setPosition(coordinates);
    }

    function handleMouseClick(event) {
        if(socket && event.isTrusted){
            socket.emit('mouseClick', {target, coordinates: myMouseRef.current.getPosition()});
        }
    }
 
    const _handle = debounce(handleMouse, .5);

    const onKeyPress = (event) => {

        if(socket){
            const key = event.key;
            if(key==='b'){
                blinkRef.current.blink(b => !b);
            }
            socket.emit('keyPress',  {key, target});
        }
    }

    const handleClient = (doc=document) => {
        client_ref.current = doc;
        ReactDOM.render(<Mouse ref={mouseRef}/>, doc.getElementById('mouseContainer'));
        ReactDOM.render(<Blink ref={blinkRef}/>, doc.getElementById('blinkContainer'));
    }

    function attach(id) {
        setTarget(id);
        socket.emit('attach', id);
    }

    useEffect(() => {
        console.log(target)
    }, [target])

    useEffect(() => {

        const _socket = socketio(process.env.REACT_APP_API_URL.replace(/^http/, 'ws'), {query: {type: 'Vendendor'}});

        // _socket.emit('attach', _target);

        _socket.emit('getClients');

        _socket.on('getClients', clients =>{
            // console.log(clients);
            if(!target){
                setClients(clients);
            }
        })
    
        _socket.on('connected', id => console.log('Virtual id', id));

        const keepAlive = debounce(() => {
            setTarget(undefined);
        }, 5000);

        _socket.on('keepAlive', (from) =>{
            keepAlive();
            _socket.emit('keepAlive', from);
        });
        _socket.on('mouseMove', coord =>{
            if(client_ref.current){
                // const elem = client_ref.current.elementsFromPoint(coord.x, coord.y);
                mouseRef.current.setPosition(coord);
            }
        });

        _socket.on('mouseClick', ({x, y}) =>{
            // const {x, y} = mouseRef.current.getPosition();
            const elements = client_ref.current.elementsFromPoint(x, y);
            if(elements.length === 0) return;
            let desc;
            if(elements[0].id === 'virtualMouse'){
                desc = 1;
            }else{
                desc = 3;
            }
            const element = elements[desc];
            // console.log('click coordenadas', {x, y});
            // console.log('click no elemento', element);
            // console.log('click nos elementos', elements);
            if(element){
                element.click();
            }
        })
        _socket.on('setPath', (path) =>{
            if(path){
                const _path = new URL(path, process.env.REACT_APP_URL);
                _path.searchParams.set('isClient', 'false')
                setClientPath(_path);
            }
        })
        _socket.on('setWindow', (size) =>{
            setFrameSize(size);
        })

        setSocket(_socket);

        return () => {
            setSocket(undefined);
            setFrameSize(undefined);
        }
    // eslint-disable-next-line
    }, []);

    return (<>
        {target ?
            <> 
                <KeepMousePosition ref={myMouseRef} />
                <IFrame
                    path={clientPath}
                    listener={_handle}
                    onClick={handleMouseClick}
                    onKeyPress={onKeyPress}
                    insideRef={handleClient}
                    frameSize={frameSize}
                    myMouse={myMouse}
                />
            </>
            :
            <div>
                <div style={{width: 530, height: 243, margin: '0 auto'}}>
                    <iframe src='https://atendentechamada.herokuapp.com/dashboard' title="myFrame" width='100%' height='100%' frameBorder='0'/>
                </div>
                {clients.length > 0 ?
                    <>
                        <h1 style={styles.title}>Clientes Esperando por Atendimento virtual</h1>
                        {clients.map((c, k) => 
                            <span
                                key={k}
                                onClick={() => attach(c.id)}
                                style={{
                                    display: 'block',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    padding: '10px 0',
                                    backgroundColor: '#F0F0F0',
                                    marginBottom: '10px'
                                }}
                            >
                                {c.name}
                            </span>
                        )}
                    </>
                    :
                    <h1 style={styles.title}>Nenhum cliente esperando</h1>
                }

            </div>
        }
    </>)
}

const styles={
    title: {
        textAlign: 'center',
    }
}