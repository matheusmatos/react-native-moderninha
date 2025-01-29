import type {
  IPlugPag,
  PlugPagBeepData,
  PlugPagUserDataResult,
  PrintLine,
} from '../types';

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

  getUserData(): PlugPagUserDataResult {
    return {
      address: 'Rua do Desenvolvedor, 123',
      city: 'São Paulo',
      cnpjCpf: '123.456.789-00',
      addressComplement: 'Sala 123',
      companyName: 'Empresa de Tecnologia',
      userNickName: 'dev',
      addressState: 'SP',
      email: '',
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

  printFromFile(
    _filePath: string,
    _printerQuality: number = 4,
    _steps: number = 120
  ): Promise<boolean> {
    console.warn('printFromFile is not available on this platform');
    return Promise.resolve(false);
  }
}
