import React, { useMemo, useEffect } from 'react';
import { Form, InputNumber, Tabs, Collapse, Row, Col, Select, Input } from 'antd';
import './index.css';
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;
const CanvasProps = ({ data, form: { getFieldDecorator }, form, onFormValueChange }) => {

  const { lineWidth, dash, strokeStyle } = data?.line || {};

  useEffect(() => {
    form.validateFields((err, value) => {
      if (err) return;
      if (Object.keys(data).length === 0) return;
      if (value.lineWidth === lineWidth && value.dash === dash && value.strokeStyle === strokeStyle) return;
      onFormValueChange(value);
      form.resetFields();
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])

  /**
  * 渲染位置和大小的表单
  */

  const renderForm = useMemo(() => {
    return <Form>
      <Row>
      <Col span={24}>
          <Form.Item label="线条颜色">
            {getFieldDecorator('strokeStyle', {
              initialValue: strokeStyle
            })(<Input type="color" />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="线条样式">
            {getFieldDecorator('dash', {
              initialValue: dash
            })(
              <Select style={{ width: '95%' }}>
                <Option value={0}>_________</Option>
                <Option value={1}>---------</Option>
                <Option value={2}>_ _ _ _ _</Option>
                <Option value={3}>- . - . - .</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col offset={1} span={11}>
          <Form.Item label="线条宽度">
            {getFieldDecorator('lineWidth', {
              initialValue: lineWidth
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }, [lineWidth, dash, strokeStyle, getFieldDecorator]);


  return (
    <div className="rightArea">
      <Tabs defaultActiveKey="1">
        <TabPane tab="外观" key="1" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="样式" key="1">
              {
                renderForm
              }
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>

    </div>
  );
};

export default Form.create()(CanvasProps);