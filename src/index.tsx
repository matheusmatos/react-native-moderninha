import native from './native';
import type { IPlugPag } from './types/IPlugPag';
import FallbackPlugPag from './fallback/FallbackPlugPag';
import NativePlugPag from './module/NativePlugPag';

export * from './types';

const PlugPag: IPlugPag = native ? new NativePlugPag() : new FallbackPlugPag();

export default PlugPag;
