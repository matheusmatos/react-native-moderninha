import {
  type PlugPagBeepData,
  type PlugPagUserDataResult,
  type PrintLine,
  type PlugPagPrinterData,
  type PlugPagPrintResult,
} from './types';
import IPlugPagBaseImpl from './IPlugPagBaseImpl';

export default class PlugPagFallback extends IPlugPagBaseImpl {
  beep(_beepData: PlugPagBeepData): Promise<number> {
    console.warn('RNModerninha: beep is not available on this platform');
    return Promise.resolve(0);
  }
  isAuthenticated(): boolean {
    return true;
  }
  isModerninha(): boolean {
    return false;
  }
  getUserData(): PlugPagUserDataResult {
    return {
      address: 'AVENIDA BRIGADEIRO FARIA LIMA 1232',
      addressComplement: '4 ANDAR',
      addressState: 'SP',
      city: 'SAOPAULO',
      cnpjCpf: '52524032000190',
      companyName: 'Company Name Charlie Brown',
      userNickName: 'Cupertino',
    };
  }
  hasCapability(_capability: number): boolean {
    console.warn('hasCapability is not available on this platform');
    return false;
  }
  printFromText(
    _text: string,
    _printerQuality?: number,
    _steps?: number
  ): Promise<boolean> {
    console.warn('printFromText is not available on this platform');
    return Promise.resolve(false);
  }
  printFromLines(
    _printLines: PrintLine[],
    _printerQuality?: number,
    _steps?: number
  ): Promise<boolean> {
    console.warn('printFromLines is not available on this platform');
    return Promise.resolve(false);
  }
  printFromFile(printerData: PlugPagPrinterData): Promise<PlugPagPrintResult> {
    console.warn('printFromFile() is not available on this platform');
    const result: PlugPagPrintResult = {
      result: 1,
      errorCode: 'RUNTIME_NOT_AVAILABLE',
      message: 'Print from file is not available on this platform',
      steps: printerData.steps,
    };
    return Promise.resolve(result);
  }
}
