import React, { useState, useEffect } from 'react';
import { MdNearMe, MdClose } from "react-icons/md";

export default function Login({onChange}) {
    
    const [name, setName] = useState();

    useEffect(() => {
        onChange(name);
    }, [name, onChange]);

    function click() {
       const name_ = prompt('Qual seu nome?');
       if(name_){
           setName(name_);
       }
    }

    function disable() {
        setName(undefined);
    }

    return (<>
        {name ?
            <div
            style={{
                position: 'fixed',
                bottom: 65,
                right: 5,
                width: 'auto',
                minWidth: '45px',
                height: '45px',
                borderRadius: '25px',
                backgroundColor: '#787878',
                color: '#F0F0F0',
                display: 'flex',
                justifyContent:'center',
                alignItems:'center',
                padding: '10px',
                boxSizing: 'border-box',
                cursor: 'pointer'
            }}
            onClick={disable}
        
        >
            {name}<MdClose />
        </div>
            :
            <div
                style={{
                    position: 'fixed',
                    bottom: 65,
                    right: 5,
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    backgroundColor: '#787878',
                    color: '#F0F0F0',
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    padding: '7px',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                }}
                onClick={click}
            
            >
                <MdNearMe style={{transform: 'rotate(-90deg)'}} />
            </div>
        }
    </>)
}
