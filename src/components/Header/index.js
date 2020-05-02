import React from 'react';

export default function Header() {
  return (
    <div style={styles.container}>
        <h1 style={{textAlign: 'center', textTransform: 'uppercase', margin: 'auto 0'}}>Meu site.com</h1>
    </div>
  );
}

const styles = {
    container: {
        width: '100vw',
        height: 70,
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        backgroundColor: '#2b71cc',
        color: '#86bdf7',
        display: 'flex',
        justifyContent: 'center'
    }
}
