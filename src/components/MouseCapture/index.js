import React from 'react';

export default function MouseCapture({children, onMouseHover}) {
    function _handleMouseMove(event) {
        onMouseHover({
            x: event.pageX,
            y: event.pageY, 
        });
    }
    return (
        <div onMouseMove={_handleMouseMove} style={{display: 'inline'}}>
            {children}
        </div>
    )
}
