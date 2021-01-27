import React from 'react';
import { Form, Col, Select, Input, Button } from 'antd';
let id = 0;
const Table = ({ getFieldDecorator, getFieldValue, data, form }) => {
  getFieldDecorator('keys', { initialValue: [] });

  const renderForm = () => {
    getFieldDecorator('keys', { initialValue: data.columns });
    const keys = getFieldValue('keys');
    return keys.map((item, idx) => (
      <div key={idx}>
        <Col span={12}>
          <Form.Item>
            {getFieldDecorator(`title[${idx}]`, {
              initialValue: item.title
            })(<Input  placeholder="请填写title" />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            {getFieldDecorator(`key[${idx}]`, {
              initialValue: item.key
            })(<Input  placeholder="请填写key" />)}
          </Form.Item>
        </Col>
      </div>
    ));
  };

  const onHandleAdd = () => {
    const keys = getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  return (
    <>
      <Col span={24}>
        <Form.Item label="表格大小">
          {getFieldDecorator('size', {
            initialValue: data.size || 'default'
          })(
            <Select style={{ width: 200 }}>
              <Select.Option value="middle" key="middle">
                middle
              </Select.Option>
              <Select.Option value="default" key="default">
                default
              </Select.Option>
              <Select.Option value="small" key="small">
                small
              </Select.Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="表头数据:">
        </Form.Item>
      </Col>
      {renderForm()}
      <Col span={24}>
        <Form.Item>
          <Button type="primary" size="small" icon="plus" style={{ marginLeft: 20, width: 250 }} onClick={() => onHandleAdd()}>
            新增
          </Button>
        </Form.Item>
      </Col>
    </>
  );
};

export default Table;
