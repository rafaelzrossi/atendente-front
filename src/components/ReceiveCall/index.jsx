import React, { useState, useEffect } from 'react';

// import Logo from '../../svgs/LogoVTEXPersonal';
import { MdPhoneInTalk } from "react-icons/md";


export default function Call() {
    
    const [page, setPage] = useState();

    function popUp() {
        if(page){
            page.close();
        }
        const myWindow = window.open("https://atendentechamada.herokuapp.com/dashboard", "", "width=530,height=243");
        setPage(myWindow);
    }

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 160,
                right: 5,
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                // backgroundColor: '#ed125f',
                backgroundColor: '#1ba62d',
                color: '#FFF',
                display: 'flex',
                justifyContent:'center',
                alignItems:'center',
                padding: '7px',
                boxSizing: 'border-box',
                cursor: 'pointer',
                overflow: 'hidden'
            }}
            onClick={popUp}
        
        >
            <MdPhoneInTalk />
            {/* <Logo /> */}
        </div>
    )
}
