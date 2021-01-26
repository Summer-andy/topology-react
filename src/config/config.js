const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32
  }
];

export const Tools = [
  {
    group: 'react组件',
    children: [
      {
        text: '按钮',
        icon: 'icon-anniu',
        name: 'button',
        color: '#f50',
        data: {
          autoRect: true,
          strokeStyle: '#fff',
          rect: {
            x: 100,
            y: 200,
            width: 100,
            height: 35
          },
          hideAnchor: true,
          name: 'button',
          data: {
            // 组件属性配置
            props: {
              type: 'primary',
              children: '查询'
            },
            // 异步请求配置
            http: {
              api: '/api/topologies?',
              type: 'get',
              paramsGetStyle: 'subscribe',
              paramsArr: []
            },
            // 绑定如图表图例id
            bind: []
          },
          events: [
            {
              type: 'doFn',
              action: 'Function',
              value: `let fun = (a) =>  params + a; fun(123); return 1231;  `,
              params: 123,
              name: 'onClick'
            }
          ]
        }
      },
      {
        text: '日期组件',
        icon: 'icon-shijianxuanze',
        name: 'datePicker',
        data: {
          strokeStyle: '#fff',
          hideAnchor: true,
          rect: {
            x: 100,
            y: 200,
            width: 300,
            height: 30
          },
          name: 'datePicker',
          data: {
            props: {
              allowClear: true
            }
          },
          events: [
            {
              type: 'doFn',
              action: 'Function',
              value: `let fun = (a) =>  console.log(params + a); fun(123);`,
              params: 123,
              name: 'onChange'
            }
          ]
        }
      },
      {
        text: '输入框文本',
        icon: 'icon-shurukuang',
        name: 'input',
        data: {
          strokeStyle: '#fff',
          hideAnchor: true,
          rect: {
            x: 100,
            y: 200,
            width: 200,
            height: 100
          },
          name: 'input',
          data: {
            props: {
              allowClear: true,
              placeholder: '请输入...'
            }
          },
          events: [
            {
              type: 'doFn',
              action: 'Function',
              value: `let fun = (a) =>  console.log(params + a); fun(123);`,
              params: 123,
              name: 'onChange'
            }
          ]
        }
      },
      {
        text: '表格',
        icon: 'icon-biaoge',
        name: 'table',
        data: {
          strokeStyle: '#fff',
          hideAnchor: true,
          rect: {
            x: 100,
            y: 200,
            width: 600,
            height: 400
          },
          name: 'table',
          data: {
            props: {
              columns: columns,
              dataSource: data,
              bordered: true,
              pagination: false
            },
            // 异步请求配置
            http: {
              api: '/api/topologies?',
              type: 'get',
              paramsGetStyle: 'subscribe',
              paramsArr : [{ key: 'pageIndex', value: 1 }, { key: 'pageCount', value: 10 }]
            }
          },
          events: [
            {
              type: 'doFn',
              action: 'Function',
              value: `let fun = (a) =>  console.log(params + a); fun(123);`,
              params: 123,
              name: 'onClick'
            }
          ]
        }
      }
    ]
  },
  {
    group: '系统组件',
    children: [
      {
        name: 'text',
        icon: 'icon-text',
        data: {
          text: '我是标签',
          rect: {
            width: 100,
            height: 30
          },
          name: 'text'
        }
      }
    ]
  },
  {
    group: '自定义图片',
    children: [
      {
        name: 'image',
        icon: 'icon-image',
        data: {
          text: '',
          rect: {
            width: 100,
            height: 100
          },
          name: 'image',
          image: require('./machine.jpg')
        }
      }
    ]
  },
  {
    group: '图表控件',
    children: [
      {
        elementRendered: false,
        name: '折线图',
        icon: 'icon-line-chart',
        data: {
          text: '折线图',
          rect: {
            width: 300,
            height: 200
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                xAxis: {
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                  type: 'value'
                },
                series: [
                  {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                  }
                ],
                seriesFunction: ` return {
                  color: ['#3398DB'],
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      // 坐标轴指示器，坐标轴触发有效
                      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                      axisTick: {
                        alignWithLabel: true
                      }
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value'
                    }
                  ],
                  series: [
                    {
                      name: '直接访问',
                      type: 'bar',
                      barWidth: '60%',
                      data: [10, 52, 200, 334, 390, 330, 220]
                    }
                  ]
                }`
              }
            },
            http: {
              api: '/api/topologies?',
              type: 'get',
              paramsGetStyle: 'subscribe',
              paramsArr : [{ key: 'pageIndex', value: 1 }, { key: 'pageCount', value: 10 }]
            },
          }
        }
      },
      {
        name: '柱状图',
        icon: 'icon-bar-chart',
        data: {
          text: '柱状图',
          rect: {
            width: 300,
            height: 200
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                color: ['#3398DB'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                      alignWithLabel: true
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'value'
                  }
                ],
                series: [
                  {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                  }
                ]
              }
            }
          }
        }
      },
      {
        name: '饼图',
        icon: 'icon-pie-chart',
        data: {
          text: '饼图',
          rect: {
            width: 200,
            height: 200
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                  orient: 'vertical',
                  x: 'left',
                  data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                  {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                      normal: {
                        show: false,
                        position: 'center'
                      },
                      emphasis: {
                        show: true,
                        textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                        }
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [
                      { value: 335, name: '直接访问' },
                      { value: 310, name: '邮件营销' },
                      { value: 234, name: '联盟广告' },
                      { value: 135, name: '视频广告' },
                      { value: 1548, name: '搜索引擎' }
                    ]
                  }
                ]
              }
            }
          }
        }
      },
      {
        name: '仪表盘',
        icon: 'icon-dashboard-chart',
        data: {
          text: '仪表盘',
          rect: {
            width: 300,
            height: 300
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                tooltip: {
                  formatter: '{a} <br/>{b} : {c}%'
                },
                toolbox: {
                  feature: {
                    restore: {},
                    saveAsImage: {}
                  }
                },
                series: [
                  {
                    name: '业务指标',
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    data: [{ value: 50, name: '完成率' }]
                  }
                ]
              }
            }
          }
        }
      }
    ]
  }
];
