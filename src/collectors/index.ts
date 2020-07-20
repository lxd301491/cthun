import { AbstractCollector } from "./AbstractCollector";

export class Collectors {
  private static instance?: Collectors;

  private collectors: Map<string, AbstractCollector> = new Map();

  private constructor () {
  }

  public static getInstance () : Collectors {
      if (!Collectors.instance) {
        Collectors.instance = new Collectors();
      }
      return Collectors.instance;
  }


  public reigster<T extends AbstractCollector>(key: string, collector: {new(): T}): Collectors {
    let it = this.collectors.keys();
    let r: IteratorResult<string>;
    while (r = it.next() , !r.done) {
      if (r.value === key) {
        throw TypeError(`the collector type "${key}" already exists！`);
      }
    }
    let collectorr = new collector();
    this.collectors.set(key, collectorr);
    collectorr.start();
    return this;
  }


  public unreigster(key: string): Collectors {
    let collectorr = this.collectors.get(key);
    if (collectorr) {
      collectorr.stop();
    }
    this.collectors.get(key)?.stop();
    this.collectors.delete(key);
    return this;
  }
}