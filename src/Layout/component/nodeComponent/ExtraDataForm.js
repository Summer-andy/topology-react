import React from 'react';
import { Form, Input, Icon, Col, Row } from 'antd';
const extraDataForm = ({ extraFields, form }) => {

  const { getFieldDecorator } = form;
  const formData = JSON.parse(extraFields);

  const keys = Object.keys(formData).map(item => ({ dataKey: item, dataValue: formData[item] }));

  const formItemLayout = {
    labelCol: {
      xs: { span: 0 },
      sm: { span: 0 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  const formItems = keys.map((k, index) => (
    <Row key={k.dataKey}>
      <Col span={10}>
        <Form.Item
          {...formItemLayout}
          required={false}
        >
          {getFieldDecorator(`dataKey[${k}]`, {
            initialValue: k.dataKey,
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="请输入自定义数据的key" style={{ width: '98%', marginRight: 8 }} />)}
        </Form.Item>
      </Col>
      <Col span={2} style={{ lineHeight: '40px' }}>
        <Icon type="minus" />
      </Col>
      <Col span={9}>
        <Form.Item
          {...formItemLayout}
          style={{ margin: 0 }}
          required={false}
        >
          {getFieldDecorator(`dataValue[${k}]`, {
            initialValue: k.dataValue,
            rules: [
              {
                required: true,
                whitespace: true,
              },
            ],
          })(<Input placeholder="请输入自定义数据的value" style={{ width: '98%', marginLeft: 8 }} />)}
        </Form.Item>
      </Col>
      <Col offset={2} span={1} style={{ lineHeight: '40px' }}>
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
          />
      </Col>
    </Row>
  ));

  return (
    <div>
      {
        formItems
      }
    </div>
  );
};

export default extraDataForm;