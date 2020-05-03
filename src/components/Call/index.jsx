import React, { useState, useEffect } from 'react';

import Logo from '../../svgs/LogoVTEXPersonal';


export default function Call() {
    
    const [page, setPage] = useState();

    function popUp() {
        if(page){
            page.close();
        }
        const myWindow = window.open("https://77173fa1.ngrok.io/", "", "width=530,height=243");
        setPage(myWindow);
    }

    useEffect(() => {
        return () => {
            if(page){
                page.close();
            }
        }
    }, [page]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 10,
                right: 5,
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                backgroundColor: '#ed125f',
                color: '#F0F0F0',
                display: 'flex',
                justifyContent:'center',
                alignItems:'center',
                padding: '7px',
                boxSizing: 'border-box',
                cursor: 'pointer'
            }}
            onClick={popUp}
        
        >
            {/* <MdPhoneInTalk /> */}
            <Logo />
        </div>
    )
}
