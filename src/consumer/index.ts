import { around } from '../decorators';
import { DoubileLinkedList } from "../doubileLinkedList";
import AbstarctStrategy from "./AbstarctStrategy";
import { handlers } from '../configs';
import { after } from 'lodash';


export interface IConsumerOptions {
  api: string;
  beforeConsume?: (data: string) => string
}

export class MonitorConsumer<T extends AbstarctStrategy> {
  private _api: string;
  private _strategys: DoubileLinkedList<T> = new DoubileLinkedList<T>();
  private _strategy: IListNode<T> = this._strategys.header();
  private beforeConsume: (data: string) => string;

  constructor(options: IConsumerOptions){
    this._api = options.api;
    this.beforeConsume = options.beforeConsume;
  }

  public registerStrategy(strategy: T): MonitorConsumer<T> {
    this._strategys.add(strategy);
    return this;
  }

  public removeStrategy(strategy: T): MonitorConsumer<T> {
    this._strategys.remove(strategy);
    return this;
  }

  @around(true, "beforeConsume", "afterConsume")
  public async consume(data: string): Promise<boolean> {
    if (this.beforeConsume) {
      data = this.beforeConsume(data);
    }
    let params: IConsumeParams = {
      api: this._api,
      data: data
    }

    this._strategy = this._strategy == this._strategys.tail() ? this._strategys.header() : this._strategy;
    if (this._strategy.val && !await this._strategy.val.consume(params)) {
      this._strategy = this._strategys.header();
      while (this._strategy.hasNext()) {
        if (this._strategy.val && this._strategy.val.canPass()) {
          if (await this._strategy.val.consume(params)) {
            return true;
          }
          this._strategy = this._strategy.next;
        }
      }
      return false;
    }
    return true;
  }
}
