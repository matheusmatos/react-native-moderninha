import type { IPlugPag, PlugPagBeepData } from '../types';
import Moderninha from '../Moderninha';

export default class NativePlugPag implements IPlugPag {
  beep(beepData: PlugPagBeepData): Promise<number> {
    return Moderninha.beep(beepData);
  }

  multiply(a: number, b: number): Promise<number> {
    return Moderninha.multiply(a, b);
  }

  isAuthenticated(): boolean {
    return Moderninha.isAuthenticated();
  }

  hasCapability(capability: number): boolean {
    return Moderninha.hasCapability(capability);
  }

  printFromFile(
    filePath: string,
    printerQuality: number = 4,
    steps: number = 10 * 12
  ): Promise<boolean> {
    return Moderninha.printFromFile(filePath, printerQuality, steps);
  }
}
