import type {
  PlugPagBeepData,
  PrintLine,
  PlugPagUserDataResult,
  PlugPagPrinterData,
  PlugPagPrintResult,
} from './types';
import Moderninha from './Moderninha';
import IPlugPagBaseImpl from './IPlugPagBaseImpl';

export default class PlugPagNative extends IPlugPagBaseImpl {
  beep(beepData: PlugPagBeepData): Promise<number> {
    return Moderninha.beep(beepData);
  }
  isAuthenticated(): boolean {
    return Moderninha.isAuthenticated();
  }
  isModerninha(): boolean {
    return false;
  }
  getUserData(): PlugPagUserDataResult {
    const userDataJson = Moderninha.getUserData();
    const userData: PlugPagUserDataResult = JSON.parse(userDataJson);
    return userData;
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
  async printFromFile(
    printerData: PlugPagPrinterData
  ): Promise<PlugPagPrintResult> {
    return Moderninha.printFromFile(
      printerData.filePath,
      printerData.printerQuality,
      printerData.steps
    ).then((success: boolean) => ({
      result: success ? 0 : -1,
      errorCode: 0,
      errorMessage: '',
    }));
  }
}
