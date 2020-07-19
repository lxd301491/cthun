import { MonitorConsumer, IConsumerOptions } from "./consumer";
import { ErrorCollector } from "./collectors/ErrorCollector";
import { ActionCollector } from "./collectors/ActionCollector";
import { UncaughtCollector } from "./collectors/UncaughtCollector";
import { PvConllector } from "./collectors/PvCollector";
import { PerformanceCollector } from "./collectors/PerformanceCollector";
import { Collectors } from "./collectors";
import Receptacle from "./receptacle";
import { DoubileLinkedList } from "./doubileLinkedList";


export class Monitor {
  private consumers: DoubileLinkedList<MonitorConsumer> = new DoubileLinkedList<MonitorConsumer>();
  public readonly collectors: Collectors;
  private timer?: number;
  
  constructor (options: IMonitorOptions) {
    typeof options === 'string' ? Receptacle.getInstance(options) : Receptacle.getInstance(options.appId);
    this.collectors = new Collectors();
    options.error && this.collectors.reigster("error", ErrorCollector);
    options.uncaught && this.collectors.reigster("uncaught", UncaughtCollector);
    options.action && this.collectors.reigster("action", ActionCollector);
    options.pv && this.collectors.reigster("pv", PvConllector);
    options.performance && this.collectors.reigster("performance", PerformanceCollector);
  }

  /**
   * 启动上报
   * 
   * @param period 上报周期 
   * @param size 一次上报埋点的数量
   */
  start(period: number = 15000, size: number = 10) {
    if (this.timer) clearInterval(this.timer);
    this.timer = window.setInterval(async () => {
      if (this.consumers.size() > 0) {
        let consumer: IListNode<MonitorConsumer> = this.consumers.header();
        let data = await Receptacle.getInstance().shift(size, false);
        while (consumer.hasNext() && data.length > 0) {
          if (consumer.val.canPass()) {
            if (consumer.val.consume(typeof data === 'string' ? data : JSON.stringify(data))) {
              await Receptacle.getInstance().cleanShift();
            }
          }
          consumer = consumer.next;
        }
      }
    }, period);
  }

  /**
   * 关闭上报
   */
  stop() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  /**
   * 注册消费者
   * 
   * @param consumer 消费者实例
   */
  subscribe(options: IConsumerOptions): MonitorConsumer {
    this.consumers.add(new MonitorConsumer(options));
    return this.consumers.tail().val;
  }
}
