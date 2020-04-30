import React, {useRef, useEffect, useCallback, memo} from 'react';

function IFrame({listener, onKeyPress, onClick, insideRef=()=>{}}) {
    const iframeRef = useRef();

    const addEventListener = useCallback(
        () => {
            setTimeout(() => {
                try{
                    iframeRef.current.contentWindow.document.body.addEventListener('mousemove', listener);
                    iframeRef.current.contentWindow.document.body.addEventListener('click', onClick, false);
                    iframeRef.current.contentWindow.document.body.addEventListener('keypress', onKeyPress, false);

                    insideRef(iframeRef.current.contentWindow.document);

                }catch{
                    
                }
            }, 1000);
        },
        [listener, onClick, onKeyPress, insideRef]
    )

    useEffect(() => {
        addEventListener();
    }, [addEventListener]);

    return (
        <iframe src={`/product/prod`} title="myFrame" width="500" height="500" ref={iframeRef} />
    )
}

export default memo(IFrame);