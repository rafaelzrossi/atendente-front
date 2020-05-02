import React, {useState} from 'react';
import { useParams, Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Content from '../../components/Content';

export default function Product() {

    const { name } = useParams();
    const [clicks, setClicks] = useState(0);

    return (<>
        <Header />

        <Content>
            <div style={{marginLeft: '30%', maxWidth: '30%'}}>
                <h1 onClick={()=>setClicks(c => c + 1)}>{name}</h1>
                {clicks}
                <img src="https://picsum.photos/300/300"/>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum magnam sunt placeat commodi ipsum cum soluta minima nobis, illo nesciunt, eos cumque, facilis odit officiis possimus? Tempora, deserunt? Molestiae, eaque.
                </p>
            </div>
        </Content>

        <Footer />

        {/* <Link to='/product/Outro'>Next</Link>
        <h1 onClick={(e)=>{setClicks(c => c + 1)}}>{name}</h1>
        <h2>{clicks}</h2>
        {
            [...Array(20).keys()].map(e => <h2 key={e}>{e}</h2>)
        } */}

    </>)
}
