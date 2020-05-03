import React, { useState, useEffect } from 'react';

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
                bottom: 0,
                right: 0,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#444'
            }}
            onClick={popUp}
        
        >
            
        </div>
    )
}
