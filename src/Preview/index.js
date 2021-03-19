import React, { useEffect } from 'react';
import { Topology } from '@topology/core';
import { PageHeader, Button } from 'antd';
import {
  activityFinal,
  activityFinalIconRect,
  activityFinalTextRect
} from '@topology/activity-diagram';
import { registerNode } from '@topology/core';
let canvas;
let x = 0, y = 0;
let distance = 0;
const canvasOptions = {
  rotateCursor: '/rotate.cur',
  bkColor: '#f6f6f6'
};
const Preview = ({ history }) => {

  const canvasRegister = () => {
    // activity
    registerNode(
      'activityFinal',
      activityFinal,
      null,
      activityFinalIconRect,
      activityFinalTextRect
    )
  };

  useEffect(() => {
    canvas = new Topology('topology-canvas-preview', canvasOptions);
    history.location.state.data.locked = 1;
    canvas.open(history.location.state.data);
    canvasRegister();
  }, [history.location.state.data]);
  

  useEffect(() => {
    let node = canvas.data.pens.find((item) => item.data && item.data.car === 1);
    let line = canvas.data.pens.find((item) => item.type === 1);
    const timer = setInterval(() => {
      
      if(distance < 360) {
        distance += 0.5;
      }

      if(distance > 180) {
        line.strokeStyle = 'red';
        line.lineWidth = 2;
      } else {
        line.strokeStyle = 'green';
        line.lineWidth = 1;
      }

      if(distance > 350) {
        node.rotate = 180;
        clearInterval(timer);
      }

      node.rect.x = 625 + x;
      node.rect.y = 541 - distance +y;
      canvas.updateProps(true, [node]);
      canvas.render();
    }, 30);

    return () => clearInterval(timer);
  }, [history]);

  /**
   * 自动适应窗口大小
   */

  const onHandleFit = () => {
    const rect = canvas.getRect();
    rect.calcCenter();
    x = document.body.clientWidth / 2 - rect.center.x;
    y = (document.body.clientHeight - 66) / 2 - rect.center.y;
    canvas.translate(x, y);
  };

  /**
   * 实际大小
   */

  const onHandlePre = () => {
    canvas.translate(-x, -y);
    x = 0;
    y = 0;
  };

  return (
    <>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)'
        }}
        extra={[
          <Button type="primary" key="2" onClick={() => onHandleFit()}>
            自动适应窗口大小
          </Button>,
          <Button key="1" onClick={() => onHandlePre()}>
            实际大小
          </Button>
        ]}
        onBack={() =>
          history.push({
            pathname: '/',
            state: { data: history.location.state.data, from: '/preview' }
          })
        }
        title="返回画板"
        subTitle="预览"
      />
      <div id="topology-canvas-preview" style={{ height: 'calc(100vh - 66px)', width: '100vw' }} />
    </>
  );
};

export default Preview;
