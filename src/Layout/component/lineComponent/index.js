import React, { useMemo, useEffect } from 'react';
import { Form, InputNumber, Tabs, Collapse, Row, Col, Select, Input } from 'antd';
import './index.css';
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;
const CanvasProps = ({ data, form: { getFieldDecorator }, form, onFormValueChange }) => {

  const { lineWidth, dash, strokeStyle, name, fromArrow, toArrow } = data?.line || {};

  useEffect(() => {
    form.validateFields((err, value) => {
      if (err) return;
      if (Object.keys(data).length === 0) return;
      if (value.lineWidth === lineWidth && value.dash === dash && value.strokeStyle === strokeStyle && value.name === name && value.toArrow === toArrow && value.fromArrow === fromArrow) return;
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
        <Col span={24}>
          <Form.Item label="线条类型">
            {getFieldDecorator('name', {
              initialValue: name
            })(
              <Select style={{ width: '95%' }}>
                <Option value="curve">贝塞尔曲线</Option>
                <Option value="polyline">折线</Option>
                <Option value="line">直线</Option>
              </Select>
            )}
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
        <Col span={24}>
          <Form.Item label="起点箭头">
            {getFieldDecorator('fromArrow', {
              initialValue: fromArrow
            })(
              <Select style={{ width: '95%' }}>
                <Option value="">无箭头</Option>
                <Option value="triangleSolid">实心三角形</Option>
                <Option value="triangle">空心三角形</Option>
                <Option value="diamondSolid">实心菱形</Option>
                <Option value="diamond">空心菱形</Option>
                <Option value="circleSolid">实心圆</Option>
                <Option value="circle">空心圆</Option>
                <Option value="line">线型箭头</Option>
                <Option value="lineUp">上单边线箭头</Option>
                <Option value="lineDown">下单边线箭头</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="结束箭头">
            {getFieldDecorator('toArrow', {
              initialValue: toArrow
            })(
              <Select style={{ width: '95%' }}>
                <Option value="">无箭头</Option>
                <Option value="triangleSolid">实心三角形</Option>
                <Option value="triangle">空心三角形</Option>
                <Option value="diamondSolid">实心菱形</Option>
                <Option value="diamond">空心菱形</Option>
                <Option value="circleSolid">实心圆</Option>
                <Option value="circle">空心圆</Option>
                <Option value="line">线型箭头</Option>
                <Option value="lineUp">上单边线箭头</Option>
                <Option value="lineDown">下单边线箭头</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }, [lineWidth, dash, name, toArrow, fromArrow, strokeStyle, getFieldDecorator]);


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