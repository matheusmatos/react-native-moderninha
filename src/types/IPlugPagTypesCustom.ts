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

export type PlugPagPrinterDataFile = {
  filePath: string;
  printerQuality: number;
  steps: number;
};

export type PlugPagPrinterDataLines = {
  lines: PrintLine[];
  printerQuality?: number;
  steps?: number;
};

export type PlugPagPrinterDataText = {
  text: string;
  printerQuality?: number;
  steps?: number;
};
