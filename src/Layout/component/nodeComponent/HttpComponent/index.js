import React from 'react';
import { Form, Col, Input, Select, Button, Icon, Tooltip } from 'antd';
import { canvas } from '../../../index';
let id = 0;
const Page = ({ form, form: { getFieldDecorator, getFieldValue }, data }) => {
  id = data.paramsArr ? data.paramsArr.length : 0;
  const renderForm = () => {
    getFieldDecorator('keys', { initialValue: data.paramsArr || [] });
    const keys = getFieldValue('keys');
    return keys.map((item, idx) => (
      <div key={idx}>
        <Col span={24}>
          <Form.Item label={`${idx + 1}参数名key`}>
            {getFieldDecorator(`paramsKey[${idx}]`, {
              initialValue: item.key
            })(<Input style={{ width: 180 }} placeholder="请填写key" />)}
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label={`${idx + 1}参数value`}>
            {getFieldDecorator(`paramsValue[${idx}]`, {
              initialValue: item.value
            })(
              <Select style={{ width: 180 }} placeholder="请选择绑定的源数据">
                {canvas.data.pens.map((item) => (
                  <Select.Option key={item.id} value={`componentValue-${item.id}`}>
                    {item.id}-{item.name}
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
      keys: nextKeys
    });
  };

  return (
    <Form layout="inline">
      <Col span={24}>
        <Form.Item label="后端地址">
          {getFieldDecorator('api', {
            initialValue: data.api
          })(<Input style={{ width: 200 }} placeholder="请填写后端地址" />)}
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="请求类型">
          {getFieldDecorator('type', {
            initialValue: data.type
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

      <Col span={24}>
        <Form.Item label={<>结果<Tooltip title="如果后端api返回的数据是 { list: [], count: 100 },想要把list的数据传入控件, 那么此处填写list即可"><Icon style={{ margin: '12px 0 0 13px' }} type="question-circle" /></Tooltip></>}>
          {getFieldDecorator('handleResult', {
            initialValue: data.handleResult
          })(<Input style={{ width: 200 }} placeholder="请填写处理的值" />)}
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

export default Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    props.onUpdateHttpProps(allValues);
  }
})(Page);
