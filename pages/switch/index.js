import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import xw from 'xwind';
import Layout from '../../components/layout';

const Switch = () => {
  const [activated, setActivated] = useState(false);
  const ws = useRef(null);
  const reconnect = useRef(null);

  const connect = () => {
    ws.current = new WebSocket(`${process.env.NODE_ENV === 'development' ? 'ws://localhost:8080' : 'wss://henrixounez-api.herokuapp.com'}/test/connect`);
    ws.current.onopen = (mess) => {
      console.log('[WS] open');
    }
    ws.current.onmessage = (mess) => {
      const data = JSON.parse(mess.data);
      setActivated(data.value);
    }
    ws.current.onclose = () => {
      console.log('[WS] closed');
      reconnect.current = setTimeout(() => {
        reconnect.current = null;
        connect();
      }, 3000);
    }
  }

  useEffect(() => {
    connect();
    return () => {
      if (ws.current)
        ws.current.close();
      if (reconnect.current)
        clearTimeout(reconnect.current);
    }
  }, []);

  const handleClick = () => {
    try {
      ws.current.send(!activated);
    } catch (e) {}
  }

  return (
    <Layout title='Switch' showPage description='Useless Multiplayer Switch'>
      <button css={[xw`p-5 shadow-lg rounded-lg`, activated ? xw`bg-green-200` : xw`bg-red-200`, css`width: 100px; height: 100px`]} onClick={handleClick}>
        {activated ? 'ON' : 'OFF'}
      </button>
    </Layout>
  );
}

export default Switch;