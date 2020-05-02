import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Content from '../../components/Content';

import products from '../Product/products.json'

export default function Shop() {
    return (<>
        <Header />
            <Content>

            <div style={{maxWidth: '50%', minWidth: '800px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>

            { products.map((p, k) => 
                <Product key={k} product={p} />
                // <div key={k} style={{width: '25%', padding: '5px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', cursor: 'pointer'}}>
                //     <Image product={p}/>
                //     <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                //         <h3 style={{margin: '10px 0', textAlign: 'center'}}>{p.name}</h3>
                //         <h3 style={{textAlign: 'center'}}>R$ {p.price},00</h3>
                //     </div>
                // </div>
            )}

            {/* <div style={{height: 30, width: '23%', border: '1px solid black'}}></div>
            <div style={{height: 30, width: '23%', border: '1px solid black'}}></div>
            <div style={{height: 30, width: '23%', border: '1px solid black'}}></div>
            <div style={{height: 30, width: '23%', border: '1px solid black'}}></div>
            <div style={{height: 30, width: '23%', border: '1px solid black'}}></div> */}

            </div>

            </Content>
        <Footer />
    </>)
}

function Product({product}) {

    const ref = useRef();
    return(
        <div ref={ref} style={{width: '25%', padding: '5px', boxSizing: 'border-box', backgroundColor: '#FAFAFA', cursor: 'pointer'}}>
            <Link to={`/product/${product.name}`} style={{textDecoration: 'none', color: '#333'}}>
                <Image product={product} wRef={ref}/>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <h3 style={{margin: '10px 0', textAlign: 'center'}}>{product.name}</h3>
                    <h3 style={{textAlign: 'center'}}>R$ {product.price},00</h3>
                </div>
            </Link>
        </div>
    );
}

function Image({product, wRef}) {
    const [image, setImage] = useState(product.img1);
    const [width, setWidth] = useState();
    
    useEffect(() => {
        setWidth(wRef.current.offsetWidth);
    }, [wRef])

    return (<>
    {width &&
        <img 
            style={{
                objectFit:'cover', 
                width: '100%',
                height: width,
            }} 
            src={image} 
            onMouseEnter={()=>setImage(product.img2)} 
            onMouseLeave={()=>setImage(product.img1)}
            alt={`product ${product.name}`}
        />
    }
    </>);
}