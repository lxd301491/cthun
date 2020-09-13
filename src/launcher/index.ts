import { MonitorConsumer, IConsumerOptions } from "../consumer";
import { DoubileLinkedList } from "../doubileLinkedList";
import AbstarctStrategy from "../consumer/AbstarctStrategy";
import Receptacle from "../receptacle";


export class MonitorLauncher<T extends AbstarctStrategy> {
  private consumers: DoubileLinkedList<MonitorConsumer<T>> = new DoubileLinkedList<MonitorConsumer<T>>();
  private timer?: number;
  
  constructor (options: IMonitorOptions) {
    options.store ? Receptacle.getInstance(options.appId, options.store) : Receptacle.getInstance(options.appId);
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
        let consumer: IListNode<MonitorConsumer<T>> = this.consumers.header();
        let data = await Receptacle.getInstance().shift(size, false);
        while (consumer.hasNext() && data.length > 0) {
          if (await consumer.val.consume(typeof data === 'string' ? data : JSON.stringify(data))) {
            await Receptacle.getInstance().cleanShift();
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
  subscribe(options: IConsumerOptions): MonitorConsumer<T> {
    this.consumers.add(new MonitorConsumer(options));
    return this.consumers.tail().val;
  }
}
