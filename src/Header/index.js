import React from 'react';
import { Menu, Icon } from 'antd';
import './index.css';

const { SubMenu } = Menu;
const Header = () => {
  return (
    <div>
      <Menu mode="horizontal">
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="file" />
              文件
            </span>
          }
        >
          <Menu.Item key="setting:1">新建文件</Menu.Item>
          <Menu.Item key="setting:2">打开本地文件</Menu.Item>
          <Menu.Item key="setting:3">保存到本地</Menu.Item>
          <Menu.Item key="setting:4">保存为PNG</Menu.Item>
          <Menu.Item key="setting:5">保存为SVG</Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="edit" />
              编辑
            </span>
          }
        >
          <Menu.Item key="setting:6">撤销</Menu.Item>
          <Menu.Item key="setting:7">恢复</Menu.Item>
          <Menu.Item key="setting:8">复制</Menu.Item>
          <Menu.Item key="setting:9">剪切</Menu.Item>
          <Menu.Item key="setting:10">粘贴</Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="global" />
              社区
            </span>
          }
        >
          <Menu.Item key="setting:11">咨询与建议</Menu.Item>
          <Menu.Item key="setting:12">开源github</Menu.Item>
          <Menu.Item key="setting:13">开发文档</Menu.Item>
        </SubMenu>

        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="question-circle" />
              帮助
            </span>
          }
        >
          <Menu.Item key="setting:11">在线官网</Menu.Item>
          <Menu.Item key="setting:12">许可与申明</Menu.Item>
          <Menu.Item key="setting:13">资助与加入</Menu.Item>
          <Menu.Item key="setting:14">关于</Menu.Item>
        </SubMenu>

      </Menu>
    </div>
  );
};

export default Header;