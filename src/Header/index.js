import React, { useState } from 'react';
import { Menu, Icon, Button, Tag, Popover } from 'antd';
import * as FileSaver from 'file-saver';
import './index.css';
const ButtonGroup = Button.Group;
const { SubMenu } = Menu;
const Header = ({ canvas, history }) => {

  const [isLock, setIsLock] = useState(false); // 是否处于锁定状态

  const [scaleNumber, setScaleNumber] = useState(1); // 缩放的基数

  const [lineStyle, setLineStyle] = useState('直线')

  const [fromArrowType, setFromArrowType] = useState('无箭头')

  const [toArrowType, setToArrowType] = useState('实心三角形')

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
        console.log(canvas.data);
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
    if (scaleNumber < 5) {
      setScaleNumber(scaleNumber + 0.5);
      canvas.scaleTo(scaleNumber + 0.5)
    }
  }

  /**
   * 缩小画布
   */

  const scaleZoomIn = () => {
    if (scaleNumber > 0.5) {
      setScaleNumber(scaleNumber - 0.5);
      canvas.scaleTo(scaleNumber - 0.5)
    }
  }

  /**
  * 设置默认的连线类型
  */

  const onHandleSelectMenu = data => {
    setLineStyle(data.item.props.children);
    canvas.data.lineName = data.key;
    canvas.render();
  }

  /**
  * 设置默认的连线起始箭头
  */

 const onHandleSelectMenu1 = data => {
  setFromArrowType(data.item.props.children);
  canvas.data.fromArrowType = data.key;
  canvas.render();
}

  /**
  * 设置默认的连线终止箭头
  */

 const onHandleSelectMenu2 = data => {
  setToArrowType(data.item.props.children);
  canvas.data.toArrowType = data.key;
  canvas.render();
}


  /**
  * 元素连线之间的选项
  */

 const menu2 = (
  <Menu onClick={data => onHandleSelectMenu2(data)} style={{ border: 0 }}>
    <Menu.Item key="空">
      无箭头
    </Menu.Item>
    <Menu.Item key="triangleSolid">
      实心三角形
    </Menu.Item>
    <Menu.Item key="triangle">
      空心三角形
    </Menu.Item>
    <Menu.Item key="diamondSolid">
      实心菱形
    </Menu.Item>
    <Menu.Item key="diamond">
      空心菱形
    </Menu.Item>
    <Menu.Item key="circleSolid">
      实心圆
    </Menu.Item>
    <Menu.Item key="circle">
      空心圆
    </Menu.Item>
    <Menu.Item key="line">
      线型箭头
    </Menu.Item>
    <Menu.Item key="lineUp">
      上单边线箭头
    </Menu.Item>
    <Menu.Item key="lineDown">
      下单边线箭头
    </Menu.Item>
  </Menu>
);

  /**
  * 元素连线之间的选项
  */

  const menu1 = (
    <Menu onClick={data => onHandleSelectMenu1(data)} style={{ border: 0 }}>
      <Menu.Item key="空">
        无箭头
      </Menu.Item>
      <Menu.Item key="triangleSolid">
        实心三角形
      </Menu.Item>
      <Menu.Item key="triangle">
        空心三角形
      </Menu.Item>
      <Menu.Item key="diamondSolid">
        实心菱形
      </Menu.Item>
      <Menu.Item key="diamond">
        空心菱形
      </Menu.Item>
      <Menu.Item key="circleSolid">
        实心圆
      </Menu.Item>
      <Menu.Item key="circle">
        空心圆
      </Menu.Item>
      <Menu.Item key="line">
        线型箭头
      </Menu.Item>
      <Menu.Item key="lineUp">
        上单边线箭头
      </Menu.Item>
      <Menu.Item key="lineDown">
        下单边线箭头
      </Menu.Item>
    </Menu>
  );


  /**
  * 连线起始箭头
  */

  const menu = (
    <Menu onClick={data => onHandleSelectMenu(data)} style={{ border: 0 }}>
      <Menu.Item key="line">
        直线
    </Menu.Item>
      <Menu.Item key="polyline">
        折线
    </Menu.Item>
      <Menu.Item key="curve">
        曲线
    </Menu.Item>
    </Menu>
  );

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

      <Tag color="cyan" style={{ float: 'right', right: 10, marginTop: 12 }}>x{scaleNumber}</Tag>

      <ButtonGroup style={{ float: 'right', right: 10, marginTop: 7 }}>
        <Popover content={menu} title="默认连线类型" trigger="hover">
          <Button>{lineStyle}</Button>
        </Popover>

        <Popover content={menu1} title="默认起点箭头" trigger="hover">
          <Button>{fromArrowType}</Button>
        </Popover>

        <Popover content={menu2} title="默认终点箭头" trigger="hover">
          <Button>{toArrowType}</Button>
        </Popover>

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