import Receptacle from "../receptacle";
import { getBasicInfo, getConnection } from "../helpers";

export abstract class AbstractCollector {
  protected isRunning: boolean = false;

  collect(params): void {
    params = {
      ...getBasicInfo(),
      ...getConnection(),
      ...params
    }
    Receptacle.getInstance().push(params);
  }
  
  abstract start(): void;

  abstract stop(): void;
}
