import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'le5le-store';
import { s8, createDiv, rectangle, Line } from '@topology/core';
import { canvas } from '../index';
import Axios from '../../utils/Service';
import moment from 'moment';
const querystring = require('querystring');
// 存放原生dom节点
const reactNodesData = {};

const reactNodes = (ReactComponent) => (ctx, node) => {
  // 绘制一个底图，类似于占位符。
  rectangle(ctx, node);

  // 如果未知组件，直接返回
  if (!ReactComponent) {
    return;
  }

  // 需要设置一个唯一的id，方便绘画引擎识别
  if (!node.elementId) {
    node.elementId = s8();
  }

  // 节点的elementLoaded用于判断第三方图形库是否第一次加载，是否需要初始化
  // 这是一个辅助变量，用户自己赋值使用或不用
  if (!node.elementLoaded) {
    // 创建一个div容器
    reactNodesData[node.id] = {
      div: createDiv(node)
    };
    node.elementLoaded = true;
    document.body.appendChild(reactNodesData[node.id].div);

    // 添加当前节点到div层，否则无法显示
    node.addToDiv();

    // 初始化 react 组件
    if (node && node.data && node.data.props) {
      let eventProps = {};
      if (node.events.length > 0) {
        node.events.forEach((element) => {
          // eslint-disable-next-line no-new-func
          let _fn = new Function('params', element.value);
          eventProps[element.name] = async (componentValue) => {

            /**
             * 对不同组件的回调函数进行特殊的处理, 将组件的回调值传入Store中, 供其他组件使用.
             */

            if (['datePicker'].includes(node.name)) {
              Store.set(`componentValue-${node.id}`, moment(componentValue).format('YYYY-MM-DD'));
            } else if (['input'].includes(node.name)) {
              Store.set(`componentValue-${node.id}`, componentValue.target.value);
              node.data.props.value = componentValue.target.value;
            } else {
              Store.set(`componentValue-${node.id}`, componentValue);
            }

            if (node.data && node.data.http) {

              const { api, type, paramsArr } = node.data.http;
              const queryData = {};
              paramsArr.forEach((item) => {
                queryData[item.key] = Store.get(item.value);
              });

              /**
               * 异步请求在此调用, 并且将获得的数据塞入store
               */

              const data = await Axios[type](`${api}${querystring.stringify(queryData)}`);
              
              Store.set(`http-${node.id}`, data);

              /**
               * 从画布中获取绑定的节点, 进行值的更新, 目前只支持ECharts图表的更新
               */

              if (node.data.bind && node.data.bind.length > 0) {
                node.data.bind.forEach((b) => {
                  let _pen = canvas.data.pens.find((pen) => pen.id === b);
                  let idx = canvas.data.pens.findIndex((pen) => pen.id === b);
                  if (_pen.data.echarts) {
                    canvas.data.pens[idx].elementRendered = false;
                    const { seriesFunction } = canvas.data.pens[idx].data.echarts.option;
                    let _seriesFn = new Function('params', seriesFunction);
                    canvas.data.pens[idx].data.echarts.option = _seriesFn(data)
                  } else {
                    // 暂时忽略线条节点的处理
                    if (canvas.data.pens[idx] instanceof Line) {
                      return;
                    }

                    // 后期可以处理正常的节点
                  }
                });
              }

              let reader = new FileReader();
              const result = new Blob([JSON.stringify(canvas.data)], {
                type: 'text/plain;charset=utf-8'
              });
              reader.readAsText(result, 'text/plain;charset=utf-8');
              reader.onload = (e) => {
                canvas.open(JSON.parse(reader.result));
              };
            }

            await _fn(element.params);
          };
        });
      }

      reactNodesData[node.id].component = ReactDOM.render(
        <ReactComponent {...node.data.props} {...eventProps} />,
        reactNodesData[node.id].div
      );
    }

    node.elementRendered = false;
  }

  // 节点的elementRendered用于判断第三方图形库是否需要重绘
  // 绘画引擎需要重绘节点时，会把此属性设置为false
  if (!node.elementRendered) {
    console.log('!node.elementRendered');
    // 初始化时，等待父div先渲染完成，避免初始图表控件太大。
    setTimeout(() => {
      // 重绘完成，避免不必要的重复重绘
      node.elementRendered = true;
    });
  }
};

export default reactNodes;
