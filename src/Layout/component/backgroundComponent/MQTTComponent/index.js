import { Form, Row, Col, Input, Button } from 'antd';
import React from 'react';

import { canvas } from '../../../index';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 }
};

const MQTTForm = ({ form: { getFieldDecorator } }) => {
  return (
    <Form {...formLayout}>
      <Row>
        <Col span={24}>
          <Form.Item label="线条颜色">
            {getFieldDecorator('mqtt ', {
              initialValue: ''
            })(<Input placeholder="请输入URL地址" />)}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Client ID">
            {getFieldDecorator('clientId ', {
              initialValue: ''
            })(<Input placeholder="请输入Client ID（不能重复使用，可为空)" />)}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="用户名">
            {getFieldDecorator('userName ', {
              initialValue: ''
            })(<Input placeholder="请输入用户名" />)}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="密码">
            {getFieldDecorator('password ', {
              initialValue: ''
            })(<Input type="password" placeholder="请输入密码" />)}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Topics *">
            {getFieldDecorator('topics ', {
              initialValue: ''
            })(<Input placeholder="请输入Topics" />)}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button type="primary" style={{ marginLeft: 20, width: 235 }}>
            测试连接
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(MQTTForm);
