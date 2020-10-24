import React, { useMemo, useEffect } from 'react';
import { Form, Tabs, Row, Col, Input, Collapse, Button } from 'antd';
import './index.css';
import MQTTComponent from './MQTTComponent';
import { canvas } from '../../index';
const { TabPane } = Tabs;
const { Panel } = Collapse;
const CanvasProps = ({ data, form: { getFieldDecorator }, form }) => {

  const { bkColor, bkImage } = data.data;

  useEffect(() => {
    form.validateFields((err, value) => {
      if (err) return;
      data.clearBkImg();
      data.data.bkColor = value.bkColor;
      data.data.bkImage = value.bkImage;
      data.render();
      form.resetFields();
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])

  /**
  * 渲染位置和大小的表单
  */

  const renderForm = useMemo(() => {
    const formLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 15 },
    };
    return <Form {...formLayout}>
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
            })(<Input placeholder="请输入图片的地址" />)}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }, [bkColor, bkImage, getFieldDecorator]);

  const onHandleConnectWS = () => {
  console.log(canvas);
  }

  return (
    <div className="rightArea">
      <Tabs defaultActiveKey="1">
        <TabPane tab="图文设置" key="1" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="样式" key="1">
              {
                renderForm
              }
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="消息通信" key="2" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1', '2']}>
            <Panel header="websocket地址" key="1">
                <Input placeholder="请输入websocket地址" />
                <Button type="primary" style={{ width: 265, marginTop: 10 }} onClick={() => onHandleConnectWS()}>测试连接</Button>
            </Panel>
            <Panel header="MQTT地址" key="2">
              <MQTTComponent />
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>

    </div>
  );
};

export default Form.create()(CanvasProps);