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
```
```javascript
let monitor = new Cthun.Monitor(IMonitorOptions);
```

