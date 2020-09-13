import AbstractCollector from "./AbstractCollector";
import { plainToClass } from "class-transformer";
import { getFnName, getCurrentElement } from "../helpers";

class actionData<K extends keyof GlobalEventHandlersEventMap>{
  public events: K[] = [];
}

export default class ActionCollector extends AbstractCollector {
  private observer: MutationObserver;
  private evtsHandler = {
    "MouseEvent": function (evt: MouseEvent) {
      return {
        msg: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : "",
        ms: "action",
        ml: "info",
        at: evt.type,
        el: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : undefined,
        x: evt.x,
        y: evt.y
      }
    },
    "DragEvent": function (evt: DragEvent) {
      return {
        msg: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : "",
        ms: "action",
        ml: "info",
        at: evt.type,
        el: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : undefined,
        x: evt.x,
        y: evt.y
      }
    },
    "TouchEvent": function (evt: TouchEvent) {
      let x, y;
      for (let len = evt.changedTouches.length, i = 0; i < len; ++i) {
        x += `${i}:${evt.changedTouches[i].clientX};`;
        y += `${i}:${evt.changedTouches[i].clientY};`;
      }
      return {
        msg: `${evt.type}`,
        ms: "action",
        ml: "info",
        at: evt.type,
        el: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : undefined,
        x: x,
        y: y,
        c: evt.changedTouches.length
      }
    },
    "FocusEvent": function (evt: FocusEvent) {
      return {
        msg: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : "",
        ms: "action",
        ml: "info",
        at: evt.type,
        el: evt.target instanceof HTMLElement ? getCurrentElement(evt.target) : undefined,
      }
    },
    "KeyboardEvent": function (evt: KeyboardEvent) {
      return {
        msg: `${evt.type} ${evt.key}`,
        ms: "action",
        ml: "info",
        at: evt.type,
        key: evt.key
      }
    },
    "InputEvent": function (evt: InputEvent) {
      return {
        msg: `${evt.inputType} ${evt.data}`,
        ms: "action",
        ml: "info",
        at: evt.type
      }
    }
  }

  /**
   * 遍历当前突变的节点的子节点，所有存在action-data属性的节点挂载对应事件的监听
   * @param node 
   * @param serializer 
   */
  private nodeBindActionHandler(node: Node) {
    node.childNodes && node.childNodes.forEach(node => {
      this.nodeBindActionHandler(node);
    });
    let attributes = (<Element>node).attributes || [];
    for (let i = 0, len = attributes.length; i < len; ++i) {
      let attr;
      if (attributes instanceof NamedNodeMap) {
        attr = attributes.item(i);
      } else {
        attr = attributes[i];
      }
      if (attr && attr.name === 'action-data') {
        let aData = plainToClass(actionData, JSON.parse(attr.value));
        if (aData instanceof actionData) {
          aData.events.forEach(event => {
            node.addEventListener(event, this.listener);
          })
        }
      }
    }
  }
  
  private listener<K extends keyof GlobalEventHandlersEventMap>(evt: GlobalEventHandlersEventMap[K]) {
    let evtName = getFnName(evt.constructor);
    this.collect(this.evtsHandler[evtName](evt));
  }

  start(): void {
    this.listener = this.listener.bind(this);
    this.observer = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
      mutations.forEach((mutation) => {
        this.nodeBindActionHandler(mutation.target);
      });
    });
    this.observer.observe(window.document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["action-data"]
    });
  }

  stop(): void {
    this.observer.disconnect();
    this.observer.takeRecords();
    delete this.observer;
  }
}
