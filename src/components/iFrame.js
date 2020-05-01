import React, {useRef, useEffect, memo} from 'react';

function IFrame({listener, onKeyPress, onClick, insideRef=()=>{}, path=''}) {
    const iframeRef = useRef();

    useEffect(() => {
        const keep_listener = listener;
        const keep_onClick = onClick;
        const keep_onKeyPress = onKeyPress;
        const keep_scroll = (event) => {
            console.log(event);
        };

        let ref;

        const time = setTimeout(() => {
            try{

                ref = iframeRef.current;
                
                ref.contentWindow.document.body.addEventListener('mousemove', keep_listener, false);
                ref.contentWindow.document.body.addEventListener('click', keep_onClick, false);
                ref.contentWindow.document.body.addEventListener('keypress', keep_onKeyPress, false);
                ref.contentWindow.document.body.addEventListener('scroll', keep_scroll, false);

                insideRef(ref.contentWindow.document);

            }catch{
                
            }
        }, 1000);

        return () => {
            clearTimeout(time);
            try{
                ref.contentWindow.document.body.removeEventListener('mousemove', keep_listener, false);
                ref.contentWindow.document.body.removeEventListener('click', keep_onClick, false);
                ref.contentWindow.document.body.removeEventListener('keypress', keep_onKeyPress, false);
                ref.contentWindow.document.body.removeEventListener('scroll', keep_scroll, false);
            }catch {}
        }

    }, [path, listener, onClick, onKeyPress, insideRef]);

    return (
        <iframe src={path} title="myFrame" width="500" height="500" ref={iframeRef} />
    )
}

export default memo(IFrame);