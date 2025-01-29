import type {
  PlugPagBeepData,
  PlugPagUserDataResult,
  PlugPagPrintResult,
  PlugPagPrinterDataText,
  PlugPagPrinterDataLines,
  PlugPagPrinterDataFile,
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
  async printFromFile(
    printerData: PlugPagPrinterDataFile
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
  async printFromText(
    printerData: PlugPagPrinterDataText
  ): Promise<PlugPagPrintResult> {
    return Moderninha.printFromText(
      printerData.text,
      printerData.printerQuality,
      printerData.steps
    );
  }
  async printFromLines(
    printerData: PlugPagPrinterDataLines
  ): Promise<PlugPagPrintResult> {
    return Moderninha.printFromLines(
      printerData.lines,
      printerData.printerQuality,
      printerData.steps
    );
  }
}
