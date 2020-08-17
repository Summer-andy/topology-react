import React, { useState } from 'react';
import { Menu, Icon, Button } from 'antd';
import * as FileSaver from 'file-saver';
import './index.css';
const ButtonGroup = Button.Group;
const { SubMenu } = Menu;
const Header = ({ canvas, history }) => {

  const [isLock, setIsLock] = useState(false); // 是否处于锁定状态

  const [scaleNumber, setScaleNumber] = useState(1); // 缩放的基数

  /**
  * 导入json
  */

  const onHandleImportJson = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = event => {
      const elem = event.srcElement || event.target;
      if (elem.files && elem.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          const text = e.target.result + '';
          try {
            const data = JSON.parse(text);
            canvas.open(data);
          } catch (e) {
            return false;
          } finally {

          }
        };
        reader.readAsText(elem.files[0]);
      }
    };
    input.click();
  }

  /**
  * 保存为svg
  */

  const onHandleSaveToSvg = () => {
    const C2S = window.C2S;
    const ctx = new C2S(canvas.canvas.width + 200, canvas.canvas.height + 200);
    if (canvas.data.pens) {
      for (const item of canvas.data.pens) {
        item.render(ctx);
      }
    }
    let mySerializedSVG = ctx.getSerializedSvg();
    mySerializedSVG = mySerializedSVG.replace(
      '<defs/>',
      `<defs>
    <style type="text/css">
      @font-face {
        font-family: 'topology';
        src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797') format('truetype');
      }
    </style>
  </defs>`
    );
    mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x');
    const urlObject = window.URL || window;
    const export_blob = new Blob([mySerializedSVG]);
    const url = urlObject.createObjectURL(export_blob);
    const a = document.createElement('a');
    a.setAttribute('download', 'le5le.topology.svg');
    a.setAttribute('href', url);
    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
  }

  /**
  * 选中menu时, 触发的函数
  */

  const onHandleSelect = data => {
    switch (data.key) {
      case 'create_new':
        canvas.open({ nodes: [], lines: [] });
        break;
      case 'import_json':
        onHandleImportJson();
        break;
      case 'save_json':
        FileSaver.saveAs(
          new Blob([JSON.stringify(canvas.data)], { type: 'text/plain;charset=utf-8' }),
          `le5le.topology.json`
        );
        break;
      case 'save_png':
        canvas.saveAsImage('le5le.topology.png');
        break;
      case 'save_svg':
        onHandleSaveToSvg();
        break;
      case 'undo':
        canvas.undo();
        break;
      case 'redo':
        canvas.redo();
        break;
      case 'copy':
        canvas.copy();
        break;
      case 'cut':
        canvas.cut();
        break;
      case 'paste':
        canvas.paste();
        break;
      case 'preview':
        let reader = new FileReader();
        const result = new Blob([JSON.stringify(canvas.data)], { type: 'text/plain;charset=utf-8' });
        reader.readAsText(result, 'text/plain;charset=utf-8');
        reader.onload = (e) => {
          history.push({ pathname: '/preview', state: { data: JSON.parse(reader.result) } });
        }
        break;
      default:
        break;
    }
  }

 /**
 * 放大画布
 */

  const scaleZoomOut = () => {
    if(scaleNumber < 5) {
      setScaleNumber(scaleNumber + 0.5);
      canvas.scaleTo(scaleNumber + 0.5)
    }
  }

  /**
   * 缩小画布
   */

  const scaleZoomIn = () => {
    if(scaleNumber > 0.5) {
      setScaleNumber(scaleNumber - 0.5);
      canvas.scaleTo(scaleNumber - 0.5)
    }
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
        <Button onClick={() => onHandleSelect({ key: 'preview' })}>
          <Icon type="eye" />
          预览
        </Button>
        {
          isLock ? <Button onClick={() => { setIsLock(false); canvas.lock(0) }}>
            <Icon type="unlock" />
          解锁
        </Button> : <Button onClick={() => { setIsLock(true); canvas.lock(2) }}>
              <Icon type="lock" />
          锁定
        </Button>
        }

        <Button onClick={() => scaleZoomOut()}>
          <Icon type="plus" />
        </Button>
        <Button onClick={() => scaleZoomIn()} >
          <Icon type="minus" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Header;