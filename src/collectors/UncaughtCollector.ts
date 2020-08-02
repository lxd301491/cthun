import AbstractCollector from "./AbstractCollector";
import { on, off } from "../helpers";

export default class UncaughtCollector extends AbstractCollector {
  private listener(evt: PromiseRejectionEvent) {
    evt.stopPropagation();
    evt.preventDefault();
    this.collect({
      msg: evt.reason,
      ms: "uncaught",
      ml: "error"
    });
  }

  start(): void {
    on("unhandledrejection", this.listener.bind(this));
  }
  
  stop(): void {
    off("unhandledrejection", this.listener.bind(this));
  }
}
