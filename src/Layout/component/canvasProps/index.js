import React, { useMemo, useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import './index.css';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const CanvasProps = ({ data, form: { getFieldDecorator }, form, onFormValueChange }) => {

  const { x, y, width, height } = data?.node?.rect || {};

  useEffect(() => {
    form.validateFields((err, value) => {
      if(err) return;
      if(value.x === x && value.y === y && value.width === width && value.height === height ) return;
      onFormValueChange(value);
      form.resetFields();
    })
  }, [form.getFieldValue('x'), form.getFieldValue('y'), form.getFieldValue('width'), form.getFieldValue('height')])

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
    </Form>
  }, [x, y, width, height, form]);

  return (
    <div>
      
      {
        data.node ? <><div className="title">位置和大小</div>{renderForm}</> : ''
      }
    </div>
  );
};

export default Form.create()(CanvasProps);