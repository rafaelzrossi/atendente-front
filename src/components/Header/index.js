import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div style={styles.container}>
        <h1 style={styles.title}>Meu site.com</h1>
        <div style={styles.nav}>
          <ul style={styles.linksContainer}>
            {/* <li style={styles.linkItem}><Link style={styles.link} to='/home'>Início</Link></li> */}
            <li style={styles.linkItem}><Link style={styles.link} to='/shop'>Loja</Link></li>
          </ul>
        </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    height: 110,
    // position: 'fixed',
    // top: 0,
    overflow: 'hidden',
    backgroundColor: '#fff',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '60px'
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    margin: 'auto 0',
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  nav: {
    width: '100vw',
    height: 40,
    backgroundColor: '#EEE',
    display: 'flex',
    justifyContent: 'center'
  },
  linksContainer: {
    listStyleType: 'none', 
    margin: 0, 
    padding: 0, 
    display: 'flex',
    flexDirection: 'row',
  },
  linkItem: {
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#333'
  },
}
