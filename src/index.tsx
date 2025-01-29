import Moderninha from './Moderninha';
import type { IPlugPag } from './types/IPlugPag';
import PlugPagFallback from './PlugPagFallback';
import PlugPagNative from './PlugPagNative';

export * from './types';

const PlugPag: IPlugPag = Moderninha
  ? new PlugPagFallback()
  : new PlugPagNative();

export default PlugPag;
