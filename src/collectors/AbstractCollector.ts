import Receptacle from "../receptacle";
import { getBasicInfo, getConnection } from "../helpers";

export default abstract class AbstractCollector {
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
