import type {
  PlugPagBeepData,
  PlugPagUserDataResult,
  PlugPagPrintResult,
  PlugPagPrinterDataText,
  PlugPagPrinterDataLines,
  PlugPagPrinterDataFile,
  PlugPagPaymentData,
  PlugPagEventListener,
  PlugPagTransactionResult,
  PlugPagException,
  PlugPagActivationData,
  PlugPagInitializationResult,
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
  async initializeAndActivatePinpad(
    activationData: PlugPagActivationData
  ): Promise<PlugPagInitializationResult> {
    try {
      const result = await Moderninha.initializeAndActivatePinpad(
        activationData.activationCode
      );
      return {
        result: result ? 0 : -1,
        errorCode: '0',
        errorMessage: '',
      };
    } catch (err) {
      return {
        result: -1,
        errorCode: '1',
        errorMessage: String(err),
      };
    }
  }
  async getUserData(): Promise<PlugPagUserDataResult> {
    try {
      const userDataJson = await Moderninha.getUserData();
      const userData: PlugPagUserDataResult = JSON.parse(userDataJson);
      return Promise.resolve(userData);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  hasCapability(capability: number): boolean {
    return Moderninha.hasCapability(capability);
  }
  async setEventListener(listener: PlugPagEventListener) {
    Moderninha.setEventListener(listener);
  }
  async doPayment(
    paymentData: PlugPagPaymentData
  ): Promise<PlugPagTransactionResult | PlugPagException> {
    try {
      const result = await Moderninha.doPayment(paymentData);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err as PlugPagException);
    }
  }
  async printFromFile(
    printerData: PlugPagPrinterDataFile
  ): Promise<PlugPagPrintResult> {
    return Moderninha.printFromFile(
      printerData.filePath,
      printerData.printerQuality || 0,
      printerData.steps || 0
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
      printerData.printerQuality || 0,
      printerData.steps || 0
    );
  }
  async printFromLines(
    printerData: PlugPagPrinterDataLines
  ): Promise<PlugPagPrintResult> {
    return Moderninha.printFromLines(
      printerData.lines,
      printerData.printerQuality || 0,
      printerData.steps || 0
    );
  }
}
