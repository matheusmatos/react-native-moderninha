import {
  type PlugPagBeepData,
  type PlugPagUserDataResult,
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
import type {
  PlugPagPrinterDataFile,
  PlugPagPrinterDataLines,
  PlugPagPrinterDataText,
} from './types/IPlugPagTypesCustom';

export default class PlugPagBaseImpl
  extends IPlugPagPropertiesBase
  implements IPlugPag
{
  abort(): PlugPagAbortResult {
    throw new Error('Method abort() not implemented.');
  }
  abortNFC(): PlugPagNFCResult {
    throw new Error('Method abortNFC() not implemented.');
  }
  apduCommand(
    _command: Uint8Array,
    _dataLength: number
  ): PlugPagCmdExchangeResult {
    throw new Error('Method apduCommand() not implemented.');
  }
  authNFCCardDirectly(_authData: PlugPagNFCAuth, _timeout: number): number {
    throw new Error('Method authNFCCardDirectly() not implemented.');
  }
  beep(_beepData: PlugPagBeepData): Promise<number> {
    throw new Error('Method beep() not implemented.');
  }
  calculateInstallments(
    _saleValue: string,
    _installmentType: number
  ): PlugPagInstallment[] {
    throw new Error('Method calculateInstallments() not implemented.');
  }
  checkPermissionPlugPagService(): boolean {
    throw new Error('Method checkPermissionPlugPagService() not implemented.');
  }
  deactivate(
    _activationData: PlugPagActivationData
  ): PlugPagInitializationResult {
    throw new Error('Method deactivate() not implemented.');
  }
  detectNfcCardDirectly(
    _cardType: number,
    _timeout: number
  ): PlugPagNFCInfosResultDirectly {
    throw new Error('Method detectNfcCardDirectly() not implemented.');
  }
  detectNfcRemoveDirectly(_detectRemove: PlugPagNFCDetectRemoveCard): number {
    throw new Error('Method detectNfcRemoveDirectly() not implemented.');
  }
  async doEffectuatePreAuto(
    _effectuatePreAutoData: PlugPagEffectuatePreAutoData
  ): Promise<PlugPagTransactionResult> {
    throw new Error('Method doEffectuatePreAuto() not implemented.');
  }
  async doPayment(
    _paymentData: PlugPagPaymentData
  ): Promise<PlugPagTransactionResult> {
    throw new Error('Method doPayment() not implemented.');
  }
  async doPreAutoCancel(
    _transactionId: string,
    _transactionCode: string
  ): Promise<PlugPagTransactionResult> {
    throw new Error('Method doPreAutoCancel() not implemented.');
  }
  async doPreAutoCreate(
    _plugPagData: PlugPagPreAutoData | PlugPagPreAutoKeyingData
  ): Promise<PlugPagTransactionResult> {
    throw new Error('Method doPreAutoCreate() not implemented.');
  }
  doPrintAction(_action: number, _phoneNumber?: string): void {
    throw new Error('Method doPrintAction() not implemented.');
  }
  getCardData(): PlugPagCardInfoResult {
    throw new Error('Method getCardData() not implemented.');
  }
  getKeyedInPreAutoData(
    _plugPagPreAutoQueryData: PlugPagPreAutoQueryData
  ): PlugPagTransactionResult {
    throw new Error('Method getKeyedInPreAutoData() not implemented.');
  }
  getLastApprovedTransaction(): PlugPagTransactionResult {
    throw new Error('Method getLastApprovedTransaction() not implemented.');
  }
  getNFCInfos(_cardType: number): PlugPagNFCInfosResult {
    throw new Error('Method getNFCInfos() not implemented.');
  }
  getPreAutoData(
    _plugPagPreAutoQueryData?: PlugPagPreAutoQueryData
  ): PlugPagTransactionResult {
    throw new Error('Method getPreAutoData() not implemented.');
  }
  getPreAutoList(): PlugPagPreAutoQueryResult {
    throw new Error('Method getPreAutoList() not implemented.');
  }
  getSubAcquirerData(): PlugPagSubAcquirerResult | null {
    throw new Error('Method getSubAcquirerData() not implemented.');
  }
  getUserData(): PlugPagUserDataResult {
    throw new Error('Method getUserData() not implemented.');
  }
  hasCapability(_capability: number): boolean {
    throw new Error('Method hasCapability() not implemented.');
  }
  hasSoftwareCapability(_operation: number, _mode?: number): boolean {
    throw new Error('Method hasSoftwareCapability() not implemented.');
  }
  hasSubAcquirer(): boolean {
    throw new Error('Method hasSubAcquirer() not implemented.');
  }
  initializeAndActivatePinpad(
    _activationData: PlugPagActivationData
  ): PlugPagInitializationResult {
    throw new Error('Method initializeAndActivatePinpad() not implemented.');
  }
  initializeSubAcquirer(
    _data: PlugPagSubAcquirerData
  ): PlugPagInitializationResult {
    throw new Error('Method initializeSubAcquirer() not implemented.');
  }
  initPagBankActivation(): PlugPagPagBankActivationResult {
    throw new Error('Method initPagBankActivation() not implemented.');
  }
  invalidateAuthentication(): void {
    throw new Error('Method invalidateAuthentication() not implemented.');
  }
  invalidateSubAcquirer(): boolean {
    throw new Error('Method invalidateSubAcquirer() not implemented.');
  }
  isAuthenticated(): boolean {
    throw new Error('Method isAuthenticated() not implemented.');
  }
  isModerninha(): boolean {
    throw new Error('Method isModerninha() not implemented.');
  }
  isServiceBusy(): boolean {
    throw new Error('Method isServiceBusy() not implemented.');
  }
  justAuthNfcDirectly(_plugPagNFCAuthDirectly: PlugPagNFCAuthDirectly): number {
    throw new Error('Method justAuthNfcDirectly() not implemented.');
  }
  printFromFile(
    _printerData: PlugPagPrinterDataFile
  ): Promise<PlugPagPrintResult> {
    throw new Error('Method printFromFile() not implemented.');
  }
  printFromLines(
    _printerData: PlugPagPrinterDataLines
  ): Promise<PlugPagPrintResult> {
    throw new Error('Method printFromLines() not implemented.');
  }
  printFromText(
    _printerData: PlugPagPrinterDataText
  ): Promise<PlugPagPrintResult> {
    throw new Error('Method printFromText() not implemented.');
  }
  readFromNFCCard(_cardData: PlugPagNearFieldCardData): PlugPagNFCResult {
    throw new Error('Method readFromNFCCard() not implemented.');
  }
  readNFCCardDirectly(_cardData: PlugPagSimpleNFCData): PlugPagNFCResult {
    throw new Error('Method readNFCCardDirectly() not implemented.');
  }
  reboot(): void {
    throw new Error('Method reboot() not implemented.');
  }
  reprintCustomerReceipt(): PlugPagPrintResult {
    throw new Error('Method reprintCustomerReceipt() not implemented.');
  }
  reprintStablishmentReceipt(): PlugPagPrintResult {
    throw new Error('Method reprintStablishmentReceipt() not implemented.');
  }
  sendReceiptSMS(_smsData: PlugPagReceiptSMSData): boolean {
    throw new Error('Method sendReceiptSMS() not implemented.');
  }
  setEventListener(_listener: PlugPagEventListener): void {
    throw new Error('Method setEventListener() not implemented.');
  }
  setLed(_ledData: PlugPagLedData): number {
    throw new Error('Method setLed() not implemented.');
  }
  setPlugPagCustomPrinterLayout(
    _plugPagCustomPrinterLayout: PlugPagCustomPrinterLayout
  ): void {
    throw new Error('Method setPlugPagCustomPrinterLayout() not implemented.');
  }
  setPrintActionListener(
    _printListener?: PlugPagPrintActionListener
  ): PlugPagPrintActionResult {
    throw new Error('Method setPrintActionListener() not implemented.');
  }
  setPrinterListener(_listener: PlugPagPrinterListener): void {
    throw new Error('Method setPrinterListener() not implemented.');
  }
  setStyleData(_styleData: PlugPagStyleData): boolean {
    throw new Error('Method setStyleData() not implemented.');
  }
  startNFCCardDirectly(): number {
    throw new Error('Method startNFCCardDirectly() not implemented.');
  }
  startOnBoarding(): void {
    throw new Error('Method startOnBoarding() not implemented.');
  }
  stopNFCCardDirectly(): number {
    throw new Error('Method stopNFCCardDirectly() not implemented.');
  }
  updateRemoteConfig(): number {
    throw new Error('Method updateRemoteConfig() not implemented.');
  }
  voidPayment(_voidData: PlugPagVoidData): PlugPagTransactionResult {
    throw new Error('Method voidPayment() not implemented.');
  }
  writeToNFCCard(_cardData: PlugPagNearFieldCardData): PlugPagNFCResult {
    throw new Error('Method writeToNFCCard() not implemented.');
  }
  writeToNFCCardDirectly(_cardData: PlugPagSimpleNFCData): number {
    throw new Error('Method writeToNFCCardDirectly() not implemented.');
  }
}
