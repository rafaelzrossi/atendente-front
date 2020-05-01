import React, {useState} from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Product() {

    const { name } = useParams();
    const [clicks, setClicks] = useState(0);

    return (<>

        <Link to='/product/Outro'>Next</Link>
        <h1 onClick={(e)=>{setClicks(c => c + 1)}}>{name}</h1>
        <h2>{clicks}</h2>
        {
            [...Array(20).keys()].map(e => <h2 key={e}>{e}</h2>)
        }

    </>)
}
