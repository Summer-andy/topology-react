import React, { useEffect } from 'react';
import { Topology } from '@topology/core';
import { PageHeader } from 'antd';
let canvas;
const Preview = ({ history }) => {

  useEffect(() => {
    canvas = new Topology('topology-canvas-preview', {});
    canvas.open(history.location.state.data);
  }, [history]);

  return (
    <>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => history.push({ pathname: '/workspace', state: { data: history.location.state.data, id: history.location.state.id , from: '/preview' } })}
        title="返回画板"
        subTitle="预览"
      />
      <div id="topology-canvas-preview" style={{ height: '100vh', width: '100vw' }} />
    </>
  );
};

export default Preview;