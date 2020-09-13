import { isProd } from "../helpers";
import { handlers } from "../configs";

export function debuggableClass(logInfo?: string) {
  return function<T extends {new(...args:any[]):{}}> (target: T) {
    return class extends target {
      constructor (...args: any[]) {
        !isProd() && console.info(`${logInfo}, ${target.prototype.constructor.name} construct start`);
        super(args);
        !isProd() && console.info(`${logInfo}, ${target.prototype.constructor.name} construct finished`);
      }
    }
  }
}

export function around<T extends any[], U>(debuggable: boolean = false, before: string, after: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    return {
      value: async function(...args: any[]) {
        if (handlers[before]) args = handlers[before].apply(this, [args]);
        debuggable && !isProd() && console.info(`${target.constructor.name} ${methodName} args`, args);
        let result = descriptor.value.apply(this, args);
        if (handlers[after]) result = handlers[after].apply(this, [result]);
        if (result instanceof Promise) {
          debuggable && !isProd() && console.info(`${target.constructor.name} ${methodName} result`, await result);
        } else {
          debuggable && !isProd() && console.info(`${target.constructor.name} ${methodName} result`, result);
        }
        return result;
      }
    }
  }
}
