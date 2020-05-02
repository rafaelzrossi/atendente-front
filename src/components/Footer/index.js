import React from 'react';

export default function Footer() {
  return (
    <div style={styles.container}>
        <div style={styles.content}>
        &copy;2020. Feito especialmente pela equipe 26. &hearts;
        </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: 200,
    // position: 'fixed',
    // bottom: 0,
    overflow: 'hidden',
    backgroundColor: '#fff',
    color: '#333',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {

  }

}
