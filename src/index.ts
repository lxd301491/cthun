import { Collectors } from './collectors/index';
import { MonitorLauncher } from "./launcher";
import { AbstractCollector } from './collectors/AbstractCollector';
import { AbstarctStrategy } from './consumer/AbstarctStrategy';
import Receptacle from './receptacle';
import * as config from './configs';

let collectors = Collectors.getInstance();

export {
  MonitorLauncher,
  Receptacle,
  AbstractCollector,
  AbstarctStrategy,
  config,
  collectors
};


