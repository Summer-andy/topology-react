import React, { useEffect, useState } from 'react';
import { Form, Col, Input, Select, Button, Divider } from 'antd';
import { canvas } from '../../../index';
let id = 0;
const Page = ({ form, form: { getFieldDecorator, getFieldValue }, onUpdateHttpProps }) => {

  useEffect(() => {
    form.validateFields((err, value) => {
      if (err) return;
      onUpdateHttpProps(value);
    });
  }, [
    form.getFieldValue('api'),
    form.getFieldValue('type'),
    form.getFieldValue('paramsKey'),
    form.getFieldValue('paramsValue')
  ]);

  const renderForm = () => {
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    return keys.map((item, idx) => (
      <div key={idx}>
        <Col span={24}>
          <Form.Item label={`${idx + 1}参数名key`}>
            {getFieldDecorator(`paramsKey[${idx}]`, {
              initialValue: void 0
            })(<Input style={{ width: 180 }} placeholder="请填写key" />)}
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label={`${idx + 1}参数value`}>
            {getFieldDecorator(`paramsValue[${idx}]`, {
              initialValue: void 0
            })(
              <Select style={{ width: 180 }} placeholder="请选择绑定的源数据">
                {canvas.data.pens.map((item) => (
                  <Select.Option key={item.id} value={`componentValue-${item.id}`}>
                    {item.id}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
      </div>
    ));
  };

  const onHandleAdd = () => {
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  return (
    <Form layout="inline">
      <Col span={24}>
        <Form.Item label="后端地址">
          {getFieldDecorator('api', {
            initialValue: ''
          })(<Input style={{ width: 200 }} placeholder="请填写后端地址" />)}
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="请求类型">
          {getFieldDecorator('type', {
            initialValue: 'get'
          })(
            <Select style={{ width: 200 }}>
              <Select.Option value="get" key="get">
                get
              </Select.Option>
              <Select.Option value="post" key="post">
                post
              </Select.Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      {renderForm()}
      <Col span={24}>
        <Form.Item>
          <Button type="primary" icon="plus" onClick={() => onHandleAdd()}>
            新增
          </Button>
        </Form.Item>
      </Col>
    </Form>
  );
};

export default Form.create()(Page);
