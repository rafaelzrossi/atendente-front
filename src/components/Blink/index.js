import React, {useState, useEffect} from 'react';

export default function Blink({left=0, top=0}) {

    const [radius, setRadius] = useState(0);

    useEffect(() => {
        let time;
        
        function setTo(to, from) {
            const next = from + 10;
            if(next < to){
                setRadius(next);
                time = setTimeout(setTo, 100, to, next);
            }else{
                setRadius(to);
                time = setTimeout(setTo, 100, to, 0);
            }
        }
        setTo(100, 0);

        return () => {
            clearTimeout(time);
        }
    }, [])

    return (
        <div style={{
            borderRadius: '50%',
            width: radius,
            height: radius,
            border: '5px groove rgba(0,0,255, 0.3)',
            position: 'absolute',
            left: left - (radius/2),
            top: top - (radius/2),
            zIndex: 100,
        }}>
            
        </div>
    )
}
