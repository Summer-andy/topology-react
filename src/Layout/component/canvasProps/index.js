import React, { useMemo, useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import './index.css';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const CanvasProps = ({ data, form: { getFieldDecorator }, form, onFormValueChange }) => {

  const { x, y, width, height } = data?.node?.rect || {};
  const { rotate } = data?.node || {};

  useEffect(() => {
    form.validateFields((err, value) => {
      if(err) return;
      if(value.x === x && value.y === y && value.width === width && value.height === height && value.rotate === rotate) return;
      onFormValueChange(value);
      form.resetFields();
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue('x'), form.getFieldValue('y'), form.getFieldValue('width'), form.getFieldValue('height'), form.getFieldValue('rotate')])

  const renderForm = useMemo(() => {
    return <Form
      {...layout}
    >
      <Form.Item label="X(px)">
        {getFieldDecorator('x', {
          initialValue: x
        })(<InputNumber />)}
      </Form.Item>
      <Form.Item label="Y(px)" name="y">
        {getFieldDecorator('y', {
          initialValue: y
        })(<InputNumber />)}
      </Form.Item>
      <Form.Item label="宽(px)" name="width">
        {getFieldDecorator('width', {
          initialValue: width
        })(<InputNumber />)}
      </Form.Item>
      <Form.Item label="高(px)" name="height">
        {getFieldDecorator('height', {
          initialValue: height
        })(<InputNumber />)}
      </Form.Item>
      <Form.Item label="角度(deg)" name="rotate">
        {getFieldDecorator('rotate', {
          initialValue: rotate
        })(<InputNumber />)}
      </Form.Item>
    </Form>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y, width, height, rotate, form]);

  return (
    <div>
      
      {
        data.node ? <><div className="title">位置和大小</div>{renderForm}</> : ''
      }
    </div>
  );
};

export default Form.create()(CanvasProps);