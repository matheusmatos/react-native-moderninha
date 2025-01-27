export interface IPlugPag {
  multiply(a: number, b: number): Promise<number>;
  isAuthenticated(): boolean;
  hasCapability(capability: number): boolean;
  printFromFile(
    filePath: string,
    printerQuality?: number,
    steps?: number
  ): Promise<boolean>;
}
