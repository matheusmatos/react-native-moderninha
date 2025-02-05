import {
  type PlugPagBeepData,
  type PlugPagUserDataResult,
  type PlugPagPrintResult,
  type PlugPagPrinterDataLines,
  type PlugPagPrinterDataFile,
  type PlugPagPrinterDataText,
  type PlugPagTransactionResult,
  type PlugPagPaymentData,
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
    _printerData: PlugPagPrinterDataText
  ): Promise<PlugPagPrintResult> {
    console.warn('printFromText is not available on this platform');
    const result: PlugPagPrintResult = {
      result: 1,
      errorCode: 'RUNTIME_NOT_AVAILABLE',
      message: 'Print from file is not available on this platform',
      steps: _printerData.steps ?? 0,
    };
    return Promise.resolve(result);
  }
  printFromLines(
    _printerData: PlugPagPrinterDataLines
  ): Promise<PlugPagPrintResult> {
    console.warn('printFromLines is not available on this platform');
    const result: PlugPagPrintResult = {
      result: 1,
      errorCode: 'RUNTIME_NOT_AVAILABLE',
      message: 'Print from file is not available on this platform',
      steps: _printerData.steps ?? 0,
    };
    return Promise.resolve(result);
  }
  printFromFile(
    _printerData: PlugPagPrinterDataFile
  ): Promise<PlugPagPrintResult> {
    console.warn('printFromFile() is not available on this platform');
    const result: PlugPagPrintResult = {
      result: 1,
      errorCode: 'RUNTIME_NOT_AVAILABLE',
      message: 'Print from file is not available on this platform',
      steps: _printerData.steps ?? 0,
    };
    return Promise.resolve(result);
  }
  doPayment(
    _paymentData: PlugPagPaymentData
  ): Promise<PlugPagTransactionResult> {
    console.warn('doPayment is not available on this platform');
    const result: PlugPagTransactionResult = {
      result: 1,
      errorCode: 'RUNTIME_NOT_AVAILABLE',
      userRegistered: 0,
    };
    return Promise.resolve(result);
  }
}
