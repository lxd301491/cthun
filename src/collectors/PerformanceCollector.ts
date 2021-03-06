import AbstractCollector from "./AbstractCollector";
import { perforPage, on, off } from "../helpers";

export default class PerformanceCollector extends AbstractCollector {
  private listener (evt: Event) {
    setTimeout(() => {
      this.collect({
        ...perforPage(),
        msg: "",
        ms: "performance",
        ml: "info"
      });
    }, 20);
  }
  
  start(): void {
    on("load", this.listener.bind(this));
  }

  stop(): void {
    off("load", this.listener.bind(this));
  }
}
