import React from 'react';
import { Form, Col, Select } from 'antd';
import { canvas } from '../../../index';

const Button = ({ getFieldDecorator, data }) => {
  return (
    <>
      <Col span={24}>
        <Form.Item label="按钮主题">
          {getFieldDecorator('type', {
            initialValue: 'primary'
          })(
            <Select style={{ width: 200 }}>
              <Select.Option value="primary" key="primary">
                primary
              </Select.Option>
              <Select.Option value="default" key="default">
                default
              </Select.Option>
              <Select.Option value="dashed" key="dashed">
                dashed
              </Select.Option>
              <Select.Option value="danger" key="danger">
                danger
              </Select.Option>
              <Select.Option value="link" key="link">
                link
              </Select.Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="按钮大小">
          {getFieldDecorator('size', {
            initialValue: 'default'
          })(
            <Select style={{ width: 200 }}>
              <Select.Option value="small" key="small">
                small
              </Select.Option>
              <Select.Option value="default" key="default">
                default
              </Select.Option>
              <Select.Option value="large" key="large">
                large
              </Select.Option>
            </Select>
          )}
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="绑定图例">
          {getFieldDecorator('bind', {
            initialValue: data.bind
          })(
            <Select style={{ width: 200 }} mode="multiple" placeholder="请选择图例">
              {canvas.data.pens.map((item) => (
                <Select.Option key={item.id}>{item.id}-{item.name}</Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    </>
  );
};

export default Button;
