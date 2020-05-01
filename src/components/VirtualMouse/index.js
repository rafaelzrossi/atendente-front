import React, {useState, forwardRef, useImperativeHandle} from 'react';
import { MdNearMe } from "react-icons/md";

import Blink from '../Blink'

const Mouse = forwardRef((props, ref) => {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [blink, setBlink] = useState(false);

    useImperativeHandle(ref, () => ({
        setPosition,
        getPosition: () => position,
        blink: (func) => {
            setBlink(func(blink));
            // setBlink(true);
            // setTimeout(()=>{
            //     setBlink(false);
            // }, 2100);
        },
        getBlink: () => blink,

      }));

    return (<>
        { blink && <Blink left={position.x} top={position.y} /> }
        <div id='virtualMouse'
        style={
            {
                width: 20, 
                height: 20, 
                position: 'absolute', 
                zIndex: 100, 
                left: position.x, 
                top: position.y, 
                backgroundColor: 'none',
            }
        }>
            <MdNearMe style={{fontSize: '20px', transform: 'rotate(-90deg)', padding: 0}} />
        </div>
    </>)
});

export default Mouse;
