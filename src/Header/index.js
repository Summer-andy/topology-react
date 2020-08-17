import React from 'react';
import { Menu, Icon, Button } from 'antd';
import './index.css';
const ButtonGroup = Button.Group;
const { SubMenu } = Menu;
const Header = ({ dispatch, state }) => {


  const onHandleSelect = data => {
    dispatch({ type: 'addNode', data: data.key });
  }

  return (
    <div style={{ height: 48, width: '100vw', borderBottom: '1px solid #e8e8e8' }}>
      <Menu mode="horizontal" style={{ width: 500, float: 'left' }} onClick={onHandleSelect}>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="file" />
              文件
            </span>
          }
        >
          <Menu.Item key="create_new">新建文件</Menu.Item>
          <Menu.Item key="import_json">打开本地文件</Menu.Item>
          <Menu.Divider>{}</Menu.Divider>
          <Menu.Item key="save_json">保存到本地</Menu.Item>
          <Menu.Item key="save_png">保存为PNG</Menu.Item>
          <Menu.Item key="save_svg">保存为SVG</Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="edit" />
              编辑
            </span>
          }
        >
          <Menu.Item key="undo">撤销</Menu.Item>
          <Menu.Item key="redo">恢复</Menu.Item>
          <Menu.Divider>{}</Menu.Divider>
          <Menu.Item key="copy">复制</Menu.Item>
          <Menu.Item key="cut">剪切</Menu.Item>
          <Menu.Item key="paste">粘贴</Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="global" />
              社区
            </span>
          }
        >
          <Menu.Item key="issues"><a href="https://github.com/Summer-andy/topology-react/issues" rel="noopener noreferrer" target="_blank">咨询与建议</a></Menu.Item>
          <Menu.Item key="github"><a href="https://github.com/Summer-andy/topology-react/" rel="noopener noreferrer" target="_blank">开源github</a></Menu.Item>
          <Menu.Item key="docs"> <a href="https://www.yuque.com/alsmile/topology/installation" rel="noopener noreferrer" target="_blank">开发文档</a></Menu.Item>
        </SubMenu>


      </Menu>

      <ButtonGroup style={{ float: 'right', right: 10, marginTop: 7 }}>
        <Button onClick={() => dispatch({ type: 'addNode', data: 'preview' })}>
          <Icon type="eye" />
          预览
        </Button>
        {
          state.eventKey === 'lock' ? <Button onClick={() => dispatch({ type: 'addNode', data: 'unlock' })}>
            <Icon type="unlock" />
          解锁
        </Button> : <Button onClick={() => dispatch({ type: 'addNode', data: 'lock' })}>
              <Icon type="lock" />
          锁定
        </Button>
        }


      </ButtonGroup>
    </div>
  );
};

export default Header;