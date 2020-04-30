import React, {useState, forwardRef, useImperativeHandle} from 'react';

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
                width: 10, 
                height: 10, 
                position: 'absolute', 
                zIndex: 100, 
                left: position.x, 
                top: position.y, 
                backgroundColor: 'black',
            }
        }>
            
        </div>
    </>)
});

export default Mouse;
