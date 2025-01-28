import Moderninha from './Moderninha';
import type { IPlugPag } from './types/IPlugPag';
import FallbackPlugPag from './FallbackPlugPag/FallbackPlugPag';
import NativePlugPag from './NativePlugPag/NativePlugPag';

export * from './types';

const PlugPag: IPlugPag = Moderninha
  ? new NativePlugPag()
  : new FallbackPlugPag();

export default PlugPag;
