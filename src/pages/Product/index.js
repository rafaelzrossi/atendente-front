import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Content from '../../components/Content';

import section from '../../styles/layout/Section';

import products from './products.json'

export default function Product() {

    const { name } = useParams();
    const [selected, setSelected] = useState(1);
    const [product, setProduct] = useState();

    const styles = {
        subImage: (sub) => ({
            maxWidth: '80px',
            margin: '0 5px',
            cursor: 'pointer',
            border: sub === selected? '3px solid #333' : '3px solid #fff',
        })
    }

    useEffect(() => {
        // fetch('https://picsum.photos/1080/720')
        // .then(data => {
        //     console.log(data);
        // })
        new Promise(resolve => {
            const p = products.find(i => i.name === name);
            if(p){
                setProduct(p);
            }else{
                setProduct({
                    name,
                    img1: 'https://picsum.photos/540/360',
                    img2: 'https://picsum.photos/540/360',
                    price: '10',
                })
            }

            return resolve();
        })
    }, [name]);

    return (<div style={{overflowX: 'hidden'}}>
        <Header />

        <Content>
            <div style={{maxWidth: '50%', minWidth: '800px'}}>
                { product && <>
                    <img src={product['img'+selected]} style={{width: '100%'}} alt='Imagem 1'/>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={product['img1']} style={styles.subImage(1)} onClick={()=>setSelected(1)} alt='seleciona imagem 1'/>
                        <img src={product['img2']} style={styles.subImage(2)} onClick={()=>setSelected(2)} alt='seleciona imagem 2'/>
                    </div>
                </>}

                <div style={{display: 'flex', width: '100%', padding: '0 20px'}}>
                    <div style={section.container}>
                        <div style={{marginBottom: '100px'}}>
                            <h1 style={{...section.header, fontSize: '22px'}}>Sou o produto - {name}</h1>
                            <p style={section.body}>Sou a descrição de um produto. Sou um ótimo lugar para adicionar mais detalhes sobre o seu produto, como tamanho, material, cuidados especiais e instruções para limpeza.</p>
                        </div>
                        <div style={{...section.container}}>
                            <h1 style={{...section.header}}>INFORMAÇÕES DO PRODUTO</h1>
                            <p style={section.body}>Sou um detalhe do produto. Sou um ótimo lugar para adicionar mais detalhes sobre o seu produto, como tamanho, material, cuidados especiais e instruções para limpeza. Este também é um ótimo lugar para escrever o que torna seu produto especial e como seus clientes podem se beneficiar deste item.</p>
                        </div>
                        <div style={{...section.container, borderTop: '1px solid #CCC'}}>
                            <h1 style={section.header}>POLÍTICA DE RETORNO E REEMBOLSO</h1>
                            <p style={section.body}>Sou a política de Retorno e Reembolso. Sou um ótimo lugar para que seus clientes saibam o que fazer caso estejam insatisfeitos com a compra. Ter uma política de reembolso ou de retorno é uma ótima maneira de estabelecer a confiança e garantir compras com segurança.</p>
                        </div>
                        <div style={{...section.container, borderTop: '1px solid #CCC'}}>
                            <h1 style={section.header}>INFORMAÇÕES DE ENTREGA</h1>
                            <p style={section.body}>Sou a política de frete. Sou um ótimo lugar para adicionar mais informações sobre seus métodos de frete, embalagem e custo. Oferecer informações claras sobre sua política de frete é uma ótima maneira de estabelecer confiança com os clientes e garantir compras com segurança.</p>
                        </div>
                    </div>
                    <div style={section.secundary} >
                        {product && <h1 style={section.price}>R$ {product.price},00</h1>}
                        <div style={{marginTop: '30px', display: 'flex', flexDirection:'column'}}>
                            <label style={{marginBottom: '12px'}}>Quantidade</label>
                            <input
                                type="number"
                                step='1'
                                min='1'
                                defaultValue='1'
                                style={{
                                    border: '1px solid #DDD',
                                    height: '40px',
                                    fontSize: '18px',
                                    fontWeight: 'lighter',
                                    color: '#555',
                                    width: '75px',
                                }}
                            />
                            <button
                                style={{
                                    backgroundColor: 'rgb(122, 134, 153)',
                                    padding: '8px 16px',
                                    color: '#EEE',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '20px'
                                }}
                            >
                                Adicionar ao carrinho
                            </button>
                        </div>
                    </div>
                </div>
                {/* {clicks}
                <img src="https://picsum.photos/300/300"/>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum magnam sunt placeat commodi ipsum cum soluta minima nobis, illo nesciunt, eos cumque, facilis odit officiis possimus? Tempora, deserunt? Molestiae, eaque.
                </p> */}
            </div>
        </Content>

        <Footer />

        {/* <Link to='/product/Outro'>Next</Link>
        <h1 onClick={(e)=>{setClicks(c => c + 1)}}>{name}</h1>
        <h2>{clicks}</h2>
        {
            [...Array(20).keys()].map(e => <h2 key={e}>{e}</h2>)
        } */}

    </div>)
}