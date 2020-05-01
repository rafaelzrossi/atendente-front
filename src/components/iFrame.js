import React, {useRef, useEffect, memo} from 'react';

function IFrame({listener, onKeyPress, onClick, insideRef=()=>{}, path=''}) {
    const iframeRef = useRef();

    useEffect(() => {
        const keep_listener = listener;
        const keep_onClick = onClick;
        const keep_onKeyPress = onKeyPress;

        const time = setTimeout(() => {
            try{
                
                iframeRef.current.contentWindow.document.body.addEventListener('mousemove', keep_listener, false);
                iframeRef.current.contentWindow.document.body.addEventListener('click', keep_onClick, false);
                iframeRef.current.contentWindow.document.body.addEventListener('keypress', keep_onKeyPress, false);

                insideRef(iframeRef.current.contentWindow.document);

            }catch{
                
            }
        }, 1000);

        return () => {
            clearTimeout(time);
            try{
                iframeRef.current.contentWindow.document.body.removeEventListener('mousemove', keep_listener, false);
                iframeRef.current.contentWindow.document.body.removeEventListener('click', keep_onClick, false);
                iframeRef.current.contentWindow.document.body.removeEventListener('keypress', keep_onKeyPress, false);
            }catch {}
        }

    }, [path]);

    return (
        <iframe src={path} title="myFrame" width="500" height="500" ref={iframeRef} />
    )
}

export default memo(IFrame);