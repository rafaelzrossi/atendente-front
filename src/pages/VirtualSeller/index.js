import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import socketio from 'socket.io-client';

import IFrame from '../../components/iFrame';
import Mouse from '../../components/VirtualMouse';
import debounce from '../../utils/debounce';

export default function VirtualSeller() {
    const [socket, setSocket] = useState(undefined);
    const [target, setTarget] = useState('');

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
 
    const _handle = debounce(handleMouse, 5);

    const onKeyPress = (event) => {
        if(socket)
            socket.emit('keyPress',  {key: event.key, target});
    }

    const handleClient = (doc=document) => {
        // const v_mouse = doc.getElementById('virtualMouse');
        // console.log(doc.getElementById);
        // console.log(doc.body);
        // console.log(doc.getElementById('mouseContainer'));
        client_ref.current = doc;
        return ReactDOM.render(<Mouse ref={mouseRef}/>, doc.getElementById('mouseContainer'));
    }

    useEffect(() => {
        const _target = prompt('Client id', '');
        setTarget(_target);

        const _socket = socketio(process.env.REACT_APP_API_URL.replace(/^http/, 'ws'), {query: {type: 'Vendendor'}});
        _socket.emit('attach', _target);
    
        _socket.on('connected', id => console.log('Virtual id', id));

        _socket.on('mouseMove', coord =>{
            if(client_ref.current){
                // const elem = client_ref.current.elementsFromPoint(coord.x, coord.y);
                mouseRef.current.setPosition(coord);
            }
        });

        _socket.on('mouseClick', () =>{
            const {x, y} = mouseRef.current.getPosition();
            const elem = client_ref.current.elementsFromPoint(x, y)[1];
            if(elem)
                elem.click();
        })

        setSocket(_socket);

        return () => {
            setTarget('');
            setSocket(undefined);
        }
    }, []);

    return (<>
        {socket && <IFrame listener={_handle} onClick={handleMouseClick} onKeyPress={onKeyPress} insideRef={handleClient}/>}
    </>)
}
