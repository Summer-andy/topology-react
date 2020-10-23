import React, { useMemo } from 'react';
import { Node } from '@topology/core';
import { Form, Col, Input, Collapse, Switch, Select } from 'antd';
import { canvas } from '../../../index';
import { useEffect } from 'react';

const { Panel } = Collapse;
const Page = ({ canvasData, form: { getFieldDecorator } }) => {
  const node = canvasData.node;

  const onHandleStyleSelectChange = (e) => {
    switch (e) {
      case 'upDown':

      console.log(node);
        node.rect.y -= 10;
        node.rect.ey -= 10;

        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: node
        });

        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(node)
        });

        node.animateFrames.push({
          duration: 200,
          linear: true,
          state: Node.cloneState(node)
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
    console.log(e);
    if (e) {
      node.animateStart = node.animateStart ? Date.now() : 0;
      canvas.animate();
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
              <Select onSelect={(e) => onHandleStyleSelectChange(e)}>
                <Select.Option value="upDown" key="topDown">
                  上下跳动
                </Select.Option>
                <Select.Option value="leftRight" key="leftRight">
                  左右跳动
                </Select.Option>
                <Select.Option value="heart" key="heart">
                  心跳
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
      <Collapse>
        <Panel header="动画" key="1">
          {renderAnimateForm()}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Form.create()(Page);
