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

/**
 * Represents a line to be printed.
 * Each line has a tag and content that determine how it will be rendered.
 */
export type PrintLine = {
  /**
   * Tag to be printed.
   */
  tag:
    | 'BARCODE'
    | 'H1'
    | 'H2'
    | 'STRONG'
    | 'TEXT'
    | 'SMALL'
    | 'SEPARATOR'
    | 'IMG'
    | 'QRCODE'
    | 'TIME'
    | 'VERSUS';

  /**
   * Content to be printed, e.g., text, Base64 image, or QR code data
   */
  content?: string;
};

/**
 * Dados do titular da conta PlugPag.
 */
export type PlugPagUserDataResult = {
  /**
   * Endereço físico do titular da conta.
   * */
  address?: string;

  /**
   * Cidade do titular da conta.
   **/
  city?: string;

  /**
   * CPF/CNPJ do titular da conta.
   **/
  cnpjCpf?: string;

  /**
   * Complemento do endereço do titular da conta.
   **/
  addressComplement?: string;

  /**
   * Nome fantasia do titular da conta.
   **/
  companyName?: string;

  /**
   * Nome de usuário do titular da conta.
   **/
  userNickName?: string;

  /**
   * Estado do endereço do titular da conta.
   **/
  addressState?: string;

  /**
   * E-mail do titular da conta.
   **/
  email?: string;
};

export interface IPlugPag {
  /**
   * Executes a beep sound.
   * @param beepData PlugPagBeepData({ frequency: BeepDataConstants, duration: number })
   */
  beep(beepData: PlugPagBeepData): Promise<number>;

  /**
   * Multiplies two numbers (example method).
   * @param a First number.
   * @param b Second number.
   */
  multiply(a: number, b: number): Promise<number>;

  /**
   * Checks if the device is authenticated.
   */
  isAuthenticated(): boolean;

  /**
   * Checks if the device has a specific capability.
   * @param capability Capability code.
   */
  hasCapability(capability: number): boolean;

  /**
   * Prints a series of lines with different styles (tags) and content.
   * @param printLines Array of PrintLine objects specifying the lines to print.
   * @param printerQuality Quality of the printout.
   * @param steps Number of lines printed after the main content (minimum: PlugPag.MIN_PRINTER_STEPS).
   */
  printFromLines(
    printLines: PrintLine[],
    printerQuality?: number,
    steps?: number
  ): Promise<boolean>;

  /**
   * Prints text by converting it to a bitmap.
   * @param text Text to be rendered and printed.
   * @param printerQuality Quality of the printout.
   * @param steps Number of lines printed after the main content (minimum: PlugPag.MIN_PRINTER_STEPS).
   */
  printFromText(
    text: string,
    printerQuality?: number,
    steps?: number
  ): Promise<boolean>;

  /**
   * Prints a file from a specified local path.
   * @param filePath Path to the file to be printed.
   * @param printerQuality Quality of the printout.
   * @param steps Number of lines printed after the main content (minimum: PlugPag.MIN_PRINTER_STEPS).
   */
  printFromFile(
    filePath: string,
    printerQuality?: number,
    steps?: number
  ): Promise<boolean>;

  /**
   * Executa uma solicitação de consulta de dados do usuário do terminal.
   * @returns Valores resultantes da consulta de dados do usuário.
   * @throws PlugPagException Caso a definição de usuário não obtenha sucesso.
   */
  getUserData(): PlugPagUserDataResult;

  /**
   * Verifica se existe um usuário autenticado.
   * @returns `true` se um usuário estiver autenticado, `false` caso contrário.
   */
  isAuthenticated(): boolean;
}
