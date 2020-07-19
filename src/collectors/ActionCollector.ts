import { AbstractCollector } from "./AbstractCollector";
import { plainToClass } from "class-transformer";

class actionData<K extends keyof GlobalEventHandlersEventMap>{
  public events: K[] = [];
}

interface NodeEventHandler<K extends keyof GlobalEventHandlersEventMap> {
  node: Node;
  event: K;
  handler: (evt: GlobalEventHandlersEventMap[K]) => void
}

export class ActionCollector<K extends keyof GlobalEventHandlersEventMap> extends AbstractCollector {
  private observer: MutationObserver;
  private nodes: Set<NodeEventHandler<K>> = new Set<NodeEventHandler<K>>();

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
            node.addEventListener(event, this.listener.bind(this));
            this.nodes.add({
              node,
              event,
              handler: this.listener
            });
          })
        }
      }
    }
  }

  private getCurrentElement(target: HTMLElement) {
    let r = target.outerHTML.match("<.+?>");
    return r && r[0] || "";
  }
  
  private listener<K extends keyof GlobalEventHandlersEventMap>(evt: GlobalEventHandlersEventMap[K]) {
    if (evt instanceof MouseEvent) {
      this.collect({
        msg: evt.target instanceof HTMLElement ? this.getCurrentElement(evt.target) : "",
        ms: "action",
        ml: "info",
        at: evt.type,
        el: evt.target instanceof HTMLElement ? this.getCurrentElement(evt.target) : undefined,
        x: evt.x,
        y: evt.y
      });
    } else if (evt instanceof DragEvent) {
      this.collect({
        msg: evt.target instanceof HTMLElement ? this.getCurrentElement(evt.target) : "",
        ms: "action",
        ml: "info",
        at: evt.type,
        el: evt.target instanceof HTMLElement ? this.getCurrentElement(evt.target) : undefined,
        x: evt.x,
        y: evt.y
      });
    } else if (evt instanceof TouchEvent) {
      for (let len = evt.changedTouches.length, i = 0; i < len; ++i) {
        this.collect({
          msg: `${evt.type}`,
          ms: "action",
          ml: "info",
          at: evt.type,
          el: evt.target instanceof HTMLElement ? this.getCurrentElement(evt.target) : undefined,
          x: evt.changedTouches[i].clientX,
          y: evt.changedTouches[i].clientY,
          c: len > 1 ? i : undefined 
        });
      }
    } else if (evt instanceof FocusEvent) {
      this.collect({
        msg: evt.target instanceof HTMLElement ? this.getCurrentElement(evt.target) : "",
        ms: "action",
        ml: "info",
        at: evt.type,
        el: evt.target instanceof HTMLElement ? this.getCurrentElement(evt.target) : undefined,
      });
    } else if (evt instanceof KeyboardEvent) {
      this.collect({
        msg: `${evt.type} ${evt.key}`,
        ms: "action",
        ml: "info",
        at: evt.type,
        key: evt.key
      });
    } else if (evt instanceof InputEvent) {
      this.collect({
        msg: `${evt.inputType} ${evt.data}`,
        ms: "action",
        ml: "info",
        at: evt.type
      });
    } else {
      this.collect({
        msg: `${evt}`,
        ms: "action",
        ml: "info",
        at: evt.type
      });
    }
  }

  start(): void {
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
    
    this.isRunning = true;
  }

  stop(): void {
    this.nodes.forEach(node => {
      node.node && node.node.removeEventListener(node.event, node.handler);
      node.node = null;
    });
    this.nodes.clear();
    this.observer.disconnect();
    this.observer.takeRecords();
    delete this.observer;
    
    this.isRunning = false;
  }
}
