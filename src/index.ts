import { MonitorLauncher } from "./launcher";

import Receptacle from './receptacle';
import config, { handlers } from './configs';

import AbstarctStrategy from './consumer/AbstarctStrategy';
import BeaconStrategy from './consumer/BeaconStrategy';
import FetchStrategy from './consumer/FetchStrategy';
import ImageStrategy from './consumer/ImageStrategy';

import AbstractCollector from './collectors/AbstractCollector';
import ErrorCollector from "./collectors/ErrorCollector";
import ActionCollector from "./collectors/ActionCollector";
import UncaughtCollector from "./collectors/UncaughtCollector";
import PvConllector from "./collectors/PvCollector";
import PerformanceCollector from "./collectors/PerformanceCollector";

export default {
  config,
  hanlders: handlers,
  MonitorLauncher,
  Receptacle,
  AbstarctStrategy,
  AbstractCollector,
  strategys: {
    BeaconStrategy,
    FetchStrategy,
    ImageStrategy
  },
  collectors: {
    ErrorCollector, 
    UncaughtCollector,
    ActionCollector,
    PvConllector,
    PerformanceCollector
  }
};


