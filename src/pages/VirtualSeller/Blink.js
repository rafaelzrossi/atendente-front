import React, {useImperativeHandle, forwardRef, useState} from 'react';

import Blink from '../../components/Blink';

function Blink2(props, ref) {

  const [position, setPosition] = useState({x: 0, y: 0});
  const [blink, setBlink] = useState(false);

  useImperativeHandle(ref, () => ({
    setPosition,
    blink: (callback) =>{
      setBlink(callback);
    },
  }));

  return (<>
    {blink && <Blink left={position.x} top={position.y} />}
  </>);
}

export default forwardRef(Blink2);