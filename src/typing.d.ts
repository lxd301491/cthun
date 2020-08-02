interface Navigator {
  connection: any;
}

interface Window {
  attachEvent<K extends keyof WindowEventMap>(event: string, listener: (evt: WindowEventMap[K]) => void) : void;
  detachEvent<K extends keyof WindowEventMap>(event: string, listener: (evt: WindowEventMap[K]) => void) : void;
  _replace_center_: any;
  XMLHttpRequest: any;
  _onpopstate_: any;
  WTjson: any;
  _tag: any;
}

interface HTMLStyleElement {
  styleSheet: {
    cssText: string
  }
}

interface Date {
  toGMTString(): string;
}

interface InputEvent extends UIEvent {
  readonly data: string | null;
  readonly inputType: string;
  readonly isComposing: boolean;
}

declare var InputEvent: {
  prototype: InputEvent;
  new(type: string, eventInitDict?: InputEventInit): InputEvent;
};

interface WindowEventMap {
  "historystatechanged": CustomEvent
} 

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

type TMsgLevel = "info" | "warning" | "error" | "crash";

interface IMsgInfo {
   // 消息说明
   msg: string
   // 消息源
   ms: string
   // 消息等级
   ml: TMsgLevel
}

interface INetworkInfo {
  // 有效网络连接类型
  ct: string
  // 估算的下行速度/带宽
  cs?: string
  // 估算的往返时间
  cr?: string
  // 打开/请求数据保护模式
  csa?: string
}


interface IEnvInfo {
  // 设备号
  dId: string
  // 设备类型
  dt: string
  // 系统
  sys: string
  //系统版本
  sv: string
  //设备宽度像素
  sw: number
  // 设备高度像素
  sh: number
  // 当前版本号
  v: string
}

interface IBasicInfo extends INetworkInfo, IEnvInfo {
  // 单次会话唯一表示
  uni: string
  // 当前页面
  page: string
  // 用户id
  uId: string
  // 用户角色
  rId: string
}

interface IPvInfo extends IMsgInfo {
  // 当前页面
  page: string
  // document title
  dot: string
  // document location
  dol: string 
  // 来源
  dr: string 
  // dpr
  dpr: number 
  // document 编码
  de: string 
}

interface IPerformanceInfo extends IMsgInfo {
  // DNS解析时间
  dnst?: number
  // TCP建立时间
  tcpt?: number
  // 白屏时间  
  wit?: number
  // dom渲染完成时间
  domt?: number
  // 页面onload时间
  lodt?: number
  // 页面准备时间 
  radt?: number
  // 页面重定向时间
  rdit?: number
  // unload时间
  uodt?: number
  // request请求耗时
  reqt?: number
  // 页面解析dom耗时
  andt?: number
}

interface IErrorInfo extends IMsgInfo {
  // 文件名字和路径
  file: string,
  // 错误行号
  line: number,
  // 错误列号
  col: number,
  // 错误堆栈信息
  stack: string
}

interface IActionInfo extends IMsgInfo {
  // 行为类型
  at: string,
  // 元素信息
  el?: string,
  // 行为描述
  ad?: string,
  // 键盘事件独有，表示那个按键被点击
  key?: string
  // 鼠标或者手指横坐标
  x?: number,
  // 鼠标或者手指纵坐标
  y?: number,
  // 多个手指触发时，第几个
  c?: number
}

interface IConsumeParams {
  api: string;
  data: string;
  [propName: string]: any;
}
