## topology-react

### 什么是topology?

   [topology](https://www.yuque.com/alsmile/topology/about)是一款开源的基于canvas+typescript的绘图引擎，可用于实现软件架构图、微服务部署结构图、流程图、活动图、类图、时序图、SCADA等;我们也可以按照自己的想法实现任何我们想要的图形库.

### 为什么要有topology-react？

   topology-react是一个零侵入式(指的是数据层)的基于topology编写的example, 它可以很方便地集成到其他react项目中。

### 💡技术栈(主要)

  - react 16.13.1
  - antd 3.26.7
  - react-router-dom 5.2.0
  - @topology/activity-diagram  0.2.24
  - @topology/chart-diagram  0.2.24
  - @topology/class-diagram  0.2.24
  - @topology/core 0.2.26
  - @topology/flow-diagram  0.2.24
  - @topology/sequence-diagram  0.2.24

### 🎉  愿景

  1. 基于topology完成react版本的最佳实践。
  2. topology-react能够很简单的与其他系统完成融合。

### 🏷️ 开发进程
  - [x] 自定义iconfont示例
  - [x] 自定义图片示例
  - [x] 支持新建文件, 打开文件, 导出json, 保存png与svg
  - [x] 丰富画布右侧元素属性区域的外观属性(位置大小边距, 边框样式, 字体样式)
  - [x] 显示画布元素的数据属性(比如Id)
  - [x] 支持node节点自定义数据字段
  - [x] 顶部新增预览功能
  - [x] 顶部新增锁定功能
  - [x] 新增自动排版功能
  - [x] 新增在线图片添加功能
  - [x] 新增自定义事件功能
  - [x] 新增网格背景开关功能
  - [x] 新增websocket和MQTT功能
  - [x] 预览界面新增自动适应窗口大小功能
  - [ ] 未完待续...


### 🤝 提交规范

- perf: 优化相关，比如提升性能、体验
- feat: 新功能(feature)
- fix: 修补 bug
- docs: 文档(documentation)
- style: 格式(不影响代码运行的变动)
- refactor: 重构(即不是新增功能，也不是修改 bug 的代码变动)
- test: 增加测试
- chore: 构建过程或辅助工具的变动
- upgrade: 第三方库升级
- revert: 回滚
- scope: commit 影响的范围, 比如: route, component, utils, build...
- merge: Merge branch ? of ?.


### ❤️ 分支管理

- 模块功能开发(feature/xxx)
- Bug 修改(bug/xxx)

### 🚨 其他注意事项

 - 项目合并到master会自动发布。如果代码有warning将会发布失败。
 - 项目不允许使用redux或者其他的数据流方案, 可以使用useReducer。
 - 代码中尽量编写注释, 标明函数的作用。


 ### FAQ
 