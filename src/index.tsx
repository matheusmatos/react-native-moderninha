import Moderninha from './Moderninha';
import type { IPlugPag } from './types/IPlugPag';
import PlugPagNative from './PlugPagNative';
import PlugPagFallback from './PlugPagFallback';

export * from './types';

const PlugPag: IPlugPag = Moderninha
  ? new PlugPagNative()
  : new PlugPagFallback();

export default PlugPag;
