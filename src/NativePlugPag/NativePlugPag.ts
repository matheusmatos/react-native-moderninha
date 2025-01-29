import type {
  IPlugPag,
  PlugPagBeepData,
  PrintLine,
  PlugPagUserDataResult,
} from '../types';
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

  getUserData(): PlugPagUserDataResult {
    return Moderninha.getUserData();
  }

  hasCapability(capability: number): boolean {
    return Moderninha.hasCapability(capability);
  }

  printFromText(
    text: string,
    printerQuality?: number,
    steps?: number
  ): Promise<boolean> {
    return Moderninha.printFromText(text, printerQuality, steps);
  }

  printFromLines(
    printLines: PrintLine[],
    printerQuality?: number,
    steps?: number
  ): Promise<boolean> {
    return Moderninha.printFromLines(printLines, printerQuality, steps);
  }

  printFromFile(
    filePath: string,
    printerQuality: number = 4,
    steps: number = 10 * 12
  ): Promise<boolean> {
    return Moderninha.printFromFile(filePath, printerQuality, steps);
  }
}
