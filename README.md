# 克苏恩（Cthun）

## 项目说明
该项目是用于前端监控的埋点系统，旨在实现一个支持无埋点，手工埋点，声明埋点为一体的埋点方案，并且提供一定自由扩展能力，可以进行一些定制化埋点需求，后期考虑支持小程序平台，该项目为非商用项目，如使用该项目开发商业项目，本人不对其使用过程中产生的任何问题付责。

## 安装
```
npm install cthun --save
```

## 引入方法
***es moduel引入***
```javascript
import * as Cthun from 'cthun'
```

***commonjs引入***
```javascript
const Cthun = require('cthun')
```

***script引入***
```html
<script src='./cthun.min.js' />
```

## 使用方法
***参数类型说明***
```javascript
interface IMonitorOptions {
  // appId
  appId: string;
  // 是否持久化
  persistence: boolean;
  // 是否压缩
  gzip: boolean; 
  // 收集器
  error?: boolean;
  uncaught?: boolean;
  action?: boolean;
  pv?: boolean;
  performance?: boolean;
}

type TInfos = IMsgInfo | IPerformanceInfo | IEnvInfo | IErrorInfo | IActionInfo | IPvInfo;
```
***基本使用方法***
```javascript
let launcher = new Cthun.MonitorLauncher(IMonitorOptions);
let receptacle =  Cthun.Receptacle.getInstance();
receptacle.push(TInfos)

launcher.start();
```

***声明埋点***
```html
<input id="input1" type="text" action-data='{"events":["click","input"]}'/>
```

## 进阶用法
***自定义上报策略***
```javascript
let launcher = new Cthun.MonitorLauncher(IMonitorOptions);

class CustomStrategy extends Cthun.AbstarctStrategy {
  consume(params: IUploadParams): Promise<any> {
    // TODO: 这里写上报策略消费逻辑
  }
}

launcher.subscribe({
  api: "http://localhost:8080/api",
  // 传AbstarctStrategy子类或者子类的数组，将依次尝试数组中提供的策略
  strategys: [new CustomStrategy({
    breakerOptions: {
      thresholdForOpen: '5/60',
      idleTimeForOpen: 5 * 60,
      thresholdForHalfOpen: '1/60'
    }
  })]
});
```

***自定义收集器***
```javascript
class CustomCollector extends Cthun.AbstractCollector {
  start () {
    // TODO: 这里写收集器开始的逻辑
  }

  stop () {
    // TODO: 这里写收集器结束的结束
  }
}

Cthun.collectors.register("custom", CustomCollector);
```