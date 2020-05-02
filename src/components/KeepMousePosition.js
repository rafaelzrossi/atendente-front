import React, {useImperativeHandle, useState, forwardRef} from 'react'

function KeepMousePosition(props, ref) {
    
    const [position, setPosition] = useState();

    useImperativeHandle(ref, () => ({
        getPosition: () => position,
        setPosition,
    }));


    return  (<></>);
}

export default forwardRef(KeepMousePosition); 