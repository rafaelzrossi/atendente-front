import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import socketio from 'socket.io-client';

import IFrame from '../../components/iFrame';
import Mouse from '../../components/VirtualMouse';
import debounce from '../../utils/debounce';

export default function VirtualSeller() {
    const [socket, setSocket] = useState(undefined);
    const [target, setTarget] = useState('');
    const [clientPath, setClientPath] = useState('');
    const [clients, setClients] = useState([]);

    const client_ref = useRef();
    const mouseRef = useRef();

    function handleMouse(event) {
        const coordinates = {
            x: event.pageX,
            y: event.pageY, 
        }
        if(socket){
            socket.emit('mouseMove', {coordinates, target});
            
        }
    }
    function handleMouseClick(event) {
        if(socket && event.isTrusted)
            socket.emit('mouseClick', target);
    }
 
    const _handle = debounce(handleMouse, .5);

    const onKeyPress = (event) => {
        if(socket)
            socket.emit('keyPress',  {key: event.key, target});
    }

    const handleClient = (doc=document) => {
        client_ref.current = doc;
        return ReactDOM.render(<Mouse ref={mouseRef}/>, doc.getElementById('mouseContainer'));
    }

    function attach(id) {
        setTarget(id);
        socket.emit('attach', id);
    }

    useEffect(() => {
        // const _target = prompt('Client id', '');
        // setTarget(_target);

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

        _socket.on('mouseMove', coord =>{
            if(client_ref.current){
                // const elem = client_ref.current.elementsFromPoint(coord.x, coord.y);
                mouseRef.current.setPosition(coord);
            }
        });

        _socket.on('mouseClick', () =>{
            const {x, y} = mouseRef.current.getPosition();
            const elements = client_ref.current.elementsFromPoint(x+1, y+1);
            const element = elements[2]
            // console.log(elements, element, 2);
            if(element)
                element.click();
        })
        _socket.on('setPath', (path) =>{
            console.log(path);
            if(path){
                const _path = new URL(path, process.env.REACT_APP_URL);
                _path.searchParams.set('isClient', 'false')
                setClientPath(_path);
            }
        })

        setSocket(_socket);

        return () => {
            setTarget('');
            setSocket(undefined);
        }
    }, []);

    return (<>
        {target ? 
            <IFrame path={clientPath} listener={_handle} onClick={handleMouseClick} onKeyPress={onKeyPress} insideRef={handleClient}/>
            :
            <div>
                <h1>Clients</h1>
                {clients.map((c, k) => 
                    <span key={k} onClick={() => attach(c.id)} >
                        {c.name}
                    </span>
                )}
            </div>
        }
    </>)
}
