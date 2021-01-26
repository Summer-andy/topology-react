import React from 'react';
import { Form } from 'antd';
import ButtonForm from './Button';
import TableForm from './Table';

const Page = ({
  data,
  form,
  form: { getFieldDecorator, getFieldValue },
  onUpdateComponentProps
}) => {
  const renderForm = () => {
    switch (data.node.name) {
      case 'button':
        return <ButtonForm getFieldDecorator={getFieldDecorator} data={data.node.data} />;
      case 'table':
        return (
          <TableForm
            getFieldDecorator={getFieldDecorator}
            getFieldValue={getFieldValue}
            form={form}
            data={data.node.data.props}
          />
        );
      default:
        break;
    }
  };

  return <Form layout="inline">{renderForm()}</Form>;
};

export default Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    const { onUpdateComponentProps } = props;
    if(props.data.node.name === 'table') {
      allValues.columns = allValues.key.map((item, index) => ({
        title: allValues.title[index] || 'NA',
        key: item || 'NA',
        dataIndex: item || 'NA'
      }));
      const { key, keys, title, dataSource, ...other } = allValues;
      onUpdateComponentProps(other);
      return;
    }
    onUpdateComponentProps(allValues);
    console.log(allValues);

  }
})(Page);
