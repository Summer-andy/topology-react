import React, { useState } from 'react';
import { Button, Collapse, Select, Col, Form, Input, Icon } from 'antd';
import './index.css'
import { useMemo } from 'react';
const { Panel } = Collapse;
const Page = ({ form: { getFieldDecorator, validateFields, resetFields } }) => {

  const [eventData, setEventData] = useState([{}]);

  const onHandleAddEventListener = () => {
    const arr = [...eventData]
    arr.push({});
    setEventData(arr);
  };

  
  const renderFontForm = (item, idx) => {
    return <Form>
      <Col span={24}>
        <Form.Item label="事件类型">
          {getFieldDecorator(`eventType${idx}`, {
            initialValue: item.type || void 0
          })(<Select placeholder="请选择事件类型">
            <Select.Option value="click">单击</Select.Option>
            <Select.Option value="dbClick">双击</Select.Option>
            <Select.Option value="ws">webSocket事件</Select.Option>
            <Select.Option value="mqtt">MQTT</Select.Option>
          </Select>)}
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="事件行为">
          {getFieldDecorator(`event${idx}`, {
            initialValue: item.action || void 0
          })(<Select placeholder="请选择事件行为">
            <Select.Option key="func" value="func">执行自定义函数</Select.Option>
          </Select>)}
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="自定义代码">
          {getFieldDecorator(`code${idx}`, {
            initialValue: item.value || void 0
          })(<Input placeholder="请输入自定义代码" onChange={e => onHandleCodeChange(e, idx)} />)}
        </Form.Item>
      </Col>
    </Form>
  };

  const onHandleCodeChange = (e, idx) => {
    validateFields((err, value) => {
      if(err) return;
      eventData[idx] = {
        type: null,
        action: null,
        value: null
      }
      eventData[idx].type = value[`eventType${idx}`];
      eventData[idx].action = value[`event${idx}`];
      eventData[idx].value = value[`code${idx}`];
      setEventData(eventData);
    });
  }

  const onHandleDeleteItem = idx => {
    const data = [...eventData];
    delete data[idx];
    resetFields();
    setEventData(data.filter(Boolean))
  }

  const renderPanel = useMemo(() => {
    if(eventData.length < 1) return;
    return <Collapse>{eventData.map((item, index) => <Panel header={<div>{`自定义事件${index + 1}`} <Icon onClick={() => onHandleDeleteItem(index)} type="delete"/></div>} key={index}>
      {
        renderFontForm(item, index)
      }
    </Panel>)}</Collapse>
  }, [eventData, renderFontForm])

  return (
    <div>
      <Button type="primary" className="event-button" onClick={onHandleAddEventListener}>新增事件</Button>
      {
        renderPanel
      }
    </div>
  );
};

export default  Form.create()(Page);