import { AbstractCollector } from "./AbstractCollector";
import { on, off } from "../helpers";

export class UncaughtCollector extends AbstractCollector {
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

    this.isRunning = true;
  }
  
  stop(): void {
    off("unhandledrejection", this.listener.bind(this));

    this.isRunning = false;
  }
}
