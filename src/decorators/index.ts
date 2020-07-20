

export function debuggableClass(logInfo?: string) {
  return function<T extends {new(...args:any[]):{}}> (target: T) {
    return class extends target {
      constructor (...args: any[]) {
        console.info(`${logInfo}, ${target.prototype.constructor.name} construct start`);
        super(args);
        console.info(`${logInfo}, ${target.prototype.constructor.name} construct finished`);
      }
    }
  }
}


export function debuggable(logInfo?: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    return {
      value: function(...args: any[]) {
        console.info(`${logInfo}, ${target.prototype.constructor.name} ${methodName} start`);
        let result = descriptor.value.apply(this, args);
        console.info(`${logInfo}, ${target.prototype.constructor.name} ${methodName} finished`);
        return result;
      }
    }
  }
}

export function debuggableAsync(logInfo?: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    return {
      value: async function(...args: any[]) {
        console.info(`${logInfo}, ${target.prototype.constructor.name} ${methodName} start`);
        let result = descriptor.value.apply(this, args);
        if (!(result instanceof Promise)) result = Promise.resolve(result);
        result = await result;  
        console.info(`${logInfo}, ${target.prototype.constructor.name} ${methodName} finished`);
        return result;
      }
    }
  }
}

export function replace(target: any, methodName: string, replacer: Function, namespace?: string) {
  let top: any = window || global || undefined;
  if (!top) {
    throw new ReferenceError("the top object is not exist");
  } 
  if (!top._replace_center_) top._replace_center_ = {};
  let container = namespace ? top._replace_center_[namespace] ? top._replace_center_[namespace] : top._replace_center_[namespace] = {} : top._replace_center_;
  if (!container[methodName]) {
    container[methodName] = target[methodName];
    target[methodName] = replacer;
  }
}

export function reduction(target: any, methodName: string, namespace?: string) {
  let top: any = window || global || undefined;
  if (!top) {
    throw new ReferenceError("the top object is not exist");
  } 
  if (!top._replace_center_) top._replace_center_ = {};
  let container = namespace ? top._replace_center_[namespace] ? top._replace_center_[namespace] : top._replace_center_[namespace] = {} : top._replace_center_;
  if (top._replace_center_[methodName]) {
    target[methodName] = container[methodName];
    delete container[methodName];
  }
}
