import React, { useState, useEffect } from 'react';

// import Logo from '../../svgs/LogoVTEXPersonal';
import { MdPhoneInTalk } from "react-icons/md";


export default function Call() {
    
    const [page, setPage] = useState();

    function popUp(event) {
        if(!event.isTrusted) return;
        if(page){
            page.close();
        }
        const myWindow = window.open("https://atendentechamada.herokuapp.com/", "", "width=530,height=243");
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
                bottom: 120,
                right: 5,
                width: '45px',
                height: '45px',
                borderRadius: '50%',
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
