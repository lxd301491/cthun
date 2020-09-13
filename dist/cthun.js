(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Cthun = factory());
}(this, function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
    * 拦截器
    */
    var handlers = {
        beforeCollect: undefined,
        afterCollect: undefined,
        beforeConsume: undefined,
        afterConsume: undefined
    };
    var config = {
        env: 'production',
        /**
         * cookie过期时间
         */
        expiredays: 24 * 60 * 60 * 1000,
        /**
         * 超长消息压缩阈值
         */
        infoLenMax: 1000
    };

    function getBasicInfo() {
        return __assign(__assign(__assign({}, getUniqueInfo()), getConnection()), { page: window.location.href, uId: getCookie("uId") || "", rId: getCookie("rId") || "", 
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
            v: '0.0.1' });
    }
    // 获取屏幕宽高
    function getScreen() {
        return {
            w: document.documentElement.clientWidth || document.body.clientWidth,
            h: document.documentElement.clientHeight || document.body.clientHeight
        };
    }
    /**
     * 获取随机数 例子:Ab23cD_1546313114
     * @param len 长度
     */
    function randomString(len) {
        len = len || 10;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd + "_" + new Date().getTime();
    }
    /**
     * 获取cookie
     */
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    }
    /**
     * 获取页面的唯一标识
     */
    function getUniqueInfo() {
        var uni = getCookie("uni");
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
    function perforPage() {
        if (!window.performance)
            return {};
        var timing = performance.timing;
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
        };
    }
    /**
     * 获取网络情况
     */
    function getConnection() {
        var connection = navigator.connection;
        if (!connection) {
            return {
                ct: navigator.onLine ? "online" : "offline"
            };
        }
        var rtt = connection.rtt, downlink = connection.downlink, effectiveType = connection.effectiveType, saveData = connection.saveData;
        return {
            // 有效网络连接类型
            ct: effectiveType,
            // 估算的下行速度/带宽
            cs: downlink + "Mb/s",
            // 估算的往返时间
            cr: rtt + "ms",
            // 打开/请求数据保护模式
            csa: saveData
        };
    }
    // 监听事件
    function on(event, listener) {
        window.addEventListener && window.addEventListener(event, function eventHandle(ev) {
            listener.call(this, ev);
        }, true);
        window.attachEvent && window.attachEvent("on" + event, function eventHandle(ev) {
            listener.call(this, ev);
        });
    }
    // 取消监听事件
    function off(event, listener) {
        window.removeEventListener && window.removeEventListener(event, listener);
        window.detachEvent && window.detachEvent(event, listener);
    }
    // 自定义事件，并dispatch
    function dispatchCustomEvent(e, t) {
        var r;
        CustomEvent
            ? r = new CustomEvent(e, {
                detail: t
            })
            : ((r = window.document.createEvent("HTMLEvents")).initEvent(e, !1, !0),
                r.detail = t);
        window.dispatchEvent(r);
    }
    // 获取hash值
    function parseHash(e) {
        return (e ? parseUrl(e.replace(/^#\/?/, "")) : "") || "[index]";
    }
    // 获取域名
    function parseUrl(e) {
        return e.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "");
    }
    // 判断是否生产环境
    function isProd() {
        return config.env === 'production';
    }
    // 函数aop封装
    function replace(target, methodName, replacer, namespace) {
        var top = window || global || undefined;
        if (!top) {
            throw new ReferenceError("the top object is not exist");
        }
        if (!top._replace_center_)
            top._replace_center_ = {};
        var container = namespace ? top._replace_center_[namespace] ? top._replace_center_[namespace] : top._replace_center_[namespace] = {} : top._replace_center_;
        if (!container[methodName]) {
            container[methodName] = target[methodName];
            target[methodName] = replacer;
        }
    }
    // 函数aop解除封装
    function reduction(target, methodName, namespace) {
        var top = window || global || undefined;
        if (!top) {
            throw new ReferenceError("the top object is not exist");
        }
        if (!top._replace_center_)
            top._replace_center_ = {};
        var container = namespace ? top._replace_center_[namespace] ? top._replace_center_[namespace] : top._replace_center_[namespace] = {} : top._replace_center_;
        if (top._replace_center_[methodName]) {
            target[methodName] = container[methodName];
            delete container[methodName];
        }
    }
    //兼容所有浏览器获得构造函数名称
    function getFnName(fn) {
        return fn.name || /function (.+)\(/.exec(fn + '')[1];
    }
    function getCurrentElement(target) {
        var r = target.outerHTML.match("<.+?>");
        return r && r[0] || "";
    }

    function around(debuggable, before, after) {
        if (debuggable === void 0) { debuggable = false; }
        return function (target, methodName, descriptor) {
            return {
                value: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return __awaiter(this, void 0, void 0, function () {
                        var result, _a, _b, _c, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    if (handlers[before])
                                        args = handlers[before].apply(this, [args]);
                                    debuggable && !isProd() && console.info(target.constructor.name + " " + methodName + " args", args);
                                    result = descriptor.value.apply(this, args);
                                    if (handlers[after])
                                        result = handlers[after].apply(this, [result]);
                                    if (!(result instanceof Promise)) return [3 /*break*/, 3];
                                    _a = debuggable && !isProd();
                                    if (!_a) return [3 /*break*/, 2];
                                    _c = (_b = console).info;
                                    _d = [target.constructor.name + " " + methodName + " result"];
                                    return [4 /*yield*/, result];
                                case 1:
                                    _a = _c.apply(_b, _d.concat([_e.sent()]));
                                    _e.label = 2;
                                case 2:
                                    return [3 /*break*/, 4];
                                case 3:
                                    debuggable && !isProd() && console.info(target.constructor.name + " " + methodName + " result", result);
                                    _e.label = 4;
                                case 4: return [2 /*return*/, result];
                            }
                        });
                    });
                }
            };
        };
    }

    var ListNode = /** @class */ (function () {
        function ListNode(val) {
            this._val = val;
            this._prev = null;
            this._next = null;
        }
        Object.defineProperty(ListNode.prototype, "val", {
            get: function () {
                return this._val;
            },
            set: function (val) {
                this._val = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListNode.prototype, "prev", {
            get: function () {
                return this._prev;
            },
            set: function (prev) {
                this._prev = prev;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListNode.prototype, "next", {
            get: function () {
                return this._next;
            },
            set: function (next) {
                this._next = next;
            },
            enumerable: true,
            configurable: true
        });
        ListNode.prototype.hasPrev = function () {
            return !!this._prev;
        };
        ListNode.prototype.hasNext = function () {
            return !!this._next;
        };
        return ListNode;
    }());

    var DoubileLinkedList = /** @class */ (function () {
        function DoubileLinkedList() {
            this._count = 0; //记录元素个数
            this._header = new ListNode(null);
            this._tail = new ListNode(null);
            this._header.next = this._tail;
            this._tail.prev = this._header;
        }
        DoubileLinkedList.prototype._remove = function (prev, next, val) {
            var node = new ListNode(val);
            prev.next = node.next;
            next.prev = node.prev;
            this._count--;
            return val;
        };
        DoubileLinkedList.prototype._add = function (prev, next, val) {
            var node = new ListNode(val);
            prev.next = node;
            node.prev = prev;
            next.prev = node;
            node.next = next;
            this._count++;
        };
        // 尾部插入一个元素
        DoubileLinkedList.prototype.add = function (a) {
            this._add(this._tail.prev, this._tail, a);
        };
        // 中间插入一个元素
        DoubileLinkedList.prototype.insert = function (node, a) {
            if (this.empty()) {
                return;
            }
            var prevNode = this._header.next;
            while (prevNode != this._tail) {
                if (prevNode.val == node) {
                    this._add(prevNode, prevNode.next, a);
                    break;
                }
                prevNode = prevNode.next;
            }
        };
        // 删除指定元素
        DoubileLinkedList.prototype.remove = function (a) {
            if (this.empty()) {
                return;
            }
            var targetNode = this._header.next;
            while (targetNode !== this._tail) {
                if (targetNode.val == a) {
                    var value = this._remove(targetNode.prev, targetNode.next, targetNode.val);
                    targetNode.next = null;
                    targetNode.prev = null;
                    return value;
                }
                targetNode = targetNode.next;
            }
        };
        DoubileLinkedList.prototype.header = function () {
            return this._header.next;
        };
        DoubileLinkedList.prototype.tail = function () {
            return this._tail;
        };
        DoubileLinkedList.prototype.find = function (a) {
            if (this.empty()) {
                return;
            }
            var targetNode = this._header.next;
            while (targetNode !== this._tail) {
                if (targetNode.val == a) {
                    return targetNode;
                }
                targetNode = targetNode.next;
            }
            return null;
        };
        DoubileLinkedList.prototype.reverse_find = function (a) {
            if (this.empty()) {
                return;
            }
            var targetNode = this._tail.prev;
            while (targetNode !== this._tail) {
                if (targetNode.val == a) {
                    return targetNode;
                }
                targetNode = targetNode.prev;
            }
            return null;
        };
        DoubileLinkedList.prototype.size = function () {
            return this._count;
        };
        DoubileLinkedList.prototype.empty = function () {
            return this._count === 0;
        };
        DoubileLinkedList.prototype.clear = function () {
            var node = this._header.next;
            while (node !== this._tail) {
                node.prev = null;
                node.val = null;
                node = node.next;
                node.prev.next = null;
            }
            this._header.next = this._tail;
            this._tail.prev = this._header;
            this._count = 0;
        };
        return DoubileLinkedList;
    }());

    var MonitorConsumer = /** @class */ (function () {
        function MonitorConsumer(options) {
            this._strategys = new DoubileLinkedList();
            this._strategy = this._strategys.header();
            this._api = options.api;
            this.beforeConsume = options.beforeConsume;
        }
        MonitorConsumer.prototype.registerStrategy = function (strategy) {
            this._strategys.add(strategy);
            return this;
        };
        MonitorConsumer.prototype.removeStrategy = function (strategy) {
            this._strategys.remove(strategy);
            return this;
        };
        MonitorConsumer.prototype.consume = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var params, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.beforeConsume) {
                                data = this.beforeConsume(data);
                            }
                            params = {
                                api: this._api,
                                data: data
                            };
                            this._strategy = this._strategy == this._strategys.tail() ? this._strategys.header() : this._strategy;
                            _a = this._strategy.val;
                            if (!_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._strategy.val.consume(params)];
                        case 1:
                            _a = !(_b.sent());
                            _b.label = 2;
                        case 2:
                            if (!_a) return [3 /*break*/, 7];
                            this._strategy = this._strategys.header();
                            _b.label = 3;
                        case 3:
                            if (!this._strategy.hasNext()) return [3 /*break*/, 6];
                            if (!(this._strategy.val && this._strategy.val.canPass())) return [3 /*break*/, 5];
                            return [4 /*yield*/, this._strategy.val.consume(params)];
                        case 4:
                            if (_b.sent()) {
                                return [2 /*return*/, true];
                            }
                            this._strategy = this._strategy.next;
                            _b.label = 5;
                        case 5: return [3 /*break*/, 3];
                        case 6: return [2 /*return*/, false];
                        case 7: return [2 /*return*/, true];
                    }
                });
            });
        };
        __decorate([
            around(true, "beforeConsume", "afterConsume")
        ], MonitorConsumer.prototype, "consume", null);
        return MonitorConsumer;
    }());

    var DefaultStore = /** @class */ (function () {
        function DefaultStore() {
            this._kv = new Map();
        }
        DefaultStore.prototype.getItem = function (key, callback) {
            try {
                callback && callback(null, this._kv.get(key));
                return Promise.resolve(this._kv.get(key));
            }
            catch (e) {
                callback && callback(e, null);
                return Promise.reject(e);
            }
        };
        DefaultStore.prototype.setItem = function (key, value, callback) {
            try {
                this._kv.set(key, value);
                callback && callback(null, value);
                return Promise.resolve(value);
            }
            catch (e) {
                callback && callback(e, null);
                return Promise.reject(e);
            }
        };
        DefaultStore.prototype.removeItem = function (key, callback) {
            try {
                this._kv.delete(key);
                callback && callback(null);
                return Promise.resolve();
            }
            catch (e) {
                callback && callback(e);
                return Promise.reject(e);
            }
        };
        DefaultStore.prototype.clear = function (callback) {
            try {
                this._kv.clear();
                callback && callback(null);
                return Promise.resolve();
            }
            catch (e) {
                callback && callback(e);
                return Promise.reject(e);
            }
        };
        DefaultStore.prototype.length = function (callback) {
            try {
                callback && callback(null, this._kv.size);
                return Promise.resolve(this._kv.size);
            }
            catch (e) {
                callback && callback(e, null);
                return Promise.reject(e);
            }
        };
        DefaultStore.prototype.key = function (keyIndex, callback) {
            if (keyIndex < 0 || this._kv.size <= keyIndex) {
                callback && callback(new Error("the keyIndex is out of range"), undefined);
                return Promise.reject(new Error("the keyIndex is out of range"));
            }
            callback && callback(null, this._kv.keys()[keyIndex]);
            return Promise.resolve(this._kv.keys()[keyIndex]);
        };
        DefaultStore.prototype.keys = function (callback) {
            callback && callback(null, Array.from(this._kv.keys()));
            return Promise.resolve(Array.from(this._kv.keys()));
        };
        DefaultStore.prototype.iterate = function (iteratee, callback) {
            var len = this._kv.size;
            var result = null;
            try {
                for (var i = 0; i < len; i++) {
                    result = iteratee(this._kv.values[i], this._kv.keys[i], i);
                }
                callback && callback(null, result);
                return Promise.resolve(result);
            }
            catch (e) {
                callback && callback(e, null);
                return Promise.reject(e);
            }
        };
        return DefaultStore;
    }());
    var Receptacle = /** @class */ (function () {
        function Receptacle(appId, forage) {
            this.shiftKeys = [];
            this.appId = appId;
            this.forage = forage || new DefaultStore();
        }
        Receptacle.getInstance = function (appId, forage) {
            if (!Receptacle.instance && !appId) {
                throw new Error("Receptacle instance is not created, please specify the appId when construct the MonitorLauncher");
            }
            if (!Receptacle.instance) {
                Receptacle.instance = new Receptacle(appId, forage);
            }
            return Receptacle.instance;
        };
        Receptacle.prototype.cleanShift = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.shiftKeys.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.forage.removeItem(this.shiftKeys.pop())];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 0];
                        case 2:
                            this.shiftKeys = [];
                            return [2 /*return*/];
                    }
                });
            });
        };
        Receptacle.prototype.shift = function (size, immediate) {
            if (immediate === void 0) { immediate = true; }
            return __awaiter(this, void 0, void 0, function () {
                var items, keys, key, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            items = [];
                            return [4 /*yield*/, this.keys()];
                        case 1:
                            keys = _c.sent();
                            _c.label = 2;
                        case 2:
                            if (!(size && keys.length > 0)) return [3 /*break*/, 4];
                            key = keys.shift() || "";
                            _b = (_a = items).push;
                            return [4 /*yield*/, this.forage.getItem(key)];
                        case 3:
                            _b.apply(_a, [_c.sent()]);
                            this.shiftKeys.push(key);
                            size--;
                            return [3 /*break*/, 2];
                        case 4:
                            if (!immediate) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.cleanShift()];
                        case 5:
                            _c.sent();
                            _c.label = 6;
                        case 6: return [2 /*return*/, items];
                    }
                });
            });
        };
        Receptacle.prototype.push = function (item) {
            return __awaiter(this, void 0, void 0, function () {
                var key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = this.appId + "_" + randomString();
                            return [4 /*yield*/, this.forage.setItem(key, item)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, key];
                    }
                });
            });
        };
        Receptacle.prototype.length = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.forage.length()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Receptacle.prototype.clear = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.forage.clear()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Receptacle.prototype.keys = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.forage.keys()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Receptacle.prototype.iterate = function (iteratee) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.forage.iterate(iteratee)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        __decorate([
            around(true, "beforeCollect", "afterCollect")
        ], Receptacle.prototype, "push", null);
        return Receptacle;
    }());

    var MonitorLauncher = /** @class */ (function () {
        function MonitorLauncher(options) {
            this.consumers = new DoubileLinkedList();
            options.store ? Receptacle.getInstance(options.appId, options.store) : Receptacle.getInstance(options.appId);
        }
        /**
         * 启动上报
         *
         * @param period 上报周期
         * @param size 一次上报埋点的数量
         */
        MonitorLauncher.prototype.start = function (period, size) {
            var _this = this;
            if (period === void 0) { period = 15000; }
            if (size === void 0) { size = 10; }
            if (this.timer)
                clearInterval(this.timer);
            this.timer = window.setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                var consumer, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.consumers.size() > 0)) return [3 /*break*/, 6];
                            consumer = this.consumers.header();
                            return [4 /*yield*/, Receptacle.getInstance().shift(size, false)];
                        case 1:
                            data = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!(consumer.hasNext() && data.length > 0)) return [3 /*break*/, 6];
                            return [4 /*yield*/, consumer.val.consume(typeof data === 'string' ? data : JSON.stringify(data))];
                        case 3:
                            if (!_a.sent()) return [3 /*break*/, 5];
                            return [4 /*yield*/, Receptacle.getInstance().cleanShift()];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            consumer = consumer.next;
                            return [3 /*break*/, 2];
                        case 6: return [2 /*return*/];
                    }
                });
            }); }, period);
        };
        /**
         * 关闭上报
         */
        MonitorLauncher.prototype.stop = function () {
            clearInterval(this.timer);
            this.timer = undefined;
        };
        /**
         * 注册消费者
         *
         * @param consumer 消费者实例
         */
        MonitorLauncher.prototype.subscribe = function (options) {
            this.consumers.add(new MonitorConsumer(options));
            return this.consumers.tail().val;
        };
        return MonitorLauncher;
    }());

    /**
     * 计数器
     */
    var Counter = /** @class */ (function () {
        function Counter(reserved) {
            this.nums = [];
            this.reserved = reserved;
        }
        Counter.prototype.get = function () {
            var _this = this;
            var now = Date.now();
            this.nums = this.nums.filter(function (num) {
                return num > now - _this.reserved * 1000;
            });
            return this.nums.length;
        };
        Counter.prototype.increase = function () {
            var _this = this;
            var now = Date.now();
            this.nums = this.nums.filter(function (num) {
                return num > now - _this.reserved * 1000;
            });
            this.nums.push(Date.now());
        };
        Counter.prototype.decrease = function () {
            this.nums.shift();
        };
        Counter.prototype.reset = function () {
            this.nums = [];
        };
        return Counter;
    }());

    // 抽象状态，闭合，断路，半开路的基类，定义基本接口
    var AbstractState = /** @class */ (function () {
        function AbstractState(time) {
            if (time === void 0) { time = Date.now(); }
            this.startTime = time;
        }
        AbstractState.prototype.canPass = function (breaker) {
            return true;
        };
        AbstractState.prototype.checkout = function (breaker) { };
        return AbstractState;
    }());

    var HalfOpenState = /** @class */ (function (_super) {
        __extends(HalfOpenState, _super);
        function HalfOpenState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HalfOpenState.prototype.canPass = function (breaker) {
            var limit = parseInt(breaker.thresholdForHalfOpen[0]);
            return breaker.getCount() <= limit;
        };
        HalfOpenState.prototype.checkout = function (breaker) {
            if (breaker.getCount() > parseInt(breaker.thresholdForHalfOpen[0])) {
                // 依然超过断路阈值, 切到 `OpenState`
                breaker.setState(new OpenState());
            }
            else {
                // 低于断路阈值, 切到 `CloseState`
                breaker.setState(new CloseState());
            }
        };
        return HalfOpenState;
    }(AbstractState));

    var OpenState = /** @class */ (function (_super) {
        __extends(OpenState, _super);
        function OpenState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OpenState.prototype.canPass = function () {
            return false;
        };
        OpenState.prototype.checkout = function (breaker) {
            var period = breaker.idleTimeForOpen * 1000;
            var now = Date.now();
            if (now >= this.startTime + period) {
                // 过了这段校验时间, 切换到 `HalfOpenState`
                breaker.setState(new HalfOpenState());
            }
        };
        return OpenState;
    }(AbstractState));

    var CloseState = /** @class */ (function (_super) {
        __extends(CloseState, _super);
        function CloseState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CloseState.prototype.canPass = function (breaker) {
            return true;
        };
        CloseState.prototype.checkout = function (breaker) {
            if (breaker.getCount() >= parseInt(breaker.thresholdForOpen[0])) {
                // 在这段校验时间内, 超过断路阈值, 切换到 `OpenState`
                breaker.setState(new OpenState());
            }
        };
        return CloseState;
    }(AbstractState));

    var CircuitBreaker = /** @class */ (function () {
        function CircuitBreaker(options) {
            this.idleTimeForOpen = options.idleTimeForOpen;
            this.thresholdForOpen = options.thresholdForOpen.split("/");
            this.thresholdForHalfOpen = options.thresholdForHalfOpen.split("/");
            this.counter = new Counter(Math.max(parseInt(this.thresholdForOpen[1]), parseInt(this.thresholdForHalfOpen[1]))); // max times for each 60s
            this.state = new CloseState(); // default state
        }
        CircuitBreaker.prototype.getStateName = function () {
            /^function\s(.*)\(/.exec(this.state.constructor + "");
            return RegExp.$1;
        };
        CircuitBreaker.prototype.getState = function () {
            return this.state;
        };
        CircuitBreaker.prototype.setState = function (state) {
            this.state = state;
        };
        CircuitBreaker.prototype.reset = function () {
            this.counter.reset();
        };
        CircuitBreaker.prototype.canPass = function () {
            this.getState().checkout(this);
            return this.getState().canPass(this);
        };
        CircuitBreaker.prototype.count = function () {
            // 计数器 +1, 同时让 当前的 state 去做条件校验
            this.counter.increase();
        };
        CircuitBreaker.prototype.getCount = function () {
            return this.counter.get();
        };
        CircuitBreaker.prototype.getDuration = function () {
            return (Date.now() - this.state.startTime) / 1000;
        };
        return CircuitBreaker;
    }());

    var AbstarctStrategy = /** @class */ (function () {
        function AbstarctStrategy(options) {
            if (options === void 0) { options = {
                breakerOptions: {
                    thresholdForOpen: '5/60',
                    idleTimeForOpen: 5 * 60,
                    thresholdForHalfOpen: '1/60'
                }
            }; }
            this.abnormalBreaker = new CircuitBreaker(options.breakerOptions);
        }
        AbstarctStrategy.prototype.canPass = function () {
            return this.abnormalBreaker.canPass();
        };
        AbstarctStrategy.prototype.count = function () {
            return this.abnormalBreaker.count();
        };
        return AbstarctStrategy;
    }());

    var BeaconStrategy = /** @class */ (function (_super) {
        __extends(BeaconStrategy, _super);
        function BeaconStrategy() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BeaconStrategy.prototype.consume = function (params) {
            if (!window || !window.navigator || "function" != typeof window.navigator.sendBeacon) {
                return Promise.reject(new Error("current enviment not support sendBeacon!"));
            }
            var paramsForm = new FormData();
            for (var key in params) {
                paramsForm.append(key, params[key]);
            }
            return new Promise(function (resolve, reject) {
                window.navigator.sendBeacon(params.api, paramsForm) ? resolve() : reject();
            });
        };
        return BeaconStrategy;
    }(AbstarctStrategy));

    var bind = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };

    /*global toString:true*/

    // utils is a library of generic helper functions non-specific to axios

    var toString = Object.prototype.toString;

    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Array, otherwise false
     */
    function isArray(val) {
      return toString.call(val) === '[object Array]';
    }

    /**
     * Determine if a value is undefined
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if the value is undefined, otherwise false
     */
    function isUndefined(val) {
      return typeof val === 'undefined';
    }

    /**
     * Determine if a value is a Buffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Buffer, otherwise false
     */
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
        && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
    }

    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    function isArrayBuffer(val) {
      return toString.call(val) === '[object ArrayBuffer]';
    }

    /**
     * Determine if a value is a FormData
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an FormData, otherwise false
     */
    function isFormData(val) {
      return (typeof FormData !== 'undefined') && (val instanceof FormData);
    }

    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */
    function isArrayBufferView(val) {
      var result;
      if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
      } else {
        result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
      }
      return result;
    }

    /**
     * Determine if a value is a String
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a String, otherwise false
     */
    function isString(val) {
      return typeof val === 'string';
    }

    /**
     * Determine if a value is a Number
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Number, otherwise false
     */
    function isNumber(val) {
      return typeof val === 'number';
    }

    /**
     * Determine if a value is an Object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */
    function isObject(val) {
      return val !== null && typeof val === 'object';
    }

    /**
     * Determine if a value is a Date
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Date, otherwise false
     */
    function isDate(val) {
      return toString.call(val) === '[object Date]';
    }

    /**
     * Determine if a value is a File
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a File, otherwise false
     */
    function isFile(val) {
      return toString.call(val) === '[object File]';
    }

    /**
     * Determine if a value is a Blob
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Blob, otherwise false
     */
    function isBlob(val) {
      return toString.call(val) === '[object Blob]';
    }

    /**
     * Determine if a value is a Function
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */
    function isFunction(val) {
      return toString.call(val) === '[object Function]';
    }

    /**
     * Determine if a value is a Stream
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Stream, otherwise false
     */
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }

    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
    }

    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     * @returns {String} The String freed of excess whitespace
     */
    function trim(str) {
      return str.replace(/^\s*/, '').replace(/\s*$/, '');
    }

    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     * nativescript
     *  navigator.product -> 'NativeScript' or 'NS'
     */
    function isStandardBrowserEnv() {
      if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                               navigator.product === 'NativeScript' ||
                                               navigator.product === 'NS')) {
        return false;
      }
      return (
        typeof window !== 'undefined' &&
        typeof document !== 'undefined'
      );
    }

    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     */
    function forEach(obj, fn) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      }

      // Force an array if not already something iterable
      if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }

    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     * @returns {Object} Result of all merge properties
     */
    function merge(/* obj1, obj2, obj3, ... */) {
      var result = {};
      function assignValue(val, key) {
        if (typeof result[key] === 'object' && typeof val === 'object') {
          result[key] = merge(result[key], val);
        } else {
          result[key] = val;
        }
      }

      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }

    /**
     * Function equal to merge with the difference being that no reference
     * to original objects is kept.
     *
     * @see merge
     * @param {Object} obj1 Object to merge
     * @returns {Object} Result of all merge properties
     */
    function deepMerge(/* obj1, obj2, obj3, ... */) {
      var result = {};
      function assignValue(val, key) {
        if (typeof result[key] === 'object' && typeof val === 'object') {
          result[key] = deepMerge(result[key], val);
        } else if (typeof val === 'object') {
          result[key] = deepMerge({}, val);
        } else {
          result[key] = val;
        }
      }

      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }

    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     * @return {Object} The resulting value of object a
     */
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }

    var utils = {
      isArray: isArray,
      isArrayBuffer: isArrayBuffer,
      isBuffer: isBuffer,
      isFormData: isFormData,
      isArrayBufferView: isArrayBufferView,
      isString: isString,
      isNumber: isNumber,
      isObject: isObject,
      isUndefined: isUndefined,
      isDate: isDate,
      isFile: isFile,
      isBlob: isBlob,
      isFunction: isFunction,
      isStream: isStream,
      isURLSearchParams: isURLSearchParams,
      isStandardBrowserEnv: isStandardBrowserEnv,
      forEach: forEach,
      merge: merge,
      deepMerge: deepMerge,
      extend: extend,
      trim: trim
    };

    function encode(val) {
      return encodeURIComponent(val).
        replace(/%40/gi, '@').
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, '+').
        replace(/%5B/gi, '[').
        replace(/%5D/gi, ']');
    }

    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @returns {string} The formatted url
     */
    var buildURL = function buildURL(url, params, paramsSerializer) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }

      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];

        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === 'undefined') {
            return;
          }

          if (utils.isArray(val)) {
            key = key + '[]';
          } else {
            val = [val];
          }

          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + '=' + encode(v));
          });
        });

        serializedParams = parts.join('&');
      }

      if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }

        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    };

    function InterceptorManager() {
      this.handlers = [];
    }

    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    InterceptorManager.prototype.use = function use(fulfilled, rejected) {
      this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
      });
      return this.handlers.length - 1;
    };

    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     */
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };

    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     */
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };

    var InterceptorManager_1 = InterceptorManager;

    /**
     * Transform the data for a request or a response
     *
     * @param {Object|String} data The data to be transformed
     * @param {Array} headers The headers for the request or response
     * @param {Array|Function} fns A single function or Array of functions
     * @returns {*} The resulting transformed data
     */
    var transformData = function transformData(data, headers, fns) {
      /*eslint no-param-reassign:0*/
      utils.forEach(fns, function transform(fn) {
        data = fn(data, headers);
      });

      return data;
    };

    var isCancel = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };

    var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };

    /**
     * Update an Error with the specified config, error code, and response.
     *
     * @param {Error} error The error to update.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The error.
     */
    var enhanceError = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }

      error.request = request;
      error.response = response;
      error.isAxiosError = true;

      error.toJSON = function() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code
        };
      };
      return error;
    };

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The created error.
     */
    var createError = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     */
    var settle = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError(
          'Request failed with status code ' + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    };

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */
    var isAbsoluteURL = function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     * @returns {string} The combined URL
     */
    var combineURLs = function combineURLs(baseURL, relativeURL) {
      return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
    };

    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     * @returns {string} The combined full path
     */
    var buildFullPath = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };

    // Headers whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers
    var ignoreDuplicateOf = [
      'age', 'authorization', 'content-length', 'content-type', 'etag',
      'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
      'last-modified', 'location', 'max-forwards', 'proxy-authorization',
      'referer', 'retry-after', 'user-agent'
    ];

    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} headers Headers needing to be parsed
     * @returns {Object} Headers parsed into an object
     */
    var parseHeaders = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;

      if (!headers) { return parsed; }

      utils.forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));

        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === 'set-cookie') {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        }
      });

      return parsed;
    };

    var isURLSameOrigin = (
      utils.isStandardBrowserEnv() ?

      // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
        (function standardBrowserEnv() {
          var msie = /(msie|trident)/i.test(navigator.userAgent);
          var urlParsingNode = document.createElement('a');
          var originURL;

          /**
        * Parse a URL to discover it's components
        *
        * @param {String} url The URL to be parsed
        * @returns {Object}
        */
          function resolveURL(url) {
            var href = url;

            if (msie) {
            // IE needs attribute set twice to normalize properties
              urlParsingNode.setAttribute('href', href);
              href = urlParsingNode.href;
            }

            urlParsingNode.setAttribute('href', href);

            // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
            return {
              href: urlParsingNode.href,
              protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
              host: urlParsingNode.host,
              search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
              hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
              hostname: urlParsingNode.hostname,
              port: urlParsingNode.port,
              pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                urlParsingNode.pathname :
                '/' + urlParsingNode.pathname
            };
          }

          originURL = resolveURL(window.location.href);

          /**
        * Determine if a URL shares the same origin as the current location
        *
        * @param {String} requestURL The URL to test
        * @returns {boolean} True if URL shares the same origin, otherwise false
        */
          return function isURLSameOrigin(requestURL) {
            var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
            return (parsed.protocol === originURL.protocol &&
                parsed.host === originURL.host);
          };
        })() :

      // Non standard browser envs (web workers, react-native) lack needed support.
        (function nonStandardBrowserEnv() {
          return function isURLSameOrigin() {
            return true;
          };
        })()
    );

    var cookies = (
      utils.isStandardBrowserEnv() ?

      // Standard browser envs support document.cookie
        (function standardBrowserEnv() {
          return {
            write: function write(name, value, expires, path, domain, secure) {
              var cookie = [];
              cookie.push(name + '=' + encodeURIComponent(value));

              if (utils.isNumber(expires)) {
                cookie.push('expires=' + new Date(expires).toGMTString());
              }

              if (utils.isString(path)) {
                cookie.push('path=' + path);
              }

              if (utils.isString(domain)) {
                cookie.push('domain=' + domain);
              }

              if (secure === true) {
                cookie.push('secure');
              }

              document.cookie = cookie.join('; ');
            },

            read: function read(name) {
              var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
              return (match ? decodeURIComponent(match[3]) : null);
            },

            remove: function remove(name) {
              this.write(name, '', Date.now() - 86400000);
            }
          };
        })() :

      // Non standard browser env (web workers, react-native) lack needed support.
        (function nonStandardBrowserEnv() {
          return {
            write: function write() {},
            read: function read() { return null; },
            remove: function remove() {}
          };
        })()
    );

    var xhr = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;

        if (utils.isFormData(requestData)) {
          delete requestHeaders['Content-Type']; // Let the browser set it
        }

        var request = new XMLHttpRequest();

        // HTTP basic authentication
        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password || '';
          requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }

        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

        // Set the request timeout in MS
        request.timeout = config.timeout;

        // Listen for ready state
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          }

          // Prepare the response
          var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config,
            request: request
          };

          settle(resolve, reject, response);

          // Clean up request
          request = null;
        };

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(createError('Request aborted', config, 'ECONNABORTED', request));

          // Clean up request
          request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(createError('Network Error', config, null, request));

          // Clean up request
          request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
            request));

          // Clean up request
          request = null;
        };

        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils.isStandardBrowserEnv()) {
          var cookies$1 = cookies;

          // Add xsrf header
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
            cookies$1.read(config.xsrfCookieName) :
            undefined;

          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }

        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
              // Remove Content-Type if data is undefined
              delete requestHeaders[key];
            } else {
              // Otherwise add header to the request
              request.setRequestHeader(key, val);
            }
          });
        }

        // Add withCredentials to request if needed
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }

        // Add responseType to request if needed
        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
            // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
            if (config.responseType !== 'json') {
              throw e;
            }
          }
        }

        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', config.onDownloadProgress);
        }

        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', config.onUploadProgress);
        }

        if (config.cancelToken) {
          // Handle cancellation
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }

            request.abort();
            reject(cancel);
            // Clean up request
            request = null;
          });
        }

        if (requestData === undefined) {
          requestData = null;
        }

        // Send the request
        request.send(requestData);
      });
    };

    var DEFAULT_CONTENT_TYPE = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
      }
    }

    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== 'undefined') {
        // For browsers use XHR adapter
        adapter = xhr;
      } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        // For node use HTTP adapter
        adapter = xhr;
      }
      return adapter;
    }

    var defaults = {
      adapter: getDefaultAdapter(),

      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, 'Accept');
        normalizeHeaderName(headers, 'Content-Type');
        if (utils.isFormData(data) ||
          utils.isArrayBuffer(data) ||
          utils.isBuffer(data) ||
          utils.isStream(data) ||
          utils.isFile(data) ||
          utils.isBlob(data)
        ) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
          return data.toString();
        }
        if (utils.isObject(data)) {
          setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
          return JSON.stringify(data);
        }
        return data;
      }],

      transformResponse: [function transformResponse(data) {
        /*eslint no-param-reassign:0*/
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (e) { /* Ignore */ }
        }
        return data;
      }],

      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,

      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',

      maxContentLength: -1,

      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };

    defaults.headers = {
      common: {
        'Accept': 'application/json, text/plain, */*'
      }
    };

    utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });

    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });

    var defaults_1 = defaults;

    /**
     * Throws a `Cancel` if cancellation has been requested.
     */
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }

    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     * @returns {Promise} The Promise to be fulfilled
     */
    var dispatchRequest = function dispatchRequest(config) {
      throwIfCancellationRequested(config);

      // Ensure headers exist
      config.headers = config.headers || {};

      // Transform request data
      config.data = transformData(
        config.data,
        config.headers,
        config.transformRequest
      );

      // Flatten headers
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );

      utils.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );

      var adapter = config.adapter || defaults_1.adapter;

      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // Transform response data
        response.data = transformData(
          response.data,
          response.headers,
          config.transformResponse
        );

        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);

          // Transform response data
          if (reason && reason.response) {
            reason.response.data = transformData(
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }

        return Promise.reject(reason);
      });
    };

    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     * @returns {Object} New object resulting from merging config2 to config1
     */
    var mergeConfig = function mergeConfig(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      var config = {};

      var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
      var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
      var defaultToConfig2Keys = [
        'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
        'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
        'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
        'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
        'httpsAgent', 'cancelToken', 'socketPath'
      ];

      utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (typeof config2[prop] !== 'undefined') {
          config[prop] = config2[prop];
        }
      });

      utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
        if (utils.isObject(config2[prop])) {
          config[prop] = utils.deepMerge(config1[prop], config2[prop]);
        } else if (typeof config2[prop] !== 'undefined') {
          config[prop] = config2[prop];
        } else if (utils.isObject(config1[prop])) {
          config[prop] = utils.deepMerge(config1[prop]);
        } else if (typeof config1[prop] !== 'undefined') {
          config[prop] = config1[prop];
        }
      });

      utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (typeof config2[prop] !== 'undefined') {
          config[prop] = config2[prop];
        } else if (typeof config1[prop] !== 'undefined') {
          config[prop] = config1[prop];
        }
      });

      var axiosKeys = valueFromConfig2Keys
        .concat(mergeDeepPropertiesKeys)
        .concat(defaultToConfig2Keys);

      var otherKeys = Object
        .keys(config2)
        .filter(function filterAxiosKeys(key) {
          return axiosKeys.indexOf(key) === -1;
        });

      utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
        if (typeof config2[prop] !== 'undefined') {
          config[prop] = config2[prop];
        } else if (typeof config1[prop] !== 'undefined') {
          config[prop] = config1[prop];
        }
      });

      return config;
    };

    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     */
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager_1(),
        response: new InterceptorManager_1()
      };
    }

    /**
     * Dispatch a request
     *
     * @param {Object} config The config specific for this request (merged with this.defaults)
     */
    Axios.prototype.request = function request(config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof config === 'string') {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }

      config = mergeConfig(this.defaults, config);

      // Set config.method
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = 'get';
      }

      // Hook up interceptors middleware
      var chain = [dispatchRequest, undefined];
      var promise = Promise.resolve(config);

      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    };

    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
    };

    // Provide aliases for supported request methods
    utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function(url, config) {
        return this.request(utils.merge(config || {}, {
          method: method,
          url: url
        }));
      };
    });

    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function(url, data, config) {
        return this.request(utils.merge(config || {}, {
          method: method,
          url: url,
          data: data
        }));
      };
    });

    var Axios_1 = Axios;

    /**
     * A `Cancel` is an object that is thrown when an operation is canceled.
     *
     * @class
     * @param {string=} message The message.
     */
    function Cancel(message) {
      this.message = message;
    }

    Cancel.prototype.toString = function toString() {
      return 'Cancel' + (this.message ? ': ' + this.message : '');
    };

    Cancel.prototype.__CANCEL__ = true;

    var Cancel_1 = Cancel;

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @class
     * @param {Function} executor The executor function.
     */
    function CancelToken(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }

      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });

      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }

        token.reason = new Cancel_1(message);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `Cancel` if cancellation has been requested.
     */
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };

    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token: token,
        cancel: cancel
      };
    };

    var CancelToken_1 = CancelToken;

    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     * @returns {Function}
     */
    var spread = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     * @return {Axios} A new instance of Axios
     */
    function createInstance(defaultConfig) {
      var context = new Axios_1(defaultConfig);
      var instance = bind(Axios_1.prototype.request, context);

      // Copy axios.prototype to instance
      utils.extend(instance, Axios_1.prototype, context);

      // Copy context to instance
      utils.extend(instance, context);

      return instance;
    }

    // Create the default instance to be exported
    var axios = createInstance(defaults_1);

    // Expose Axios class to allow class inheritance
    axios.Axios = Axios_1;

    // Factory for creating new instances
    axios.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios.defaults, instanceConfig));
    };

    // Expose Cancel & CancelToken
    axios.Cancel = Cancel_1;
    axios.CancelToken = CancelToken_1;
    axios.isCancel = isCancel;

    // Expose all/spread
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = spread;

    var axios_1 = axios;

    // Allow use of default import syntax in TypeScript
    var default_1 = axios;
    axios_1.default = default_1;

    var axios$1 = axios_1;

    var has = Object.prototype.hasOwnProperty;
    var isArray$1 = Array.isArray;

    var hexTable = (function () {
        var array = [];
        for (var i = 0; i < 256; ++i) {
            array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
        }

        return array;
    }());

    var compactQueue = function compactQueue(queue) {
        while (queue.length > 1) {
            var item = queue.pop();
            var obj = item.obj[item.prop];

            if (isArray$1(obj)) {
                var compacted = [];

                for (var j = 0; j < obj.length; ++j) {
                    if (typeof obj[j] !== 'undefined') {
                        compacted.push(obj[j]);
                    }
                }

                item.obj[item.prop] = compacted;
            }
        }
    };

    var arrayToObject = function arrayToObject(source, options) {
        var obj = options && options.plainObjects ? Object.create(null) : {};
        for (var i = 0; i < source.length; ++i) {
            if (typeof source[i] !== 'undefined') {
                obj[i] = source[i];
            }
        }

        return obj;
    };

    var merge$1 = function merge(target, source, options) {
        /* eslint no-param-reassign: 0 */
        if (!source) {
            return target;
        }

        if (typeof source !== 'object') {
            if (isArray$1(target)) {
                target.push(source);
            } else if (target && typeof target === 'object') {
                if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                    target[source] = true;
                }
            } else {
                return [target, source];
            }

            return target;
        }

        if (!target || typeof target !== 'object') {
            return [target].concat(source);
        }

        var mergeTarget = target;
        if (isArray$1(target) && !isArray$1(source)) {
            mergeTarget = arrayToObject(target, options);
        }

        if (isArray$1(target) && isArray$1(source)) {
            source.forEach(function (item, i) {
                if (has.call(target, i)) {
                    var targetItem = target[i];
                    if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                        target[i] = merge(targetItem, item, options);
                    } else {
                        target.push(item);
                    }
                } else {
                    target[i] = item;
                }
            });
            return target;
        }

        return Object.keys(source).reduce(function (acc, key) {
            var value = source[key];

            if (has.call(acc, key)) {
                acc[key] = merge(acc[key], value, options);
            } else {
                acc[key] = value;
            }
            return acc;
        }, mergeTarget);
    };

    var assign = function assignSingleSource(target, source) {
        return Object.keys(source).reduce(function (acc, key) {
            acc[key] = source[key];
            return acc;
        }, target);
    };

    var decode = function (str, decoder, charset) {
        var strWithoutPlus = str.replace(/\+/g, ' ');
        if (charset === 'iso-8859-1') {
            // unescape never throws, no try...catch needed:
            return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }
        // utf-8
        try {
            return decodeURIComponent(strWithoutPlus);
        } catch (e) {
            return strWithoutPlus;
        }
    };

    var encode$1 = function encode(str, defaultEncoder, charset) {
        // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
        // It has been adapted here for stricter adherence to RFC 3986
        if (str.length === 0) {
            return str;
        }

        var string = str;
        if (typeof str === 'symbol') {
            string = Symbol.prototype.toString.call(str);
        } else if (typeof str !== 'string') {
            string = String(str);
        }

        if (charset === 'iso-8859-1') {
            return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
                return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
            });
        }

        var out = '';
        for (var i = 0; i < string.length; ++i) {
            var c = string.charCodeAt(i);

            if (
                c === 0x2D // -
                || c === 0x2E // .
                || c === 0x5F // _
                || c === 0x7E // ~
                || (c >= 0x30 && c <= 0x39) // 0-9
                || (c >= 0x41 && c <= 0x5A) // a-z
                || (c >= 0x61 && c <= 0x7A) // A-Z
            ) {
                out += string.charAt(i);
                continue;
            }

            if (c < 0x80) {
                out = out + hexTable[c];
                continue;
            }

            if (c < 0x800) {
                out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
                continue;
            }

            if (c < 0xD800 || c >= 0xE000) {
                out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
                continue;
            }

            i += 1;
            c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
            out += hexTable[0xF0 | (c >> 18)]
                + hexTable[0x80 | ((c >> 12) & 0x3F)]
                + hexTable[0x80 | ((c >> 6) & 0x3F)]
                + hexTable[0x80 | (c & 0x3F)];
        }

        return out;
    };

    var compact = function compact(value) {
        var queue = [{ obj: { o: value }, prop: 'o' }];
        var refs = [];

        for (var i = 0; i < queue.length; ++i) {
            var item = queue[i];
            var obj = item.obj[item.prop];

            var keys = Object.keys(obj);
            for (var j = 0; j < keys.length; ++j) {
                var key = keys[j];
                var val = obj[key];
                if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                    queue.push({ obj: obj, prop: key });
                    refs.push(val);
                }
            }
        }

        compactQueue(queue);

        return value;
    };

    var isRegExp = function isRegExp(obj) {
        return Object.prototype.toString.call(obj) === '[object RegExp]';
    };

    var isBuffer$1 = function isBuffer(obj) {
        if (!obj || typeof obj !== 'object') {
            return false;
        }

        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };

    var combine = function combine(a, b) {
        return [].concat(a, b);
    };

    var utils$1 = {
        arrayToObject: arrayToObject,
        assign: assign,
        combine: combine,
        compact: compact,
        decode: decode,
        encode: encode$1,
        isBuffer: isBuffer$1,
        isRegExp: isRegExp,
        merge: merge$1
    };

    var replace$1 = String.prototype.replace;
    var percentTwenties = /%20/g;



    var Format = {
        RFC1738: 'RFC1738',
        RFC3986: 'RFC3986'
    };

    var formats = utils$1.assign(
        {
            'default': Format.RFC3986,
            formatters: {
                RFC1738: function (value) {
                    return replace$1.call(value, percentTwenties, '+');
                },
                RFC3986: function (value) {
                    return String(value);
                }
            }
        },
        Format
    );

    var has$1 = Object.prototype.hasOwnProperty;

    var arrayPrefixGenerators = {
        brackets: function brackets(prefix) {
            return prefix + '[]';
        },
        comma: 'comma',
        indices: function indices(prefix, key) {
            return prefix + '[' + key + ']';
        },
        repeat: function repeat(prefix) {
            return prefix;
        }
    };

    var isArray$2 = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function (arr, valueOrArray) {
        push.apply(arr, isArray$2(valueOrArray) ? valueOrArray : [valueOrArray]);
    };

    var toISO = Date.prototype.toISOString;

    var defaultFormat = formats['default'];
    var defaults$1 = {
        addQueryPrefix: false,
        allowDots: false,
        charset: 'utf-8',
        charsetSentinel: false,
        delimiter: '&',
        encode: true,
        encoder: utils$1.encode,
        encodeValuesOnly: false,
        format: defaultFormat,
        formatter: formats.formatters[defaultFormat],
        // deprecated
        indices: false,
        serializeDate: function serializeDate(date) {
            return toISO.call(date);
        },
        skipNulls: false,
        strictNullHandling: false
    };

    var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
        return typeof v === 'string'
            || typeof v === 'number'
            || typeof v === 'boolean'
            || typeof v === 'symbol'
            || typeof v === 'bigint';
    };

    var stringify = function stringify(
        object,
        prefix,
        generateArrayPrefix,
        strictNullHandling,
        skipNulls,
        encoder,
        filter,
        sort,
        allowDots,
        serializeDate,
        formatter,
        encodeValuesOnly,
        charset
    ) {
        var obj = object;
        if (typeof filter === 'function') {
            obj = filter(prefix, obj);
        } else if (obj instanceof Date) {
            obj = serializeDate(obj);
        } else if (generateArrayPrefix === 'comma' && isArray$2(obj)) {
            obj = obj.join(',');
        }

        if (obj === null) {
            if (strictNullHandling) {
                return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, 'key') : prefix;
            }

            obj = '';
        }

        if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
            if (encoder) {
                var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, 'key');
                return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults$1.encoder, charset, 'value'))];
            }
            return [formatter(prefix) + '=' + formatter(String(obj))];
        }

        var values = [];

        if (typeof obj === 'undefined') {
            return values;
        }

        var objKeys;
        if (isArray$2(filter)) {
            objKeys = filter;
        } else {
            var keys = Object.keys(obj);
            objKeys = sort ? keys.sort(sort) : keys;
        }

        for (var i = 0; i < objKeys.length; ++i) {
            var key = objKeys[i];

            if (skipNulls && obj[key] === null) {
                continue;
            }

            if (isArray$2(obj)) {
                pushToArray(values, stringify(
                    obj[key],
                    typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                    generateArrayPrefix,
                    strictNullHandling,
                    skipNulls,
                    encoder,
                    filter,
                    sort,
                    allowDots,
                    serializeDate,
                    formatter,
                    encodeValuesOnly,
                    charset
                ));
            } else {
                pushToArray(values, stringify(
                    obj[key],
                    prefix + (allowDots ? '.' + key : '[' + key + ']'),
                    generateArrayPrefix,
                    strictNullHandling,
                    skipNulls,
                    encoder,
                    filter,
                    sort,
                    allowDots,
                    serializeDate,
                    formatter,
                    encodeValuesOnly,
                    charset
                ));
            }
        }

        return values;
    };

    var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
        if (!opts) {
            return defaults$1;
        }

        if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
            throw new TypeError('Encoder has to be a function.');
        }

        var charset = opts.charset || defaults$1.charset;
        if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
            throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
        }

        var format = formats['default'];
        if (typeof opts.format !== 'undefined') {
            if (!has$1.call(formats.formatters, opts.format)) {
                throw new TypeError('Unknown format option provided.');
            }
            format = opts.format;
        }
        var formatter = formats.formatters[format];

        var filter = defaults$1.filter;
        if (typeof opts.filter === 'function' || isArray$2(opts.filter)) {
            filter = opts.filter;
        }

        return {
            addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
            allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
            charset: charset,
            charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
            delimiter: typeof opts.delimiter === 'undefined' ? defaults$1.delimiter : opts.delimiter,
            encode: typeof opts.encode === 'boolean' ? opts.encode : defaults$1.encode,
            encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults$1.encoder,
            encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
            filter: filter,
            formatter: formatter,
            serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults$1.serializeDate,
            skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults$1.skipNulls,
            sort: typeof opts.sort === 'function' ? opts.sort : null,
            strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
        };
    };

    var stringify_1 = function (object, opts) {
        var obj = object;
        var options = normalizeStringifyOptions(opts);

        var objKeys;
        var filter;

        if (typeof options.filter === 'function') {
            filter = options.filter;
            obj = filter('', obj);
        } else if (isArray$2(options.filter)) {
            filter = options.filter;
            objKeys = filter;
        }

        var keys = [];

        if (typeof obj !== 'object' || obj === null) {
            return '';
        }

        var arrayFormat;
        if (opts && opts.arrayFormat in arrayPrefixGenerators) {
            arrayFormat = opts.arrayFormat;
        } else if (opts && 'indices' in opts) {
            arrayFormat = opts.indices ? 'indices' : 'repeat';
        } else {
            arrayFormat = 'indices';
        }

        var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

        if (!objKeys) {
            objKeys = Object.keys(obj);
        }

        if (options.sort) {
            objKeys.sort(options.sort);
        }

        for (var i = 0; i < objKeys.length; ++i) {
            var key = objKeys[i];

            if (options.skipNulls && obj[key] === null) {
                continue;
            }
            pushToArray(keys, stringify(
                obj[key],
                key,
                generateArrayPrefix,
                options.strictNullHandling,
                options.skipNulls,
                options.encode ? options.encoder : null,
                options.filter,
                options.sort,
                options.allowDots,
                options.serializeDate,
                options.formatter,
                options.encodeValuesOnly,
                options.charset
            ));
        }

        var joined = keys.join(options.delimiter);
        var prefix = options.addQueryPrefix === true ? '?' : '';

        if (options.charsetSentinel) {
            if (options.charset === 'iso-8859-1') {
                // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
                prefix += 'utf8=%26%2310003%3B&';
            } else {
                // encodeURIComponent('✓')
                prefix += 'utf8=%E2%9C%93&';
            }
        }

        return joined.length > 0 ? prefix + joined : '';
    };

    var has$2 = Object.prototype.hasOwnProperty;
    var isArray$3 = Array.isArray;

    var defaults$2 = {
        allowDots: false,
        allowPrototypes: false,
        arrayLimit: 20,
        charset: 'utf-8',
        charsetSentinel: false,
        comma: false,
        decoder: utils$1.decode,
        delimiter: '&',
        depth: 5,
        ignoreQueryPrefix: false,
        interpretNumericEntities: false,
        parameterLimit: 1000,
        parseArrays: true,
        plainObjects: false,
        strictNullHandling: false
    };

    var interpretNumericEntities = function (str) {
        return str.replace(/&#(\d+);/g, function ($0, numberStr) {
            return String.fromCharCode(parseInt(numberStr, 10));
        });
    };

    // This is what browsers will submit when the ✓ character occurs in an
    // application/x-www-form-urlencoded body and the encoding of the page containing
    // the form is iso-8859-1, or when the submitted form has an accept-charset
    // attribute of iso-8859-1. Presumably also with other charsets that do not contain
    // the ✓ character, such as us-ascii.
    var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

    // These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
    var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

    var parseValues = function parseQueryStringValues(str, options) {
        var obj = {};
        var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
        var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
        var parts = cleanStr.split(options.delimiter, limit);
        var skipIndex = -1; // Keep track of where the utf8 sentinel was found
        var i;

        var charset = options.charset;
        if (options.charsetSentinel) {
            for (i = 0; i < parts.length; ++i) {
                if (parts[i].indexOf('utf8=') === 0) {
                    if (parts[i] === charsetSentinel) {
                        charset = 'utf-8';
                    } else if (parts[i] === isoSentinel) {
                        charset = 'iso-8859-1';
                    }
                    skipIndex = i;
                    i = parts.length; // The eslint settings do not allow break;
                }
            }
        }

        for (i = 0; i < parts.length; ++i) {
            if (i === skipIndex) {
                continue;
            }
            var part = parts[i];

            var bracketEqualsPos = part.indexOf(']=');
            var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

            var key, val;
            if (pos === -1) {
                key = options.decoder(part, defaults$2.decoder, charset, 'key');
                val = options.strictNullHandling ? null : '';
            } else {
                key = options.decoder(part.slice(0, pos), defaults$2.decoder, charset, 'key');
                val = options.decoder(part.slice(pos + 1), defaults$2.decoder, charset, 'value');
            }

            if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
                val = interpretNumericEntities(val);
            }

            if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
                val = val.split(',');
            }

            if (part.indexOf('[]=') > -1) {
                val = isArray$3(val) ? [val] : val;
            }

            if (has$2.call(obj, key)) {
                obj[key] = utils$1.combine(obj[key], val);
            } else {
                obj[key] = val;
            }
        }

        return obj;
    };

    var parseObject = function (chain, val, options) {
        var leaf = val;

        for (var i = chain.length - 1; i >= 0; --i) {
            var obj;
            var root = chain[i];

            if (root === '[]' && options.parseArrays) {
                obj = [].concat(leaf);
            } else {
                obj = options.plainObjects ? Object.create(null) : {};
                var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
                var index = parseInt(cleanRoot, 10);
                if (!options.parseArrays && cleanRoot === '') {
                    obj = { 0: leaf };
                } else if (
                    !isNaN(index)
                    && root !== cleanRoot
                    && String(index) === cleanRoot
                    && index >= 0
                    && (options.parseArrays && index <= options.arrayLimit)
                ) {
                    obj = [];
                    obj[index] = leaf;
                } else {
                    obj[cleanRoot] = leaf;
                }
            }

            leaf = obj;
        }

        return leaf;
    };

    var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
        if (!givenKey) {
            return;
        }

        // Transform dot notation to bracket notation
        var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

        // The regex chunks

        var brackets = /(\[[^[\]]*])/;
        var child = /(\[[^[\]]*])/g;

        // Get the parent

        var segment = options.depth > 0 && brackets.exec(key);
        var parent = segment ? key.slice(0, segment.index) : key;

        // Stash the parent if it exists

        var keys = [];
        if (parent) {
            // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
            if (!options.plainObjects && has$2.call(Object.prototype, parent)) {
                if (!options.allowPrototypes) {
                    return;
                }
            }

            keys.push(parent);
        }

        // Loop through children appending to the array until we hit depth

        var i = 0;
        while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
            i += 1;
            if (!options.plainObjects && has$2.call(Object.prototype, segment[1].slice(1, -1))) {
                if (!options.allowPrototypes) {
                    return;
                }
            }
            keys.push(segment[1]);
        }

        // If there's a remainder, just add whatever is left

        if (segment) {
            keys.push('[' + key.slice(segment.index) + ']');
        }

        return parseObject(keys, val, options);
    };

    var normalizeParseOptions = function normalizeParseOptions(opts) {
        if (!opts) {
            return defaults$2;
        }

        if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
            throw new TypeError('Decoder has to be a function.');
        }

        if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
            throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
        }
        var charset = typeof opts.charset === 'undefined' ? defaults$2.charset : opts.charset;

        return {
            allowDots: typeof opts.allowDots === 'undefined' ? defaults$2.allowDots : !!opts.allowDots,
            allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$2.allowPrototypes,
            arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$2.arrayLimit,
            charset: charset,
            charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$2.charsetSentinel,
            comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$2.comma,
            decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$2.decoder,
            delimiter: typeof opts.delimiter === 'string' || utils$1.isRegExp(opts.delimiter) ? opts.delimiter : defaults$2.delimiter,
            // eslint-disable-next-line no-implicit-coercion, no-extra-parens
            depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults$2.depth,
            ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
            interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$2.interpretNumericEntities,
            parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$2.parameterLimit,
            parseArrays: opts.parseArrays !== false,
            plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$2.plainObjects,
            strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$2.strictNullHandling
        };
    };

    var parse = function (str, opts) {
        var options = normalizeParseOptions(opts);

        if (str === '' || str === null || typeof str === 'undefined') {
            return options.plainObjects ? Object.create(null) : {};
        }

        var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
        var obj = options.plainObjects ? Object.create(null) : {};

        // Iterate over the keys and setup the new object

        var keys = Object.keys(tempObj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            var newObj = parseKeys(key, tempObj[key], options);
            obj = utils$1.merge(obj, newObj, options);
        }

        return utils$1.compact(obj);
    };

    var lib = {
        formats: formats,
        parse: parse,
        stringify: stringify_1
    };

    var FetchStrategy = /** @class */ (function (_super) {
        __extends(FetchStrategy, _super);
        function FetchStrategy() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FetchStrategy.prototype.consume = function (params) {
            return axios$1.post(params.api, lib.stringify(params), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };
        return FetchStrategy;
    }(AbstarctStrategy));

    var ImageStrategy = /** @class */ (function (_super) {
        __extends(ImageStrategy, _super);
        function ImageStrategy() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImageStrategy.prototype.consume = function (params) {
            var img = new Image(1, 1);
            return new Promise(function (resolve, reject) {
                img.onerror = function (err) {
                    reject(err);
                };
                img.onload = function (resp) {
                    resolve(resp);
                };
                img.onabort = function (resp) {
                    reject(resp);
                };
                var paramsArr = [];
                for (var key in params) {
                    paramsArr.push(key + "=" + params[key]);
                }
                img.src = params.api + "?" + paramsArr.join("&");
            });
        };
        return ImageStrategy;
    }(AbstarctStrategy));

    var AbstractCollector = /** @class */ (function () {
        function AbstractCollector() {
        }
        AbstractCollector.prototype.collect = function (params) {
            params = __assign(__assign(__assign({}, getBasicInfo()), getConnection()), params);
            Receptacle.getInstance().push(params);
        };
        return AbstractCollector;
    }());

    var ErrorCollector = /** @class */ (function (_super) {
        __extends(ErrorCollector, _super);
        function ErrorCollector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ErrorCollector.prototype.listener = function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            if (evt.target instanceof HTMLImageElement ||
                evt.target instanceof HTMLScriptElement ||
                evt.target instanceof HTMLLinkElement) {
                var src = evt.target instanceof HTMLImageElement ||
                    evt.target instanceof HTMLScriptElement ? evt.target.src :
                    evt.target instanceof HTMLLinkElement ? evt.target.href : "";
                this.collect({
                    msg: evt.target.outerHTML,
                    file: src,
                    stack: evt.target.localName.toUpperCase(),
                    line: 0,
                    col: 0,
                    ms: "error",
                    ml: "error"
                });
            }
            else {
                var stack = "";
                if (!!evt.error && !!evt.error.stack) {
                    // 如果浏览器有堆栈信息 直接使用
                    stack = evt.error.stack.toString();
                }
                else if (arguments) {
                    // 尝试通过callee拿堆栈信息
                    var ext = [];
                    // eslint-disable-next-line no-caller
                    var f = arguments.callee.caller;
                    var c = 3;
                    // 这里只拿三层堆栈信息
                    while (f && --c > 0) {
                        ext.push(f.toString());
                        if (f === f.caller) {
                            break; // 如果有环
                        }
                        f = f.caller;
                    }
                    stack = ext.join(",");
                }
                this.collect({
                    file: evt.filename,
                    line: evt.lineno,
                    col: evt.colno,
                    stack: stack,
                    msg: evt.message,
                    ms: "error",
                    ml: "error"
                });
            }
        };
        ErrorCollector.prototype.start = function () {
            on("error", this.listener.bind(this));
        };
        ErrorCollector.prototype.stop = function () {
            off("error", this.listener.bind(this));
        };
        return ErrorCollector;
    }(AbstractCollector));

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var MetadataStorage_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * Storage all library metadata.
     */
    var MetadataStorage = /** @class */ (function () {
        function MetadataStorage() {
            // -------------------------------------------------------------------------
            // Properties
            // -------------------------------------------------------------------------
            this._typeMetadatas = new Map();
            this._transformMetadatas = new Map();
            this._exposeMetadatas = new Map();
            this._excludeMetadatas = new Map();
            this._ancestorsMap = new Map();
        }
        // -------------------------------------------------------------------------
        // Adder Methods
        // -------------------------------------------------------------------------
        MetadataStorage.prototype.addTypeMetadata = function (metadata) {
            if (!this._typeMetadatas.has(metadata.target)) {
                this._typeMetadatas.set(metadata.target, new Map());
            }
            this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
        };
        MetadataStorage.prototype.addTransformMetadata = function (metadata) {
            if (!this._transformMetadatas.has(metadata.target)) {
                this._transformMetadatas.set(metadata.target, new Map());
            }
            if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
                this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
            }
            this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
        };
        MetadataStorage.prototype.addExposeMetadata = function (metadata) {
            if (!this._exposeMetadatas.has(metadata.target)) {
                this._exposeMetadatas.set(metadata.target, new Map());
            }
            this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
        };
        MetadataStorage.prototype.addExcludeMetadata = function (metadata) {
            if (!this._excludeMetadatas.has(metadata.target)) {
                this._excludeMetadatas.set(metadata.target, new Map());
            }
            this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
        };
        // -------------------------------------------------------------------------
        // Public Methods
        // -------------------------------------------------------------------------
        MetadataStorage.prototype.findTransformMetadatas = function (target, propertyName, transformationType) {
            return this.findMetadatas(this._transformMetadatas, target, propertyName)
                .filter(function (metadata) {
                if (!metadata.options)
                    return true;
                if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                    return true;
                if (metadata.options.toClassOnly === true) {
                    return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
                }
                if (metadata.options.toPlainOnly === true) {
                    return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
                }
                return true;
            });
        };
        MetadataStorage.prototype.findExcludeMetadata = function (target, propertyName) {
            return this.findMetadata(this._excludeMetadatas, target, propertyName);
        };
        MetadataStorage.prototype.findExposeMetadata = function (target, propertyName) {
            return this.findMetadata(this._exposeMetadatas, target, propertyName);
        };
        MetadataStorage.prototype.findExposeMetadataByCustomName = function (target, name) {
            return this.getExposedMetadatas(target).find(function (metadata) {
                return metadata.options && metadata.options.name === name;
            });
        };
        MetadataStorage.prototype.findTypeMetadata = function (target, propertyName) {
            return this.findMetadata(this._typeMetadatas, target, propertyName);
        };
        MetadataStorage.prototype.getStrategy = function (target) {
            var excludeMap = this._excludeMetadatas.get(target);
            var exclude = excludeMap && excludeMap.get(undefined);
            var exposeMap = this._exposeMetadatas.get(target);
            var expose = exposeMap && exposeMap.get(undefined);
            if ((exclude && expose) || (!exclude && !expose))
                return "none";
            return exclude ? "excludeAll" : "exposeAll";
        };
        MetadataStorage.prototype.getExposedMetadatas = function (target) {
            return this.getMetadata(this._exposeMetadatas, target);
        };
        MetadataStorage.prototype.getExcludedMetadatas = function (target) {
            return this.getMetadata(this._excludeMetadatas, target);
        };
        MetadataStorage.prototype.getExposedProperties = function (target, transformationType) {
            return this.getExposedMetadatas(target)
                .filter(function (metadata) {
                if (!metadata.options)
                    return true;
                if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                    return true;
                if (metadata.options.toClassOnly === true) {
                    return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
                }
                if (metadata.options.toPlainOnly === true) {
                    return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
                }
                return true;
            })
                .map(function (metadata) { return metadata.propertyName; });
        };
        MetadataStorage.prototype.getExcludedProperties = function (target, transformationType) {
            return this.getExcludedMetadatas(target)
                .filter(function (metadata) {
                if (!metadata.options)
                    return true;
                if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                    return true;
                if (metadata.options.toClassOnly === true) {
                    return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
                }
                if (metadata.options.toPlainOnly === true) {
                    return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
                }
                return true;
            })
                .map(function (metadata) { return metadata.propertyName; });
        };
        MetadataStorage.prototype.clear = function () {
            this._typeMetadatas.clear();
            this._exposeMetadatas.clear();
            this._excludeMetadatas.clear();
            this._ancestorsMap.clear();
        };
        // -------------------------------------------------------------------------
        // Private Methods
        // -------------------------------------------------------------------------
        MetadataStorage.prototype.getMetadata = function (metadatas, target) {
            var metadataFromTargetMap = metadatas.get(target);
            var metadataFromTarget;
            if (metadataFromTargetMap) {
                metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(function (meta) { return meta.propertyName !== undefined; });
            }
            var metadataFromAncestors = [];
            for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
                var ancestor = _a[_i];
                var ancestorMetadataMap = metadatas.get(ancestor);
                if (ancestorMetadataMap) {
                    var metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(function (meta) { return meta.propertyName !== undefined; });
                    metadataFromAncestors.push.apply(metadataFromAncestors, metadataFromAncestor);
                }
            }
            return metadataFromAncestors.concat(metadataFromTarget || []);
        };
        MetadataStorage.prototype.findMetadata = function (metadatas, target, propertyName) {
            var metadataFromTargetMap = metadatas.get(target);
            if (metadataFromTargetMap) {
                var metadataFromTarget = metadataFromTargetMap.get(propertyName);
                if (metadataFromTarget) {
                    return metadataFromTarget;
                }
            }
            for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
                var ancestor = _a[_i];
                var ancestorMetadataMap = metadatas.get(ancestor);
                if (ancestorMetadataMap) {
                    var ancestorResult = ancestorMetadataMap.get(propertyName);
                    if (ancestorResult) {
                        return ancestorResult;
                    }
                }
            }
            return undefined;
        };
        MetadataStorage.prototype.findMetadatas = function (metadatas, target, propertyName) {
            var metadataFromTargetMap = metadatas.get(target);
            var metadataFromTarget;
            if (metadataFromTargetMap) {
                metadataFromTarget = metadataFromTargetMap.get(propertyName);
            }
            var metadataFromAncestorsTarget = [];
            for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
                var ancestor = _a[_i];
                var ancestorMetadataMap = metadatas.get(ancestor);
                if (ancestorMetadataMap) {
                    if (ancestorMetadataMap.has(propertyName)) {
                        metadataFromAncestorsTarget.push.apply(metadataFromAncestorsTarget, ancestorMetadataMap.get(propertyName));
                    }
                }
            }
            return (metadataFromAncestorsTarget).reverse().concat((metadataFromTarget || []).reverse());
        };
        MetadataStorage.prototype.getAncestors = function (target) {
            if (!target)
                return [];
            if (!this._ancestorsMap.has(target)) {
                var ancestors = [];
                for (var baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== "undefined"; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
                    ancestors.push(baseClass);
                }
                this._ancestorsMap.set(target, ancestors);
            }
            return this._ancestorsMap.get(target);
        };
        return MetadataStorage;
    }());
    exports.MetadataStorage = MetadataStorage;


    });

    unwrapExports(MetadataStorage_1);
    var MetadataStorage_2 = MetadataStorage_1.MetadataStorage;

    var storage = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * Default metadata storage is used as singleton and can be used to storage all metadatas.
     */
    exports.defaultMetadataStorage = new MetadataStorage_1.MetadataStorage();


    });

    unwrapExports(storage);
    var storage_1 = storage.defaultMetadataStorage;

    var TransformOperationExecutor_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    var TransformationType;
    (function (TransformationType) {
        TransformationType[TransformationType["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
        TransformationType[TransformationType["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
        TransformationType[TransformationType["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
    })(TransformationType = exports.TransformationType || (exports.TransformationType = {}));
    var TransformOperationExecutor = /** @class */ (function () {
        // -------------------------------------------------------------------------
        // Constructor
        // -------------------------------------------------------------------------
        function TransformOperationExecutor(transformationType, options) {
            this.transformationType = transformationType;
            this.options = options;
            // -------------------------------------------------------------------------
            // Private Properties
            // -------------------------------------------------------------------------
            this.recursionStack = new Set();
        }
        // -------------------------------------------------------------------------
        // Public Methods
        // -------------------------------------------------------------------------
        TransformOperationExecutor.prototype.transform = function (source, value, targetType, arrayType, isMap, level) {
            var _this = this;
            if (level === void 0) { level = 0; }
            if (Array.isArray(value) || value instanceof Set) {
                var newValue_1 = arrayType && this.transformationType === TransformationType.PLAIN_TO_CLASS ? instantiateArrayType(arrayType) : [];
                value.forEach(function (subValue, index) {
                    var subSource = source ? source[index] : undefined;
                    if (!_this.options.enableCircularCheck || !_this.isCircular(subValue)) {
                        var realTargetType = void 0;
                        if (typeof targetType !== "function" && targetType && targetType.options && targetType.options.discriminator && targetType.options.discriminator.property && targetType.options.discriminator.subTypes) {
                            if (_this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                                realTargetType = targetType.options.discriminator.subTypes.find(function (subType) { return subType.name === subValue[targetType.options.discriminator.property]; });
                                var options = { newObject: newValue_1, object: subValue, property: undefined };
                                var newType = targetType.typeFunction(options);
                                realTargetType === undefined ? realTargetType = newType : realTargetType = realTargetType.value;
                                if (!targetType.options.keepDiscriminatorProperty)
                                    delete subValue[targetType.options.discriminator.property];
                            }
                            if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                                realTargetType = subValue.constructor;
                            }
                            if (_this.transformationType === TransformationType.CLASS_TO_PLAIN) {
                                subValue[targetType.options.discriminator.property] = targetType.options.discriminator.subTypes.find(function (subType) { return subType.value === subValue.constructor; }).name;
                            }
                        }
                        else {
                            realTargetType = targetType;
                        }
                        var value_1 = _this.transform(subSource, subValue, realTargetType, undefined, subValue instanceof Map, level + 1);
                        if (newValue_1 instanceof Set) {
                            newValue_1.add(value_1);
                        }
                        else {
                            newValue_1.push(value_1);
                        }
                    }
                    else if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                        if (newValue_1 instanceof Set) {
                            newValue_1.add(subValue);
                        }
                        else {
                            newValue_1.push(subValue);
                        }
                    }
                });
                return newValue_1;
            }
            else if (targetType === String && !isMap) {
                if (value === null || value === undefined)
                    return value;
                return String(value);
            }
            else if (targetType === Number && !isMap) {
                if (value === null || value === undefined)
                    return value;
                return Number(value);
            }
            else if (targetType === Boolean && !isMap) {
                if (value === null || value === undefined)
                    return value;
                return Boolean(value);
            }
            else if ((targetType === Date || value instanceof Date) && !isMap) {
                if (value instanceof Date) {
                    return new Date(value.valueOf());
                }
                if (value === null || value === undefined)
                    return value;
                return new Date(value);
            }
            else if (testForBuffer() && (targetType === Buffer || value instanceof Buffer) && !isMap) {
                if (value === null || value === undefined)
                    return value;
                return Buffer.from(value);
            }
            else if (typeof value === "object" && value !== null) {
                // try to guess the type
                if (!targetType && value.constructor !== Object /* && TransformationType === TransformationType.CLASS_TO_PLAIN*/)
                    targetType = value.constructor;
                if (!targetType && source)
                    targetType = source.constructor;
                if (this.options.enableCircularCheck) {
                    // add transformed type to prevent circular references
                    this.recursionStack.add(value);
                }
                var keys = this.getKeys(targetType, value);
                var newValue = source ? source : {};
                if (!source && (this.transformationType === TransformationType.PLAIN_TO_CLASS || this.transformationType === TransformationType.CLASS_TO_CLASS)) {
                    if (isMap) {
                        newValue = new Map();
                    }
                    else if (targetType) {
                        newValue = new targetType();
                    }
                    else {
                        newValue = {};
                    }
                }
                var _loop_1 = function (key) {
                    var valueKey = key, newValueKey = key, propertyName = key;
                    if (!this_1.options.ignoreDecorators && targetType) {
                        if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                            var exposeMetadata = storage.defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key);
                            if (exposeMetadata) {
                                propertyName = exposeMetadata.propertyName;
                                newValueKey = exposeMetadata.propertyName;
                            }
                        }
                        else if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN || this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                            var exposeMetadata = storage.defaultMetadataStorage.findExposeMetadata(targetType, key);
                            if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                                newValueKey = exposeMetadata.options.name;
                            }
                        }
                    }
                    // get a subvalue
                    var subValue = undefined;
                    if (value instanceof Map) {
                        subValue = value.get(valueKey);
                    }
                    else if (value[valueKey] instanceof Function) {
                        subValue = value[valueKey]();
                    }
                    else {
                        subValue = value[valueKey];
                    }
                    // determine a type
                    var type = undefined, isSubValueMap = subValue instanceof Map;
                    if (targetType && isMap) {
                        type = targetType;
                    }
                    else if (targetType) {
                        var metadata_1 = storage.defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
                        if (metadata_1) {
                            var options = { newObject: newValue, object: value, property: propertyName };
                            var newType = metadata_1.typeFunction ? metadata_1.typeFunction(options) : metadata_1.reflectedType;
                            if (metadata_1.options && metadata_1.options.discriminator && metadata_1.options.discriminator.property && metadata_1.options.discriminator.subTypes) {
                                if (!(value[valueKey] instanceof Array)) {
                                    if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                                        type = metadata_1.options.discriminator.subTypes.find(function (subType) {
                                            if (subValue && metadata_1.options.discriminator.property in subValue) {
                                                return subType.name === subValue[metadata_1.options.discriminator.property];
                                            }
                                        });
                                        type === undefined ? type = newType : type = type.value;
                                        if (!metadata_1.options.keepDiscriminatorProperty) {
                                            if (subValue && metadata_1.options.discriminator.property in subValue) {
                                                delete subValue[metadata_1.options.discriminator.property];
                                            }
                                        }
                                    }
                                    if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                                        type = subValue.constructor;
                                    }
                                    if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                                        subValue[metadata_1.options.discriminator.property] = metadata_1.options.discriminator.subTypes.find(function (subType) { return subType.value === subValue.constructor; }).name;
                                    }
                                }
                                else {
                                    type = metadata_1;
                                }
                            }
                            else {
                                type = newType;
                            }
                            isSubValueMap = isSubValueMap || metadata_1.reflectedType === Map;
                        }
                        else if (this_1.options.targetMaps) { // try to find a type in target maps
                            this_1.options.targetMaps
                                .filter(function (map) { return map.target === targetType && !!map.properties[propertyName]; })
                                .forEach(function (map) { return type = map.properties[propertyName]; });
                        }
                        else if (this_1.options.enableImplicitConversion && this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                            // if we have no registererd type via the @Type() decorator then we check if we have any
                            // type declarations in reflect-metadata (type declaration is emited only if some decorator is added to the property.)
                            var reflectedType = Reflect.getMetadata("design:type", targetType.prototype, propertyName);
                            if (reflectedType) {
                                type = reflectedType;
                            }
                        }
                    }
                    // if value is an array try to get its custom array type
                    var arrayType_1 = Array.isArray(value[valueKey]) ? this_1.getReflectedType(targetType, propertyName) : undefined;
                    // const subValueKey = TransformationType === TransformationType.PLAIN_TO_CLASS && newKeyName ? newKeyName : key;
                    var subSource = source ? source[valueKey] : undefined;
                    // if its deserialization then type if required
                    // if we uncomment this types like string[] will not work
                    // if (this.transformationType === TransformationType.PLAIN_TO_CLASS && !type && subValue instanceof Object && !(subValue instanceof Date))
                    //     throw new Error(`Cannot determine type for ${(targetType as any).name }.${propertyName}, did you forget to specify a @Type?`);
                    // if newValue is a source object that has method that match newKeyName then skip it
                    if (newValue.constructor.prototype) {
                        var descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
                        if ((this_1.transformationType === TransformationType.PLAIN_TO_CLASS || this_1.transformationType === TransformationType.CLASS_TO_CLASS)
                            && ((descriptor && !descriptor.set) || newValue[newValueKey] instanceof Function)) //  || TransformationType === TransformationType.CLASS_TO_CLASS
                            return "continue";
                    }
                    if (!this_1.options.enableCircularCheck || !this_1.isCircular(subValue)) {
                        var transformKey = this_1.transformationType === TransformationType.PLAIN_TO_CLASS ? newValueKey : key;
                        var finalValue = void 0;
                        if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                            // Get original value
                            finalValue = value[transformKey];
                            // Apply custom transformation
                            finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
                            // If nothing change, it means no custom transformation was applied, so use the subValue.
                            finalValue = (value[transformKey] === finalValue) ? subValue : finalValue;
                            // Apply the default transformation
                            finalValue = this_1.transform(subSource, finalValue, type, arrayType_1, isSubValueMap, level + 1);
                        }
                        else {
                            finalValue = this_1.transform(subSource, subValue, type, arrayType_1, isSubValueMap, level + 1);
                            finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
                        }
                        if (newValue instanceof Map) {
                            newValue.set(newValueKey, finalValue);
                        }
                        else {
                            newValue[newValueKey] = finalValue;
                        }
                    }
                    else if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                        var finalValue = subValue;
                        finalValue = this_1.applyCustomTransformations(finalValue, targetType, key, value, this_1.transformationType);
                        if (newValue instanceof Map) {
                            newValue.set(newValueKey, finalValue);
                        }
                        else {
                            newValue[newValueKey] = finalValue;
                        }
                    }
                };
                var this_1 = this;
                // traverse over keys
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    _loop_1(key);
                }
                if (this.options.enableCircularCheck) {
                    this.recursionStack.delete(value);
                }
                return newValue;
            }
            else {
                return value;
            }
        };
        TransformOperationExecutor.prototype.applyCustomTransformations = function (value, target, key, obj, transformationType) {
            var _this = this;
            var metadatas = storage.defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
            // apply versioning options
            if (this.options.version !== undefined) {
                metadatas = metadatas.filter(function (metadata) {
                    if (!metadata.options)
                        return true;
                    return _this.checkVersion(metadata.options.since, metadata.options.until);
                });
            }
            // apply grouping options
            if (this.options.groups && this.options.groups.length) {
                metadatas = metadatas.filter(function (metadata) {
                    if (!metadata.options)
                        return true;
                    return _this.checkGroups(metadata.options.groups);
                });
            }
            else {
                metadatas = metadatas.filter(function (metadata) {
                    return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
                });
            }
            metadatas.forEach(function (metadata) {
                value = metadata.transformFn(value, obj, transformationType);
            });
            return value;
        };
        // preventing circular references
        TransformOperationExecutor.prototype.isCircular = function (object) {
            return this.recursionStack.has(object);
        };
        TransformOperationExecutor.prototype.getReflectedType = function (target, propertyName) {
            if (!target)
                return undefined;
            var meta = storage.defaultMetadataStorage.findTypeMetadata(target, propertyName);
            return meta ? meta.reflectedType : undefined;
        };
        TransformOperationExecutor.prototype.getKeys = function (target, object) {
            var _this = this;
            // determine exclusion strategy
            var strategy = storage.defaultMetadataStorage.getStrategy(target);
            if (strategy === "none")
                strategy = this.options.strategy || "exposeAll"; // exposeAll is default strategy
            // get all keys that need to expose
            var keys = [];
            if (strategy === "exposeAll") {
                if (object instanceof Map) {
                    keys = Array.from(object.keys());
                }
                else {
                    keys = Object.keys(object);
                }
            }
            if (!this.options.ignoreDecorators && target) {
                // add all exposed to list of keys
                var exposedProperties = storage.defaultMetadataStorage.getExposedProperties(target, this.transformationType);
                if (this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                    exposedProperties = exposedProperties.map(function (key) {
                        var exposeMetadata = storage.defaultMetadataStorage.findExposeMetadata(target, key);
                        if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                            return exposeMetadata.options.name;
                        }
                        return key;
                    });
                }
                if (this.options.excludeExtraneousValues) {
                    keys = exposedProperties;
                }
                else {
                    keys = keys.concat(exposedProperties);
                }
                // exclude excluded properties
                var excludedProperties_1 = storage.defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
                if (excludedProperties_1.length > 0) {
                    keys = keys.filter(function (key) {
                        return excludedProperties_1.indexOf(key) === -1;
                    });
                }
                // apply versioning options
                if (this.options.version !== undefined) {
                    keys = keys.filter(function (key) {
                        var exposeMetadata = storage.defaultMetadataStorage.findExposeMetadata(target, key);
                        if (!exposeMetadata || !exposeMetadata.options)
                            return true;
                        return _this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
                    });
                }
                // apply grouping options
                if (this.options.groups && this.options.groups.length) {
                    keys = keys.filter(function (key) {
                        var exposeMetadata = storage.defaultMetadataStorage.findExposeMetadata(target, key);
                        if (!exposeMetadata || !exposeMetadata.options)
                            return true;
                        return _this.checkGroups(exposeMetadata.options.groups);
                    });
                }
                else {
                    keys = keys.filter(function (key) {
                        var exposeMetadata = storage.defaultMetadataStorage.findExposeMetadata(target, key);
                        return !exposeMetadata || !exposeMetadata.options || !exposeMetadata.options.groups || !exposeMetadata.options.groups.length;
                    });
                }
            }
            // exclude prefixed properties
            if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
                keys = keys.filter(function (key) { return _this.options.excludePrefixes.every(function (prefix) {
                    return key.substr(0, prefix.length) !== prefix;
                }); });
            }
            // make sure we have unique keys
            keys = keys.filter(function (key, index, self) {
                return self.indexOf(key) === index;
            });
            return keys;
        };
        TransformOperationExecutor.prototype.checkVersion = function (since, until) {
            var decision = true;
            if (decision && since)
                decision = this.options.version >= since;
            if (decision && until)
                decision = this.options.version < until;
            return decision;
        };
        TransformOperationExecutor.prototype.checkGroups = function (groups) {
            if (!groups)
                return true;
            return this.options.groups.some(function (optionGroup) { return groups.indexOf(optionGroup) !== -1; });
        };
        return TransformOperationExecutor;
    }());
    exports.TransformOperationExecutor = TransformOperationExecutor;
    function instantiateArrayType(arrayType) {
        var array = new arrayType();
        if (!(array instanceof Set) && !("push" in array)) {
            return [];
        }
        return array;
    }
    function testForBuffer() {
        try {
            Buffer;
            return true;
        }
        catch (_a) { }
        return false;
    }
    exports.testForBuffer = testForBuffer;


    });

    unwrapExports(TransformOperationExecutor_1);
    var TransformOperationExecutor_2 = TransformOperationExecutor_1.TransformationType;
    var TransformOperationExecutor_3 = TransformOperationExecutor_1.TransformOperationExecutor;
    var TransformOperationExecutor_4 = TransformOperationExecutor_1.testForBuffer;

    var ClassTransformer_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    var ClassTransformer = /** @class */ (function () {
        function ClassTransformer() {
        }
        ClassTransformer.prototype.classToPlain = function (object, options) {
            var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN, options || {});
            return executor.transform(undefined, object, undefined, undefined, undefined, undefined);
        };
        ClassTransformer.prototype.classToPlainFromExist = function (object, plainObject, options) {
            var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN, options || {});
            return executor.transform(plainObject, object, undefined, undefined, undefined, undefined);
        };
        ClassTransformer.prototype.plainToClass = function (cls, plain, options) {
            var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS, options || {});
            return executor.transform(undefined, plain, cls, undefined, undefined, undefined);
        };
        ClassTransformer.prototype.plainToClassFromExist = function (clsObject, plain, options) {
            var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS, options || {});
            return executor.transform(clsObject, plain, undefined, undefined, undefined, undefined);
        };
        ClassTransformer.prototype.classToClass = function (object, options) {
            var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS, options || {});
            return executor.transform(undefined, object, undefined, undefined, undefined, undefined);
        };
        ClassTransformer.prototype.classToClassFromExist = function (object, fromObject, options) {
            var executor = new TransformOperationExecutor_1.TransformOperationExecutor(TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS, options || {});
            return executor.transform(fromObject, object, undefined, undefined, undefined, undefined);
        };
        ClassTransformer.prototype.serialize = function (object, options) {
            return JSON.stringify(this.classToPlain(object, options));
        };
        /**
         * Deserializes given JSON string to a object of the given class.
         */
        ClassTransformer.prototype.deserialize = function (cls, json, options) {
            var jsonObject = JSON.parse(json);
            return this.plainToClass(cls, jsonObject, options);
        };
        /**
         * Deserializes given JSON string to an array of objects of the given class.
         */
        ClassTransformer.prototype.deserializeArray = function (cls, json, options) {
            var jsonObject = JSON.parse(json);
            return this.plainToClass(cls, jsonObject, options);
        };
        return ClassTransformer;
    }());
    exports.ClassTransformer = ClassTransformer;


    });

    unwrapExports(ClassTransformer_1);
    var ClassTransformer_2 = ClassTransformer_1.ClassTransformer;

    var TypeMetadata_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var TypeMetadata = /** @class */ (function () {
        function TypeMetadata(target, propertyName, reflectedType, typeFunction, options) {
            this.target = target;
            this.propertyName = propertyName;
            this.reflectedType = reflectedType;
            this.typeFunction = typeFunction;
            this.options = options;
        }
        return TypeMetadata;
    }());
    exports.TypeMetadata = TypeMetadata;


    });

    unwrapExports(TypeMetadata_1);
    var TypeMetadata_2 = TypeMetadata_1.TypeMetadata;

    var ExposeMetadata_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExposeMetadata = /** @class */ (function () {
        function ExposeMetadata(target, propertyName, options) {
            this.target = target;
            this.propertyName = propertyName;
            this.options = options;
        }
        return ExposeMetadata;
    }());
    exports.ExposeMetadata = ExposeMetadata;


    });

    unwrapExports(ExposeMetadata_1);
    var ExposeMetadata_2 = ExposeMetadata_1.ExposeMetadata;

    var ExcludeMetadata_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExcludeMetadata = /** @class */ (function () {
        function ExcludeMetadata(target, propertyName, options) {
            this.target = target;
            this.propertyName = propertyName;
            this.options = options;
        }
        return ExcludeMetadata;
    }());
    exports.ExcludeMetadata = ExcludeMetadata;


    });

    unwrapExports(ExcludeMetadata_1);
    var ExcludeMetadata_2 = ExcludeMetadata_1.ExcludeMetadata;

    var TransformMetadata_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var TransformMetadata = /** @class */ (function () {
        function TransformMetadata(target, propertyName, transformFn, options) {
            this.target = target;
            this.propertyName = propertyName;
            this.transformFn = transformFn;
            this.options = options;
        }
        return TransformMetadata;
    }());
    exports.TransformMetadata = TransformMetadata;


    });

    unwrapExports(TransformMetadata_1);
    var TransformMetadata_2 = TransformMetadata_1.TransformMetadata;

    var decorators = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });






    /**
     * Defines a custom logic for value transformation.
     */
    function Transform(transformFn, options) {
        return function (target, key) {
            var metadata = new TransformMetadata_1.TransformMetadata(target.constructor, key, transformFn, options);
            storage.defaultMetadataStorage.addTransformMetadata(metadata);
        };
    }
    exports.Transform = Transform;
    /**
     * Specifies a type of the property.
     * The given TypeFunction can return a constructor. A discriminator can be given in the options.
     */
    function Type(typeFunction, options) {
        return function (target, key) {
            var type = Reflect.getMetadata("design:type", target, key);
            var metadata = new TypeMetadata_1.TypeMetadata(target.constructor, key, type, typeFunction, options);
            storage.defaultMetadataStorage.addTypeMetadata(metadata);
        };
    }
    exports.Type = Type;
    /**
     * Marks property as included in the process of transformation. By default it includes the property for both
     * constructorToPlain and plainToConstructor transformations, however you can specify on which of transformation types
     * you want to skip this property.
     */
    function Expose(options) {
        return function (object, propertyName) {
            var metadata = new ExposeMetadata_1.ExposeMetadata(object instanceof Function ? object : object.constructor, propertyName, options || {});
            storage.defaultMetadataStorage.addExposeMetadata(metadata);
        };
    }
    exports.Expose = Expose;
    /**
     * Marks property as excluded from the process of transformation. By default it excludes the property for both
     * constructorToPlain and plainToConstructor transformations, however you can specify on which of transformation types
     * you want to skip this property.
     */
    function Exclude(options) {
        return function (object, propertyName) {
            var metadata = new ExcludeMetadata_1.ExcludeMetadata(object instanceof Function ? object : object.constructor, propertyName, options || {});
            storage.defaultMetadataStorage.addExcludeMetadata(metadata);
        };
    }
    exports.Exclude = Exclude;
    /**
     * Transform the object from class to plain object and return only with the exposed properties.
     */
    function TransformClassToPlain(params) {
        return function (target, propertyKey, descriptor) {
            var classTransformer = new ClassTransformer_1.ClassTransformer();
            var originalMethod = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = originalMethod.apply(this, args);
                var isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
                return isPromise ? result.then(function (data) { return classTransformer.classToPlain(data, params); }) : classTransformer.classToPlain(result, params);
            };
        };
    }
    exports.TransformClassToPlain = TransformClassToPlain;
    /**
     * Return the class instance only with the exposed properties.
     */
    function TransformClassToClass(params) {
        return function (target, propertyKey, descriptor) {
            var classTransformer = new ClassTransformer_1.ClassTransformer();
            var originalMethod = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = originalMethod.apply(this, args);
                var isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
                return isPromise ? result.then(function (data) { return classTransformer.classToClass(data, params); }) : classTransformer.classToClass(result, params);
            };
        };
    }
    exports.TransformClassToClass = TransformClassToClass;
    /**
     * Return the class instance only with the exposed properties.
     */
    function TransformPlainToClass(classType, params) {
        return function (target, propertyKey, descriptor) {
            var classTransformer = new ClassTransformer_1.ClassTransformer();
            var originalMethod = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = originalMethod.apply(this, args);
                var isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
                return isPromise ? result.then(function (data) { return classTransformer.plainToClass(classType, data, params); }) : classTransformer.plainToClass(classType, result, params);
            };
        };
    }
    exports.TransformPlainToClass = TransformPlainToClass;


    });

    unwrapExports(decorators);
    var decorators_1 = decorators.Transform;
    var decorators_2 = decorators.Type;
    var decorators_3 = decorators.Expose;
    var decorators_4 = decorators.Exclude;
    var decorators_5 = decorators.TransformClassToPlain;
    var decorators_6 = decorators.TransformClassToClass;
    var decorators_7 = decorators.TransformPlainToClass;

    var classTransformer_1 = createCommonjsModule(function (module, exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });

    var ClassTransformer_2 = ClassTransformer_1;
    exports.ClassTransformer = ClassTransformer_2.ClassTransformer;
    __export(decorators);
    var classTransformer = new ClassTransformer_1.ClassTransformer();
    function classToPlain(object, options) {
        return classTransformer.classToPlain(object, options);
    }
    exports.classToPlain = classToPlain;
    function classToPlainFromExist(object, plainObject, options) {
        return classTransformer.classToPlainFromExist(object, plainObject, options);
    }
    exports.classToPlainFromExist = classToPlainFromExist;
    function plainToClass(cls, plain, options) {
        return classTransformer.plainToClass(cls, plain, options);
    }
    exports.plainToClass = plainToClass;
    function plainToClassFromExist(clsObject, plain, options) {
        return classTransformer.plainToClassFromExist(clsObject, plain, options);
    }
    exports.plainToClassFromExist = plainToClassFromExist;
    function classToClass(object, options) {
        return classTransformer.classToClass(object, options);
    }
    exports.classToClass = classToClass;
    function classToClassFromExist(object, fromObject, options) {
        return classTransformer.classToClassFromExist(object, fromObject, options);
    }
    exports.classToClassFromExist = classToClassFromExist;
    function serialize(object, options) {
        return classTransformer.serialize(object, options);
    }
    exports.serialize = serialize;
    /**
     * Deserializes given JSON string to a object of the given class.
     */
    function deserialize(cls, json, options) {
        return classTransformer.deserialize(cls, json, options);
    }
    exports.deserialize = deserialize;
    /**
     * Deserializes given JSON string to an array of objects of the given class.
     */
    function deserializeArray(cls, json, options) {
        return classTransformer.deserializeArray(cls, json, options);
    }
    exports.deserializeArray = deserializeArray;
    /**
     * Enum representing the different transformation types.
     */
    var TransformationType;
    (function (TransformationType) {
        TransformationType[TransformationType["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
        TransformationType[TransformationType["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
        TransformationType[TransformationType["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
    })(TransformationType = exports.TransformationType || (exports.TransformationType = {}));


    });

    unwrapExports(classTransformer_1);
    var classTransformer_2 = classTransformer_1.ClassTransformer;
    var classTransformer_3 = classTransformer_1.classToPlain;
    var classTransformer_4 = classTransformer_1.classToPlainFromExist;
    var classTransformer_5 = classTransformer_1.plainToClass;
    var classTransformer_6 = classTransformer_1.plainToClassFromExist;
    var classTransformer_7 = classTransformer_1.classToClass;
    var classTransformer_8 = classTransformer_1.classToClassFromExist;
    var classTransformer_9 = classTransformer_1.serialize;
    var classTransformer_10 = classTransformer_1.deserialize;
    var classTransformer_11 = classTransformer_1.deserializeArray;
    var classTransformer_12 = classTransformer_1.TransformationType;

    var actionData = /** @class */ (function () {
        function actionData() {
            this.events = [];
        }
        return actionData;
    }());
    var ActionCollector = /** @class */ (function (_super) {
        __extends(ActionCollector, _super);
        function ActionCollector() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.evtsHandler = {
                "MouseEvent": function (evt) {
                    return {
                        msg: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : "",
                        ms: "action",
                        ml: "info",
                        at: evt.type,
                        el: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : undefined,
                        x: evt.x,
                        y: evt.y
                    };
                },
                "DragEvent": function (evt) {
                    return {
                        msg: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : "",
                        ms: "action",
                        ml: "info",
                        at: evt.type,
                        el: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : undefined,
                        x: evt.x,
                        y: evt.y
                    };
                },
                "TouchEvent": function (evt) {
                    var x, y;
                    for (var len = evt.changedTouches.length, i = 0; i < len; ++i) {
                        x += i + ":" + evt.changedTouches[i].clientX + ";";
                        y += i + ":" + evt.changedTouches[i].clientY + ";";
                    }
                    return {
                        msg: "" + evt.type,
                        ms: "action",
                        ml: "info",
                        at: evt.type,
                        el: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : undefined,
                        x: x,
                        y: y,
                        c: evt.changedTouches.length
                    };
                },
                "FocusEvent": function (evt) {
                    return {
                        msg: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : "",
                        ms: "action",
                        ml: "info",
                        at: evt.type,
                        el: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : undefined,
                    };
                },
                "KeyboardEvent": function (evt) {
                    return {
                        msg: evt.type + " " + evt.key,
                        ms: "action",
                        ml: "info",
                        at: evt.type,
                        key: evt.key
                    };
                },
                "InputEvent": function (evt) {
                    return {
                        msg: evt.inputType + " " + evt.data,
                        ms: "action",
                        ml: "info",
                        at: evt.type
                    };
                }
            };
            return _this;
        }
        /**
         * 遍历当前突变的节点的子节点，所有存在action-data属性的节点挂载对应事件的监听
         * @param node
         * @param serializer
         */
        ActionCollector.prototype.nodeBindActionHandler = function (node) {
            var _this = this;
            node.childNodes && node.childNodes.forEach(function (node) {
                _this.nodeBindActionHandler(node);
            });
            var attributes = node.attributes || [];
            for (var i = 0, len = attributes.length; i < len; ++i) {
                var attr = void 0;
                if (attributes instanceof NamedNodeMap) {
                    attr = attributes.item(i);
                }
                else {
                    attr = attributes[i];
                }
                if (attr && attr.name === 'action-data') {
                    var aData = classTransformer_5(actionData, JSON.parse(attr.value));
                    if (aData instanceof actionData) {
                        aData.events.forEach(function (event) {
                            node.addEventListener(event, _this.listener);
                        });
                    }
                }
            }
        };
        ActionCollector.prototype.listener = function (evt) {
            var evtName = getFnName(evt.constructor);
            this.collect(this.evtsHandler[evtName](evt));
        };
        ActionCollector.prototype.start = function () {
            var _this = this;
            this.listener = this.listener.bind(this);
            this.observer = new MutationObserver(function (mutations, observer) {
                mutations.forEach(function (mutation) {
                    _this.nodeBindActionHandler(mutation.target);
                });
            });
            this.observer.observe(window.document.body, {
                subtree: true,
                childList: true,
                attributes: true,
                attributeFilter: ["action-data"]
            });
        };
        ActionCollector.prototype.stop = function () {
            this.observer.disconnect();
            this.observer.takeRecords();
            delete this.observer;
        };
        return ActionCollector;
    }(AbstractCollector));

    var UncaughtCollector = /** @class */ (function (_super) {
        __extends(UncaughtCollector, _super);
        function UncaughtCollector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UncaughtCollector.prototype.listener = function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            this.collect({
                msg: evt.reason,
                ms: "uncaught",
                ml: "error"
            });
        };
        UncaughtCollector.prototype.start = function () {
            on("unhandledrejection", this.listener.bind(this));
        };
        UncaughtCollector.prototype.stop = function () {
            off("unhandledrejection", this.listener.bind(this));
        };
        return UncaughtCollector;
    }(AbstractCollector));

    var PvConllector = /** @class */ (function (_super) {
        __extends(PvConllector, _super);
        function PvConllector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PvConllector.prototype.hackState = function (e) {
            replace(history, e, function (data, title, url) {
                // 调用pushState或replaceState时hack Onpopstate
                replace(window, "onpopstate", function () {
                    for (var r = arguments.length, a = new Array(r), o = 0; o < r; o++)
                        a[o] = arguments[o];
                    return window._replace_center_.onpopstate.apply(this, a);
                });
                var referer = location.href;
                var f = window._replace_center_[e].apply(history, [data, title, url]);
                if (!url || url === referer)
                    return f;
                try {
                    var l = referer.split("#"), h = url.split("#"), p = parseUrl(l[0]), d = parseUrl(h[0]), g = l[1] && l[1].replace(/^\/?(.*)/, "$1"), v = h[1] && h[1].replace(/^\/?(.*)/, "$1");
                    p !== d ? dispatchCustomEvent("historystatechanged", d) : g !== v && dispatchCustomEvent("historystatechanged", v);
                }
                catch (m) {
                    console.error("[retcode] error in " + e + ": " + m);
                }
                return f;
            });
        };
        PvConllector.prototype.dehackState = function (e) {
            reduction(history, e);
            reduction(window, 'onpopstate');
        };
        PvConllector.prototype.handleHashchange = function (e) {
            var page = parseHash(location.hash.toLowerCase());
            this.collect(page);
        };
        PvConllector.prototype.collect = function (page) {
            _super.prototype.collect.call(this, {
                dot: document.title,
                dol: location.href,
                dr: document.referrer,
                dpr: window.devicePixelRatio,
                de: document.charset,
                page: page ? page : window.location.href,
                msg: "",
                ms: "pv",
                ml: "info"
            });
        };
        PvConllector.prototype.handleHistorystatechange = function (e) {
            var page = parseHash(e.detail.toLowerCase());
            this.collect(page);
        };
        PvConllector.prototype.start = function () {
            this.hackState('pushState');
            this.hackState('replaceState');
            on('hashchange', this.handleHashchange.bind(this));
            on('historystatechanged', this.handleHistorystatechange.bind(this));
            this.collect();
        };
        PvConllector.prototype.stop = function () {
            this.dehackState('pushState');
            this.dehackState('replaceState');
            off('hashchange', this.handleHashchange.bind(this));
            off('historystatechanged', this.handleHistorystatechange.bind(this));
        };
        return PvConllector;
    }(AbstractCollector));

    var PerformanceCollector = /** @class */ (function (_super) {
        __extends(PerformanceCollector, _super);
        function PerformanceCollector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PerformanceCollector.prototype.listener = function (evt) {
            var _this = this;
            setTimeout(function () {
                _this.collect(__assign(__assign({}, perforPage()), { msg: "", ms: "performance", ml: "info" }));
            }, 20);
        };
        PerformanceCollector.prototype.start = function () {
            on("load", this.listener.bind(this));
        };
        PerformanceCollector.prototype.stop = function () {
            off("load", this.listener.bind(this));
        };
        return PerformanceCollector;
    }(AbstractCollector));

    var index = {
        config: config,
        hanlders: handlers,
        MonitorLauncher: MonitorLauncher,
        Receptacle: Receptacle,
        AbstarctStrategy: AbstarctStrategy,
        AbstractCollector: AbstractCollector,
        strategys: {
            BeaconStrategy: BeaconStrategy,
            FetchStrategy: FetchStrategy,
            ImageStrategy: ImageStrategy
        },
        collectors: {
            ErrorCollector: ErrorCollector,
            UncaughtCollector: UncaughtCollector,
            ActionCollector: ActionCollector,
            PvConllector: PvConllector,
            PerformanceCollector: PerformanceCollector
        }
    };

    return index;

}));
