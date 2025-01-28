export interface PlugPagException extends Error {
  message: string;
  cause?: Error;
  errorCode: string;
}
export enum BeepDataConstants {
  MIN_FREQUENCY = 0,
  MAX_FREQUENCY = 6,
  FREQUENCY_LEVEL_1 = 1,
  FREQUENCY_LEVEL_2 = 2,
  FREQUENCY_LEVEL_3 = 3,
  FREQUENCY_LEVEL_4 = 4,
  FREQUENCY_LEVEL_5 = 5,
  FREQUENCY_LEVEL_6 = 6,
}

export type PlugPagBeepData = {
  frequency: BeepDataConstants;
  duration: number;
};

export type PrintLine = {
    
}

export interface IPlugPag {
  /**
   * Executa um alerta sonoro.
   * @param beepData PlugPagBeepData({ frequency: BeepDataConstants, duration: number })
   */
  beep(beepData: PlugPagBeepData): Promise<number>;
  multiply(a: number, b: number): Promise<number>;
  isAuthenticated(): boolean;
  hasCapability(capability: number): boolean;

  /**
   * Executa uma solicitação de impressão através do caminho de um texto fornecido.
   * @param text Texto a ser renderizado e impresso.
   * @param printerQuality Qualidade da impressão.
   * @param steps Quantidade de linhas impressas após a impressão finalizar, tendo como valor mínimo PlugPag.MIN_PRINTER_STEPS.
   */
  printFromLines(
    printLines: string,
    printerQuality?: number,
    steps?: number
  ): Promise<boolean>;

  /**
   * Executa uma solicitação de impressão através do caminho de um texto fornecido.
   * @param text Texto a ser renderizado e impresso.
   * @param printerQuality Qualidade da impressão.
   * @param steps Quantidade de linhas impressas após a impressão finalizar, tendo como valor mínimo PlugPag.MIN_PRINTER_STEPS.
   */
  printFromText(
    text: string,
    printerQuality?: number,
    steps?: number
  ): Promise<boolean>;

  /**
   * Executa uma solicitação de impressão através do caminho de um arquivo local.
   * @param filePath Caminho do arquivo a ser impresso.
   * @param printerQuality Qualidade da impressão.
   * @param steps Quantidade de linhas impressas após a impressão finalizar, tendo como valor mínimo PlugPag.MIN_PRINTER_STEPS.
   */
  printFromFile(
    filePath: string,
    printerQuality?: number,
    steps?: number
  ): Promise<boolean>;
}
