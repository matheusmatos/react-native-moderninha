import type { IPlugPag, PlugPagBeepData } from '../types';

export default class FallbackPlugPag implements IPlugPag {
  beep(_beepData: PlugPagBeepData): Promise<number> {
    console.warn('RNModerninha: beep is not available on this platform');
    return Promise.resolve(0);
  }

  multiply(a: number, b: number): Promise<number> {
    return Promise.resolve(a * b); // Simulate async behavior
  }

  isAuthenticated(): boolean {
    console.warn('isAuthenticated is not available on this platform');
    return false;
  }

  hasCapability(_capability: number): boolean {
    console.warn('hasCapability is not available on this platform');
    return false;
  }

  printFromFile(
    _filePath: string,
    _printerQuality: number = 4,
    _steps: number = 120
  ): Promise<boolean> {
    console.warn('printFromFile is not available on this platform');
    return Promise.resolve(false);
  }
}
