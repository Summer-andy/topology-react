import React from 'react';
import { Node } from '@topology/core';
import { Form, Col, Collapse, Switch, Select } from 'antd';
import { canvas } from '../../../index';

const { Panel } = Collapse;
const Page = ({ canvasData, form: { getFieldDecorator } }) => {
  const node = canvasData.node;


  const onHandleStyleSelectChange = (e) => {
    node.animateFrames = [];
    node.fillStyle = '';
    node.rotate = '';
    const state = Node.cloneState(node);
    switch (e) {
      case 'upDown':
        state.rect.y -= 10;
        state.rect.ey -= 10;
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        node.animateStart = Date.now();
        break;
      case 'leftRight':
        state.rect.x -= 10;
        state.rect.ex -= 10;
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });

        state.rect.x += 20;
        state.rect.ex += 20;
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        node.animateStart = Date.now();
        break;
      case 'heart':
        state.rect.x -= 5;
        state.rect.ex += 5;
        state.rect.y -= 5;
        state.rect.ey += 5;
        state.rect.width += 5;
        state.rect.height += 10;
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        node.animateStart = Date.now();
        break;
      case 'success':
        state.strokeStyle = '#237804';
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        state.strokeStyle = '#237804';
        state.fillStyle = '#389e0d22';
        node.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(state)
        });
        node.animateStart = Date.now();
        break;
      case 'warning':
        state.strokeStyle = '#fa8c16';
        state.dash = 2;
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        state.fillStyle = '#fa8c16';
        state.dash = 0;
        node.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(state)
        });
        node.animateStart = Date.now();
        break;
        case 'show':
          state.rotate = -10;
          node.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(state)
          });
          state.rotate = 10;
          node.animateFrames.push({
            duration: 300,
            linear: true,
            state: Node.cloneState(state)
          });
          node.animateStart = Date.now();
          break;
      default:
        break;
    }

    node.animateDuration = 0;
    for (const item of node.animateFrames) {
      node.animateDuration += item.duration;
    }
  };

  const onHandleSwitchChange = (e) => {
    if (e) {
      node.animateStart = Date.now();
      canvas.animate();
    } else {
      node.animateStart = 0;
    }
  };

  const renderAnimateForm = () => {
    return (
      <Form>
        <Col span={24}>
          <Form.Item label="特效">
            {getFieldDecorator('style', {
              initialValue: void 0
            })(
              <Select onSelect={e => onHandleStyleSelectChange(e)}>
                <Select.Option value="upDown" key="topDown">
                  上下跳动
                </Select.Option>
                <Select.Option value="leftRight" key="leftRight">
                  左右跳动
                </Select.Option>
                <Select.Option value="heart" key="heart">
                  心跳
                </Select.Option>
                <Select.Option value="success" key="success">
                  成功
                </Select.Option>
                <Select.Option value="warning" key="warning">
                  警告
                </Select.Option>
                <Select.Option value="show" key="show">
                  炫耀
                </Select.Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="播放">
            {getFieldDecorator('start', {
              initialValue: void 0
            })(
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={(e) => onHandleSwitchChange(e)}
              />
            )}
          </Form.Item>
        </Col>
      </Form>
    );
  };

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="动画" key="1">
          {renderAnimateForm()}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Form.create()(Page);
