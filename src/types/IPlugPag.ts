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
    | 'CODE'
    | 'H1'
    | 'H2'
    | 'HR'
    | 'IMG'
    | 'QRCODE'
    | 'SMALL'
    | 'STRONG'
    | 'SUBTITLE'
    | 'TIME'
    | 'TITLE'
    | 'VERSUS';

  /**
   * Content to be printed, e.g., text, Base64 image, or QR code data
   */
  content: string;
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
}
