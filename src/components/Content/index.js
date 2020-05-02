import React from 'react';

export default function Content({children}) {
  return (
    <div style={{width: '100vw', height: '100vh', padding: '70px 0', backgroundColor: '#e3f1ff' }}>
        {children}
    </div>
  );
}
