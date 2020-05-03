import React, {useState} from 'react';

import './styles.css'

export default function InputNumber({step, min, max, defaultValue=0}) {

  const [value, setValue] = useState(defaultValue);

  function add(mult=1) {
    setValue(v => {
      const next = v - -(step*mult);
      if((max && max < next) || (min && min > next) ){
        return v;
      }
      return next;
    })
  }
  

  return (
    <div style={styles.container}>
      <div style={{position: 'relative', height: '100%', width: '100%'}}>
        <input type='number' className='simpleInput' readOnly style={styles.input} value={value} />
        <div style={{position: 'absolute', top: 0, height: '100%', right: '5%', boxSizing: 'border-box'}}>
          <span className='noselect' style={styles.button} onClick={()=>{add(1)}}>+</span>
          <span className='noselect' style={styles.button} onClick={()=>{add(-1)}}>-</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
    container: {
        height: '35px',
        width: '70px',
        border: '1px solid #DDD',
        color: '#555',
        overflow: 'hidden',
    },
    input: {
        border: 'none',
        fontSize: '1em',
        display: 'block',
        height: '100%',
        padding: '0 0 0 10px',
    },
    button: {
        display: 'block',
        fontSize: '15px',
        lineHeight: '13px',
        textAlign: 'lef',
        cursor: 'pointer',
        width: '15px',
        height: '50%',
        zIndex: '2'
    }
}
