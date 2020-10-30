import React, { useMemo, useEffect, useState } from 'react';
import { Form, Tabs, Row, Col, Input, Collapse, Button, Switch } from 'antd';
import './index.css';
import MQTTComponent from './MQTTComponent';
import LayoutComponent from './LayoutComponent';
import { canvas } from '../../index';
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;
const CanvasProps = ({ data, form: { getFieldDecorator }, form }) => {
  const { bkColor, bkImage } = data.data;
  const [wsAddress, setWsAddress] = useState('ws://123.207.136.134:9010/ajaxchattest');

  console.log(canvas.layout);

  useEffect(() => {
    form.validateFields((err, value) => {
      if (err) return;
      data.clearBkImg();
      data.data.bkColor = value.bkColor;
      data.data.bkImage = value.bkImage;
      data.render();
      form.resetFields();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  /**
   * 渲染位置和大小的表单
   */

  const renderForm = useMemo(() => {
    const formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 15 }
    };
    return (
      <Form {...formLayout} style={{ marginTop: 10, position: 'relative' }}>
        <Row>
          <Col span={24}>
            <Form.Item label="背景颜色">
              {getFieldDecorator('bkColor', {
                initialValue: bkColor
              })(<Input type="color" />)}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="背景图片">
              {getFieldDecorator('bkImage', {
                initialValue: bkImage
              })(<TextArea placeholder="请输入图片的地址" />)}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="背景网格">
              {getFieldDecorator('grid', {
                initialValue: true
              })(
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  onClick={(e) => {
                    console.log(e);
                    canvas.showGrid(e);
                  }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }, [bkColor, bkImage, getFieldDecorator]);

  /**
   * 发起websocket连接
   */

  const onHandleConnectWS = () => {
    canvas.openSocket(wsAddress);
  };

  return (
    <div className="rightArea">
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab="图文设置" key="1" style={{ margin: 0, position: 'relative' }}>
          {renderForm}
          <ul className="bottomTip">
              <li>← ↑ → ↓ ：移动5个像素</li>
              <li>Ctrl + 鼠标点击：多选</li>
              <li>Ctrl + 鼠标滚轮：缩放画布</li>
              <li>Ctrl + ← ↑ → ↓ ：移动1个像素</li>
              <li>Ctrl + 鼠标拖拽空白：移动整个画布</li>
              <li>Shift/Alt + 鼠标拖拽节点：独立拖拽（子）节点</li>
          </ul>
        </TabPane>
        <TabPane tab="消息通信" key="2" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1', '2']}>
            <Panel header="websocket地址" key="1">
              <TextArea
                placeholder="请输入websocket地址"
                value={wsAddress}
                onChange={(e) => setWsAddress(e.target.value)}
              />
              <Button
                type="primary"
                style={{ width: 265, marginTop: 10 }}
                onClick={() => onHandleConnectWS()}
              >
                测试连接
              </Button>
            </Panel>
            <Panel header="MQTT地址" key="2">
              <MQTTComponent />
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="排版布局" key="3" style={{ margin: 0 }}>
          <LayoutComponent />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Form.create()(CanvasProps);
