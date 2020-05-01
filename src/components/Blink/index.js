import React, {useState, useEffect} from 'react';

export default function Blink({left=0, top=0}) {

    const [radius, setRadius] = useState(0);

    async function sleep(time) {
        return new Promise(resolve => {
            return setTimeout(resolve, time);
        })
    }

    useEffect(() => {
        let timeout;
        let mounted = true;

        async function setTo(from, to, step, time, wait=500) {
            if(from < to){
                setRadius(from);

                if(from===0) await sleep(wait);
                if(!mounted) return;
                
                timeout = setTimeout(setTo, time, from+step, to, step, time);
            }else{
                setRadius(to);
                timeout = setTimeout(setTo, time, 0, to, step, time);
            }
        }
        setTo(0, 100, 4, 20, 100);

        return () => {
            mounted = false;
            clearTimeout(timeout);
        }
    }, [])

    return (
        <div style={{
            borderRadius: '50%',
            width: radius,
            height: radius,
            border: '5px groove rgba(0,0,255, 0.3)',
            position: 'absolute',
            left: left - (radius/2) - 5,
            top: top - (radius/2) - 5,
            zIndex: 100,
            pointerEvents: 'none'
        }}>
            
        </div>
    )
}
