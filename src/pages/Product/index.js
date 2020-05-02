import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Content from '../../components/Content';

import section from '../../styles/layout/Section';

export default function Product() {

    const { name } = useParams();
    const [clicks, setClicks] = useState(0);
    const [selected, setSelected] = useState(0);

    const styles = {
        subImage: (sub) => ({
            maxWidth: '80px',
            margin: '0 5px',
            cursor: 'pointer',
            border: sub === selected? '1px solid #333' : '1px solid #fff',
        })
    }

    // useEffect(() => {
    //     fetch('https://picsum.photos/1080/720')
    //     .then(data => {
    //         console.log(data);
    //     })
    // }, [])

    return (<div style={{overflowX: 'hidden'}}>
        <Header />

        <Content>
            <div style={{maxWidth: '66%'}}>
                <img src="https://picsum.photos/1080/720" style={{width: '100%'}}/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img src="https://picsum.photos/80" style={styles.subImage(0)} onClick={()=>setSelected(0)}/>
                    <img src="https://picsum.photos/80/80" style={styles.subImage(1)} onClick={()=>setSelected(1)}/>
                </div>
                <div>
                    <h1 style={section.header}>Sou o produto - {name}</h1>
                    <p style={section.body}>Sou a descrição de um produto. Sou um ótimo lugar para adicionar mais detalhes sobre o seu produto, como tamanho, material, cuidados especiais e instruções para limpeza.</p>
                </div>
                <div style={section.container}>
                    <h1 style={section.header}>INFORMAÇÕES DO PRODUTO</h1>
                    <p style={section.body}>Sou um detalhe do produto. Sou um ótimo lugar para adicionar mais detalhes sobre o seu produto, como tamanho, material, cuidados especiais e instruções para limpeza. Este também é um ótimo lugar para escrever o que torna seu produto especial e como seus clientes podem se beneficiar deste item.</p>
                </div>
                <div style={section.container}>
                    <h1 style={section.header}>POLÍTICA DE RETORNO E REEMBOLSO</h1>
                    <p style={section.body}>Sou a política de Retorno e Reembolso. Sou um ótimo lugar para que seus clientes saibam o que fazer caso estejam insatisfeitos com a compra. Ter uma política de reembolso ou de retorno é uma ótima maneira de estabelecer a confiança e garantir compras com segurança.</p>
                </div>
                <div style={section.container}>
                    <h1 style={section.header}>INFORMAÇÕES DE ENTREGA</h1>
                    <p style={section.body}>Sou a política de frete. Sou um ótimo lugar para adicionar mais informações sobre seus métodos de frete, embalagem e custo. Oferecer informações claras sobre sua política de frete é uma ótima maneira de estabelecer confiança com os clientes e garantir compras com segurança.</p>
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