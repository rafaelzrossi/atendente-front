import React, {useRef, useEffect, memo} from 'react';

function IFrame({listener, onKeyPress, onClick, insideRef=()=>{}, path='', frameSize, myMouse}) {
    const iframeRef = useRef();

    useEffect(() => {
        const keep_listener = listener;
        const keep_onClick = onClick;
        const keep_onKeyPress = onKeyPress;
        const keep_myMouse = myMouse;


        let ref;

        const time = setTimeout(() => {
            try{

                ref = iframeRef.current;
                
                ref.contentWindow.document.body.addEventListener('mousemove', keep_listener, false);
                ref.contentWindow.document.body.addEventListener('mousemove', keep_myMouse, false);
                ref.contentWindow.document.body.addEventListener('click', keep_onClick, false);
                ref.contentWindow.document.body.addEventListener('keypress', keep_onKeyPress, false);

                insideRef(ref.contentWindow.document);

            }catch{
                
            }
        }, 1000);

        return () => {
            clearTimeout(time);
            try{
                ref.contentWindow.document.body.removeEventListener('mousemove', keep_listener, false);
                ref.contentWindow.document.body.removeEventListener('mousemove', keep_myMouse, false);
                ref.contentWindow.document.body.removeEventListener('click', keep_onClick, false);
                ref.contentWindow.document.body.removeEventListener('keypress', keep_onKeyPress, false);
            }catch {}
        }

    }, [path, listener, onClick, onKeyPress, insideRef, myMouse]);

    return (
        <div style={{width: '100vw', height: '100vh'}}>
       {frameSize && <iframe src={path} title="myFrame" width={frameSize.width} height={frameSize.height} ref={iframeRef} frameBorder='0'/>}
        </div>
    )
}

export default memo(IFrame);