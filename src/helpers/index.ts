import config from "../configs";


export function getBasicInfo(): IBasicInfo {
  return {
    ...getUniqueInfo(),
    ...getConnection(),
    page: window.location.href,
    uId: getCookie("uId") || "",
    rId: getCookie("rId") || "",
    // 设备号
    dId: getCookie("deviceId") || "",
    // 设备类型
    dt: getCookie("deviceType") || "",
    // 系统
    sys: getCookie("sys") || "",
    //系统版本
    sv: getCookie("sysVersion") || "",
    //设备宽度像素
    sw: getScreen().w,
    // 设备高度像素
    sh: getScreen().h,
    // 当前版本号
    v: '{{VERSION}}'
  }
}

// 获取浏览器默认语言
export function getLang() {
  var lang = navigator.language || (navigator as any).userLanguage; //常规浏览器语言和IE浏览器
  lang = lang.substr(0, 2); //截取lang前2位字符
  return lang
}

// 获取屏幕宽高
export function getScreen() {
  return {
    w: document.documentElement.clientWidth || document.body.clientWidth,
    h: document.documentElement.clientHeight || document.body.clientHeight
  }
}

/**
 * 获取随机数 例子:Ab23cD_1546313114
 * @param len 长度
 */
export function randomString(len ?: number) {
  len = len || 10;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  let maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
      pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return `${pwd}_${new Date().getTime()}`;
}

/**
 * 获取url中参数
 */
export function getQueryString(name: string) {
    let reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)','i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

/**
 * 获取cookie
 */
export function getCookie(name: string) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

/**
 * 获取页面的唯一标识
 */
export function getUniqueInfo() {
  let uni = getCookie("uni");
  if (!uni) {
    uni = randomString(10);
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + config.expiredays);
    document.cookie = "uni=" + uni + ";domain=" + document.domain + ";path=/;expires=" + exdate.toGMTString();
  }
  return {
    uni: uni
  };
}

/**
 * 统计页面性能
 */
export function perforPage() {
  if (!window.performance) return {};
  let timing = performance.timing
  return {
    // DNS解析时间
    dnst: timing.domainLookupEnd - timing.domainLookupStart || 0,
    //TCP建立时间
    tcpt: timing.connectEnd - timing.connectStart || 0,
    // 白屏时间  
    wit: timing.responseStart - timing.navigationStart || 0,
    //dom渲染完成时间
    domt: timing.domContentLoadedEventEnd - timing.navigationStart || 0,
    //页面onload时间
    lodt: timing.loadEventEnd - timing.navigationStart || 0,
    // 页面准备时间 
    radt: timing.fetchStart - timing.navigationStart || 0,
    // 页面重定向时间
    rdit: timing.redirectEnd - timing.redirectStart || 0,
    // unload时间
    uodt: timing.unloadEventEnd - timing.unloadEventStart || 0,
    //request请求耗时
    reqt: timing.responseEnd - timing.requestStart || 0,
    //页面解析dom耗时
    andt: timing.domComplete - timing.domInteractive || 0,
  }
}

/**
 * 统计页面资源性能
 */
export function perforResource(initiatorType: string) {
  if (!window.performance || !window.performance.getEntries) return "浏览器或者webview不支持performance或getEntries";
  return performance.getEntriesByType("resource")
    .filter((item: PerformanceEntry) => {
      let timing: PerformanceResourceTiming = <PerformanceResourceTiming>item;
      if (timing.initiatorType === initiatorType) return false;
    })
    .map((item: PerformanceEntry) => {
      let timing: PerformanceResourceTiming = <PerformanceResourceTiming>item;
      return {
        name: item.name,
        type: timing.initiatorType,
        nextHopProtocol: timing.nextHopProtocol,
        // 重定向的时间
        redirect: timing.redirectEnd - timing.redirectStart || 0,
        // DNS 查询时间
        lookupDomain: timing.domainLookupEnd - timing.domainLookupStart || 0,
        // 内容加载完成的时间
        request: timing.responseEnd - timing.requestStart || 0,
        // TCP 建立连接完成握手的时间
        connect: timing.connectEnd - timing.connectStart || 0,
        duration: timing.duration || 0,
      }
    })
}

/**
 * 获取网络情况
 */
export function getConnection () {
  let connection = (navigator as any).connection;
  if (!connection) {
    return {
      ct: navigator.onLine ? "online" : "offline"
    };
  }
  const { rtt, downlink, effectiveType, saveData } = connection;
  return {
    // 有效网络连接类型
    ct: effectiveType,
    // 估算的下行速度/带宽
    cs: `${downlink}Mb/s`,
    // 估算的往返时间
    cr: `${rtt}ms`,
    // 打开/请求数据保护模式
    csa: saveData
  }
}

// 监听事件
export function on<K extends keyof WindowEventMap>(event: K, listener: (this: Window, ev: WindowEventMap[K]) => any) {
  window.addEventListener && window.addEventListener(event, function eventHandle(ev: WindowEventMap[K]) {
    listener.call(this, ev)
  }, true) 
  window.attachEvent && window.attachEvent("on" + event, function eventHandle(this: Window, ev: WindowEventMap[K]) {
    listener.call(this, ev);
  })
}

// 取消监听事件
export function off<K extends keyof WindowEventMap>(event: K, listener: (this: Window, ev: WindowEventMap[K]) => any) {
  window.removeEventListener && window.removeEventListener(event, listener);
  window.detachEvent && window.detachEvent(event, listener);
}

// 自定义事件，并dispatch
export function dispatchCustomEvent (e: string, t:string) {
  let r: any;
  CustomEvent 
    ? r = new CustomEvent(e, {
        detail: t
      }) 
    : (
      (r = window.document.createEvent("HTMLEvents")).initEvent(e, !1, !0),
      r.detail = t
    );
  window.dispatchEvent(r);
}

// 获取hash值
export function parseHash (e:string) {
  return (e ? parseUrl(e.replace(/^#\/?/, "")) : "") || "[index]";
}

// 获取域名
export function parseUrl (e: string) {
  return e.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "");
}

// 判断是否生产环境
export function isProd () {
  return config.env === 'production';
}

// 函数aop封装
export function replace(target: any, methodName: string, replacer: Function, namespace?: string) {
  let top: any = window || global || undefined;
  if (!top) {
    throw new ReferenceError("the top object is not exist");
  } 
  if (!top._replace_center_) top._replace_center_ = {};
  let container = namespace ? top._replace_center_[namespace] ? top._replace_center_[namespace] : top._replace_center_[namespace] = {} : top._replace_center_;
  if (!container[methodName]) {
    container[methodName] = target[methodName];
    target[methodName] = replacer;
  }
}

// 函数aop解除封装
export function reduction(target: any, methodName: string, namespace?: string) {
  let top: any = window || global || undefined;
  if (!top) {
    throw new ReferenceError("the top object is not exist");
  } 
  if (!top._replace_center_) top._replace_center_ = {};
  let container = namespace ? top._replace_center_[namespace] ? top._replace_center_[namespace] : top._replace_center_[namespace] = {} : top._replace_center_;
  if (top._replace_center_[methodName]) {
    target[methodName] = container[methodName];
    delete container[methodName];
  }
}

//兼容所有浏览器获得构造函数名称
export function getFnName(fn: Function){
  return fn.name || /function (.+)\(/.exec(fn + '')[1];
}

export function getCurrentElement(target: HTMLElement) {
  let r = target.outerHTML.match("<.+?>");
  return r && r[0] || "";
}