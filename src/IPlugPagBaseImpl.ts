import {
  type PlugPagBeepData,
  type PlugPagUserDataResult,
  type PlugPagPrinterData,
  type PlugPagPrintResult,
  type PlugPagAbortResult,
  type PlugPagActivationData,
  type PlugPagCardInfoResult,
  type PlugPagCmdExchangeResult,
  type PlugPagCustomPrinterLayout,
  type PlugPagEffectuatePreAutoData,
  type PlugPagEventListener,
  type PlugPagInitializationResult,
  type PlugPagInstallment,
  type PlugPagLedData,
  type PlugPagNearFieldCardData,
  type PlugPagNFCAuth,
  type PlugPagNFCAuthDirectly,
  type PlugPagNFCDetectRemoveCard,
  type PlugPagNFCInfosResult,
  type PlugPagNFCInfosResultDirectly,
  type PlugPagNFCResult,
  type PlugPagPagBankActivationResult,
  type PlugPagPaymentData,
  type PlugPagPreAutoData,
  type PlugPagPreAutoKeyingData,
  type PlugPagPreAutoQueryData,
  type PlugPagPreAutoQueryResult,
  type PlugPagPrintActionListener,
  type PlugPagPrintActionResult,
  type PlugPagPrinterListener,
  type PlugPagReceiptSMSData,
  type PlugPagSimpleNFCData,
  type PlugPagStyleData,
  type PlugPagSubAcquirerData,
  type PlugPagSubAcquirerResult,
  type PlugPagTransactionResult,
  type PlugPagVoidData,
} from './types/IPlugPagTypes';
import { IPlugPagPropertiesBase } from './types/IPlugPagPropertiesBase';
import type { IPlugPag } from './types/IPlugPag';
import type { PrintLine } from './types/IPlugPagTypesCustom';

