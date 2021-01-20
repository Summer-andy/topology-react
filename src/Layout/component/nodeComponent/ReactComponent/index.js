import React from 'react';
import { Form, Col, Collapse, Switch, Select } from 'antd';
import { useEffect } from 'react';
import { canvas } from '../../../index';

const Page = ({ form, form: { getFieldDecorator }, onUpdateComponentProps }) => {
  useEffect(() => {
    form.validateFields((err, value) => {
      if (err) return;
      onUpdateComponentProps(value);
    });
  }, [form.getFieldValue('type'), form.getFieldValue('size'), form.getFieldValue('bind')]);

  return (
    <Form layout="inline">
      <Col span={24}>
        <Form.Item label="按钮主题">
          {getFieldDecorator('type', {
            initialValue: 'danger'
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
            initialValue: void 0
          })(
            <Select style={{ width: 200 }} mode="multiple" placeholder="请选择图例">
              {canvas.data.pens.map((item) => (
                <Select.Option key={item.id}>{item.id}</Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>

    </Form>
  );
};

export default Form.create()(Page);
