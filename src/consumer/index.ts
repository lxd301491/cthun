import { CircuitBreaker } from "../circuitBreaker";
import { before, after } from "../decorators/LifeCycle";
import { infoLenMax } from "../configs";
import { AbstarctStrategy, StrategyOptions } from "./AbstarctStrategy";
import { FetchStrategy } from "./FetchStrategy";

import pako from 'pako';
import { DoubileLinkedList } from "../doubileLinkedList";
import { ImageStrategy } from "./ImageStrategy";
import { BeaconStrategy } from "./BeaconStrategy";

export interface IConsumerOptions {
  api: string;
  strategys?: AbstarctStrategy[];
  gzip?: boolean;
  strategyOptions?: StrategyOptions;
}

export class MonitorConsumer {
  private api: string;
  private _gzip: boolean;
  private _strategys: DoubileLinkedList<AbstarctStrategy> = new DoubileLinkedList<AbstarctStrategy>();

  constructor(options: IConsumerOptions){
    this.api = options.api;
    this._resetStrategys(options.strategys, options.strategyOptions);
    this._gzip = options.gzip;

  }

  private _resetStrategys (strategys: AbstarctStrategy[], options: StrategyOptions) {
    this._strategys.clear();
    this._strategys.add(new ImageStrategy(options));
    this._strategys.add(new BeaconStrategy(options));  
    this._strategys.add(new FetchStrategy(options));
    while(strategys && strategys.length > 0) {
      this._strategys.add(strategys.pop());
    }
  }

  public canPass(): boolean {
    let node = this._strategys.tail();
    while (node.hasPrev()) {
      if (node.val && node.val.canPass()) {
        return true;
      }
      node = node.prev;
    }
    return false;
  }

  @before
  @after
  public async consume(data: string): Promise<boolean> {
    if (!this.canPass()) return;
    let params: IUploadParams = {
      api: this.api,
      data: encodeURIComponent(data)
    }
    if (this._gzip && params.data.length > infoLenMax) {
      console.log(`data length before gzip ${params.data.length}`);
      params.data = pako.gzip(params.data, {to: "string"});
      console.log(`data length after gzip ${params.data.length}`);
      params.gzip = true;
    }
    let strategy = this._strategys.tail();
    while (strategy.hasPrev()) {
      if (strategy.val && strategy.val.canPass()) {
        try {
          await strategy.val.consume(params);
          return true;
        } catch (err) {
          strategy.val.count();
        }
      }
      strategy = strategy.prev;
    }
    return false;
    
  }
}
