import React from 'react';

export default function Content({children}) {
  return (
    <div style={{width: '100vw', padding: '10px 0', backgroundColor: '#fdfdfd', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {children}
    </div>
  );
}
