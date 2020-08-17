import React, { useEffect } from 'react';
import { Topology } from '@topology/core';
let canvas ;
const Preview = ({ history }) => {

  useEffect(() => {
    canvas = new Topology('topology-canvas-preview', {});
    canvas.open(history.location.state.data);
  }, [history]);

  return (
    <div id="topology-canvas-preview" style={{ height: '100vh', width: '100vw' }} />
  );
};

export default Preview;