export default class PlugPagBaseImpl
  extends IPlugPagPropertiesBase
  implements IPlugPag
{
  abort(): PlugPagAbortResult {
    throw new Error('Method not implemented.');
  }
  abortNFC(): PlugPagNFCResult {
    throw new Error('Method not implemented.');
  }
  apduCommand(
    _command: Uint8Array,
    _dataLength: number
  ): PlugPagCmdExchangeResult {
    throw new Error('Method not implemented.');
  }
  authNFCCardDirectly(_authData: PlugPagNFCAuth, _timeout: number): number {
    throw new Error('Method not implemented.');
  }
  beep(_beepData: PlugPagBeepData): Promise<number> {
    throw new Error('Method not implemented.');
  }
  calculateInstallments(
    _saleValue: string,
    _installmentType: number
  ): PlugPagInstallment[] {
    throw new Error('Method not implemented.');
  }
  checkPermissionPlugPagService(): boolean {
    throw new Error('Method not implemented.');
  }
  deactivate(
    _activationData: PlugPagActivationData
  ): PlugPagInitializationResult {
    throw new Error('Method not implemented.');
  }
  detectNfcCardDirectly(
    _cardType: number,
    _timeout: number
  ): PlugPagNFCInfosResultDirectly {
    throw new Error('Method not implemented.');
  }
  detectNfcRemoveDirectly(_detectRemove: PlugPagNFCDetectRemoveCard): number {
    throw new Error('Method not implemented.');
  }
  doEffectuatePreAuto(
    _effectuatePreAutoData: PlugPagEffectuatePreAutoData
  ): PlugPagTransactionResult {
    throw new Error('Method not implemented.');
  }
  doPayment(_paymentData: PlugPagPaymentData): PlugPagTransactionResult {
    throw new Error('Method not implemented.');
  }
  doPreAutoCancel(
    _transactionId: string,
    _transactionCode: string
  ): PlugPagTransactionResult {
    throw new Error('Method not implemented.');
  }
  doPreAutoCreate(
    _plugPagData: PlugPagPreAutoData | PlugPagPreAutoKeyingData
  ): PlugPagTransactionResult {
    throw new Error('Method not implemented.');
  }
  doPrintAction(_action: number, _phoneNumber?: string): void {
    throw new Error('Method not implemented.');
  }
  getCardData(): PlugPagCardInfoResult {
    throw new Error('Method not implemented.');
  }
  getKeyedInPreAutoData(
    _plugPagPreAutoQueryData: PlugPagPreAutoQueryData
  ): PlugPagTransactionResult {
    throw new Error('Method not implemented.');
  }
  getLastApprovedTransaction(): PlugPagTransactionResult {
    throw new Error('Method not implemented.');
  }
  getNFCInfos(_cardType: number): PlugPagNFCInfosResult {
    throw new Error('Method not implemented.');
  }
  getPreAutoData(
    _plugPagPreAutoQueryData?: PlugPagPreAutoQueryData
  ): PlugPagTransactionResult {
    throw new Error('Method not implemented.');
  }
  getPreAutoList(): PlugPagPreAutoQueryResult {
    throw new Error('Method not implemented.');
  }
  getSubAcquirerData(): PlugPagSubAcquirerResult | null {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
  hasSoftwareCapability(_operation: number, _mode?: number): boolean {
    throw new Error('Method not implemented.');
  }
  hasSubAcquirer(): boolean {
    throw new Error('Method not implemented.');
  }
  initializeAndActivatePinpad(
    _activationData: PlugPagActivationData
  ): PlugPagInitializationResult {
    throw new Error('Method not implemented.');
  }
  initializeSubAcquirer(
    _data: PlugPagSubAcquirerData
  ): PlugPagInitializationResult {
    throw new Error('Method not implemented.');
  }
  initPagBankActivation(): PlugPagPagBankActivationResult {
    throw new Error('Method not implemented.');
  }
  invalidateAuthentication(): void {
    throw new Error('Method not implemented.');
  }
  invalidateSubAcquirer(): boolean {
    throw new Error('Method not implemented.');
  }
  isAuthenticated(): boolean {
    throw new Error('Method not implemented.');
  }
  isServiceBusy(): boolean {
    throw new Error('Method not implemented.');
  }
  justAuthNfcDirectly(_plugPagNFCAuthDirectly: PlugPagNFCAuthDirectly): number {
    throw new Error('Method not implemented.');
  }
  printFromFile(_printerData: PlugPagPrinterData): Promise<PlugPagPrintResult> {
    throw new Error('Method not implemented.');
  }
  printFromLines(
    _printLines: PrintLine[],
    _printerQuality?: number,
    _steps?: number
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  printFromText(
    _text: string,
    _printerQuality?: number,
    _steps?: number
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  readFromNFCCard(_cardData: PlugPagNearFieldCardData): PlugPagNFCResult {
    throw new Error('Method not implemented.');
  }
  readNFCCardDirectly(_cardData: PlugPagSimpleNFCData): PlugPagNFCResult {
    throw new Error('Method not implemented.');
  }
  reboot(): void {
    throw new Error('Method not implemented.');
  }
  reprintCustomerReceipt(): PlugPagPrintResult {
    throw new Error('Method not implemented.');
  }
  reprintStablishmentReceipt(): PlugPagPrintResult {
    throw new Error('Method not implemented.');
  }
  sendReceiptSMS(_smsData: PlugPagReceiptSMSData): boolean {
    throw new Error('Method not implemented.');
  }
  setEventListener(_listener: PlugPagEventListener): void {
    throw new Error('Method not implemented.');
  }
  setLed(_ledData: PlugPagLedData): number {
    throw new Error('Method not implemented.');
  }
  setPlugPagCustomPrinterLayout(
    _plugPagCustomPrinterLayout: PlugPagCustomPrinterLayout
  ): void {
    throw new Error('Method not implemented.');
  }
  setPrintActionListener(
    _printListener?: PlugPagPrintActionListener
  ): PlugPagPrintActionResult {
    throw new Error('Method not implemented.');
  }
  setPrinterListener(_listener: PlugPagPrinterListener): void {
    throw new Error('Method not implemented.');
  }
  setStyleData(_styleData: PlugPagStyleData): boolean {
    throw new Error('Method not implemented.');
  }
  startNFCCardDirectly(): number {
    throw new Error('Method not implemented.');
  }
  startOnBoarding(): void {
    throw new Error('Method not implemented.');
  }
  stopNFCCardDirectly(): number {
    throw new Error('Method not implemented.');
  }
  updateRemoteConfig(): number {
    throw new Error('Method not implemented.');
  }
  voidPayment(_voidData: PlugPagVoidData): PlugPagTransactionResult {
    throw new Error('Method not implemented.');
  }
  writeToNFCCard(_cardData: PlugPagNearFieldCardData): PlugPagNFCResult {
    throw new Error('Method not implemented.');
  }
  writeToNFCCardDirectly(_cardData: PlugPagSimpleNFCData): number {
    throw new Error('Method not implemented.');
  }
}
