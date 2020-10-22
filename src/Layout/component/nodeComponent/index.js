import React, { useMemo, useEffect } from 'react';
import { Form, InputNumber, Tabs, Collapse, Row, Col, Input, Select, Tag } from 'antd';
// import ExtraDataForm from './ExtraDataForm';
import EventComponent from './EventComponent';
import './index.css';
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const CanvasProps = ({ data, form: { getFieldDecorator }, form, onFormValueChange, onEventValueChange }) => {

  const { x, y, width, height } = data?.node?.rect || {};
  const { rotate, lineWidth, strokeStyle, dash, text, id } = data?.node || {};
  const { color, fontSize, fontFamily } = data?.node?.font || {};
  const extraFields = data.node.data; // 用户自定义数据片段

  useEffect(() => {
    form.validateFields((err, value) => {
      if (err) return;
      if (Object.keys(data).length === 0) return;
      if (value.x === x && value.y === y && value.width === width && value.height === height && value.rotate === rotate && value.lineWidth === lineWidth && value.strokeStyle === strokeStyle && value.dash === dash && value.color === color && value.fontFamily === fontFamily && value.fontSize === fontSize && value.text === text && value.data === extraFields) return;
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
        <Col span={12}>
          <Form.Item label="X(px)">
            {getFieldDecorator('x', {
              initialValue: x
            })(<InputNumber />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Y(px)" name="y">
            {getFieldDecorator('y', {
              initialValue: y
            })(<InputNumber />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="宽(px)" name="width">
            {getFieldDecorator('width', {
              initialValue: width
            })(<InputNumber />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="高(px)" name="height">
            {getFieldDecorator('height', {
              initialValue: height
            })(<InputNumber />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="角度(deg)" name="rotate">
            {getFieldDecorator('rotate', {
              initialValue: rotate
            })(<InputNumber />)}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }, [x, y, width, height, rotate, getFieldDecorator]);

  /**
  * 渲染样式的表单
  */

  const renderStyleForm = useMemo(() => {
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
        <Col span={12}>
          <Form.Item label="线条宽度">
            {getFieldDecorator('lineWidth', {
              initialValue: lineWidth
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }, [lineWidth, strokeStyle, dash, getFieldDecorator]);

  /**
  * 渲染字体的表单
  */

  const renderFontForm = useMemo(() => {
    return <Form>
      <Col span={24}>
        <Form.Item label="字体颜色">
          {getFieldDecorator('color', {
            initialValue: color
          })(<Input type="color" />)}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="字体类型">
          {getFieldDecorator('fontFamily', {
            initialValue: fontFamily
          })(<Input />)}
        </Form.Item>
      </Col>
      <Col span={11} offset={1}>
        <Form.Item label="字体大小">
          {getFieldDecorator('fontSize', {
            initialValue: fontSize
          })(<InputNumber />)}
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="内容">
          {getFieldDecorator('text', {
            initialValue: text
          })(<TextArea />)}
        </Form.Item>
      </Col>
    </Form>
  }, [color, fontFamily, fontSize, text, getFieldDecorator])

  /**
  * 渲染元素本身数据
  */

  const renderDataForm = useMemo(() => {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return <Form {...formItemLayout}>
      <Col>
        <Form.Item label="ID">
          <span className="ant-form-text"><Tag color="#f50">{id}</Tag></span>
        </Form.Item>
      </Col>
    </Form>
  }, [id]);


  /**
  * 渲染元素额外数据
  */

  const renderExtraDataForm = useMemo(() => {
    return <Form >
      <Col>
        <Form.Item label="自定义数据字段">
          {getFieldDecorator('data', {
            initialValue: extraFields
          })(<TextArea rows={10} />)}
        </Form.Item>
        {/* <ExtraDataForm extraFields={extraFields} form={form} /> */}
      </Col>
    </Form>
  }, [extraFields, getFieldDecorator])



  return (
    <div className="rightArea">
      <Tabs defaultActiveKey="1">
        <TabPane tab="外观" key="1" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1', '2', '3']}>
            <Panel header="位置和大小" key="1">
              {
                renderForm
              }
            </Panel>
            <Panel header="样式" key="2">
              {
                renderStyleForm
              }
            </Panel>
            <Panel header="文字" key="3" >
              {
                renderFontForm
              }
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="数据" key="2" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1', '2']}>
            <Panel header="本身数据" key="1">
              {
                renderDataForm
              }
            </Panel>
            <Panel header="自定义数据" key="2">
              {
                renderExtraDataForm
              }
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="事件" key="3" style={{ margin: 0 }}>
          <EventComponent canvasData={data} onEventValueChange={onEventValueChange} />
        </TabPane>
        <TabPane tab="动效" key="4" style={{ margin: 0 }}>
        </TabPane>
        <TabPane tab="结构" key="5" style={{ margin: 0 }}>
        </TabPane>
      </Tabs>

    </div>
  );
};

export default Form.create()(CanvasProps);