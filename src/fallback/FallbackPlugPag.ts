/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IPlugPag } from '../types';

export default class FallbackPlugPag implements IPlugPag {
  multiply(a: number, b: number): Promise<number> {
    return Promise.resolve(a * b); // Simulate async behavior
  }

  isAuthenticated(): boolean {
    console.warn('isAuthenticated is not available on this platform');
    return false;
  }

  hasCapability(capability: number): boolean {
    console.warn('hasCapability is not available on this platform');
    return false;
  }

  printFromFile(
    filePath: string,
    printerQuality: number = 4,
    steps: number = 120
  ): Promise<boolean> {
    console.warn('printFromFile is not available on this platform');
    return Promise.resolve(false);
  }
}
