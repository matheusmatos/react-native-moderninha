export enum CardIssuerNationality {
  UNAVAILABLE = 'UNAVAILABLE',
  NATIONAL = 'NATIONAL',
  INTERNATIONAL = 'INTERNATIONAL',
}

export interface PlugPagAbortResult {
  result: number;
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

export interface PlugPagActivationData {
  activationCode: string;
}

export interface PlugPagCmdExchangeResult {
  cmd?: Uint8Array;
  message?: string;
  errorCode?: string;
}

export enum EM1KeyType {
  TYPE_A = 0,
  TYPE_B = 1,
}

export interface PlugPagNFCAuth {
  type: number;
  slotNumber: number;
  password: Uint8Array;
  /**
   * @default EM1KeyType.TYPE_A
   */
  em1KeyType?: EM1KeyType;
}

export interface PlugPagCardInfoResult {
  result?: string;
  message?: string;
  bin?: string;
  holder?: string;
  cardHolder?: string;
}

export interface PlugPagCustomPrinterLayout {
  title?: string;
  titleColor?: string;
  confirmTextColor?: string;
  cancelTextColor?: string;
  windowBackgroundColor?: string;
  buttonBackgroundColor?: string;
  buttonBackgroundColorDisabled?: string;
  sendSMSTextColor?: string;
  maxTimeShowPopup: number;
}

export interface PlugPagEffectuatePreAutoData {
  amount: number;
  userReference?: string;
  printReceipt: boolean;
  transactionId?: string;
  transactionCode?: string;
}

/**
 * Código de evento indicando que a ativação foi feita corretamente.
 */
export enum PlugPagEventCode {
  /** Código de evento indicando que o leitor está aguardando o usuário inserir o cartão. */
  WAITING_CARD = 0,
  /** Código de evento indicando que o cartão foi inserido. */
  INSERTED_CARD = 1,
  /** Código de evento indicando que o leitor está aguardando o usuário digitar a senha. */
  PIN_REQUESTED = 2,
  /** Código de evento indicando que a senha foi digitada com sucesso. */
  PIN_OK = 3,
  /** Código de evento indicando o fim da transação. */
  SALE_END = 4,
  /** Código de evento indicando que o terminal está aguardando autorização da senha digitada para prosseguir com a transação. */
  AUTHORIZING = 5,
  /** Código de evento indicando que a senha foi digitada com sucesso. Esse código foi descontinuado e será removido em futuras atualizações. */
  INSERTED_KEY = 6,
  /** Código de evento indicando que o terminal está aguardando o usuário remover o cartão. */
  WAITING_REMOVE_CARD = 7,
  /** Código de evento indicando que o cartão foi removido do terminal. */
  REMOVED_CARD = 8,
  /** Código de evento indicando que foi solicitado o CVV. */
  CVV_REQUESTED = 9,
  /** Código de evento indicando que o CVV foi inserido. */
  CVV_OK = 10,
  /** Código de evento indicando que foi solicitado o BIN. */
  CAR_BIN_REQUESTED = 11,
  /** Código de evento indicando que o BIN foi inserido. */
  CAR_BIN_OK = 12,
  /** Código de evento indicando que foi solicitado o holder. */
  CAR_HOLDER_REQUESTED = 13,
  /** Código de evento indicando que o holder foi inserido. */
  CAR_HOLDER_OK = 14,
  /** Código de evento indicando que a ativação foi feita corretamente. */
  ACTIVATION_SUCCESS = 15,
  /** Código de evento indicando que um dígito da senha foi digitado. */
  DIGIT_PASSWORD = 16,
  /** Código de evento indicando que a senha foi apagada. */
  NO_PASSWORD = 17,
  /** Código de evento indicando que a venda foi autorizada. */
  SALE_APPROVED = 18,
  /** Código de evento indicando que a venda não foi autorizada. */
  SALE_NOT_APPROVED = 19,
  /** Código de evento indicando que houve um erro de leitura contactless. */
  CONTACTLESS_ERROR = 23,
  /** Código de evento indicando que é necessário observar instruções no smartphone durante um pagamento via contactless. */
  CONTACTLESS_ON_DEVICE = 24,
  /** Código de evento indicando que é necessário usar pagamento via tarja magnética para a atual transação. */
  USE_TARJA = 25,
  /** Código de evento indicando que é necessário usar pagamento via chip para a atual transação. */
  USE_CHIP = 26,
  /** Código de evento indicando que está sendo feito o download da carga de tabelas. */
  DOWNLOADING_TABLES = 27,
  /** Código de evento indicando que está sendo feito a gravação da carga de tabelas. */
  RECORDING_TABLES = 28,
  /** Código de evento indicando que a transação foi efetuada com sucesso. */
  SUCCESS = 29,
  /** Código de evento indicando que estão sendo resolvidas pendências. */
  SOLVE_PENDINGS = 30,
  /** Código de evento indicando mensagem customizada pela PlugPag. */
  CUSTOM_MESSAGE = -1,
  /** Código padrão de evento. Utilizado quando nenhum evento foi enviado. */
  DEFAULT = -1,
  /** Código de erro durante a execução do evento. */
  ON_EVENT_ERROR = -1,
}

export interface PlugPagEventData {
  eventCode: PlugPagEventCode;
  message?: string;
  errorCode?: string;
}

/**
 * Contains methods called when there are new payment, refund, deactivation or activation events.
 */
export interface PlugPagEventListener {
  /**
   * Action to be executed when an event is triggered.
   * @param data Event data
   */
  onEvent(data: PlugPagEventData): void;
}

// TypeScript Interface: PlugPagExtras {}

// TypeScript Interface: PlugPagInitializationResult
export interface PlugPagInitializationResult {
  result: number;
  errorCode: string;
  errorMessage: string;
}

/**
 * Contains values needed to execute LED commands.
 */
export enum PlugPagLedType {
  LED_BLUE = 0,
  LED_YELLOW = 1,
  LED_GREEN = 2,
  LED_RED = 3,
  LED_OFF = 4,
}

export interface PlugPagLedData {
  /**
   * Byte value for the LED to be lit. Options are defined in PlugPagLedType enum.
   */
  led: PlugPagLedType;
}

// TypeScript Interface: PlugPagInstallment
export interface PlugPagInstallment {
  quantity: number;
  amount: number;
  total: number;
}

// TypeScript Interface: PlugPagNearFieldCardData
export interface PlugPagNearFieldCardData {
  /**
   * Slot final do cartão NFC.
   */
  endSlot: number;

  /**
   * Vetor com os slots de dados e senha.
   */
  slots: Array<{ [key: string]: Uint8Array }>;

  /**
   * Slot inicial do cartão NFC.
   */
  startSlot: number;

  /**
   * Tempo limite de tentativa de leitura em segundos.
   */
  timeOutRead: number;

  /**
   * Tipo do cartão NFC, podendo ter os valores: ISO14443_AB, EMV_AB, ONLY_A e ONLY_M.
   */
  typeCard: number;
}

// TypeScript Enum: PlugPagNearFieldCardDataType
export enum PlugPagNearFieldCardDataType {
  /**
   * Tipo de cartão ISO14443 que lê tanto chaves A quanto B.
   */
  ISO14443_AB = 0,

  /**
   * Tipo de cartão EMV (Europay, MasterCard e Visa) que lê tanto chaves A quanto B.
   */
  EMV_AB = 1,

  /**
   * Tipo de cartão NFC que somente lê chaves A.
   */
  ONLY_A = 2,

  /**
   * Tipo de cartão NFC que somente lê chaves B.
   */
  ONLY_B = 3,

  /**
   * Tipo de cartão NFC que somente lê chaves M.
   */
  ONLY_M = 4,
}

// Constants for NFC card access
export const NFC_DATA = 'NFC_DATA'; // Chave de acesso aos dados do cartão
export const NFC_PWD = 'NFC_PWD'; // Chave de acesso aos dados de senha do cartão

export interface PlugPagSimpleNFCData {
  cardType: PlugPagNearFieldCardDataType.ONLY_M;
  slot: number;
  value: Uint8Array;
}

/**
 * Contém os tipos de identificação de remoção do cartão NFC.
 */
export enum PlugPagNearFieldRemoveCardType {
  /**
   * Interrompe a ação assim que é identificada a remoção.
   */
  HALT = 0,

  /**
   * Remoção do cartão diretamente do hardware.
   */
  REMOVE = 1,

  /**
   * Remoção padrão do cartão EMV (Europay, MasterCard e Visa).
   */
  EMV = 2,
}

export interface PlugPagNFCDetectRemoveCard {
  detectRemoveCardType: PlugPagNearFieldRemoveCardType;
  cardId: number;
}

export interface PlugPagNFCResult {
  startSlot: number;
  endSlot: number;
  slots: Array<{ [key: string]: Uint8Array }>;
  result: number;
  message?: string;
  errorCode?: string;
}

export interface PlugPagNFCInfosResultDirectly {
  result: number;
  cardType?: number;
  cid?: number;
  other?: Uint8Array;
  serialNumber?: Uint8Array;
}

export interface PlugPagNFCInfosResult {
  result: number;
  cardType?: number;
  cid?: number;
  other?: Uint8Array;
  serialNumber?: any;
}

// TypeScript Interface: PlugPagNFCAuthDirectly
export interface PlugPagNFCAuthDirectly {
  slotNumber: number;
  password: Uint8Array;
  em1KeyType: EM1KeyType;
  serialNumber: Uint8Array;
}

// TypeScript Interface: PlugPagPagBankActivationResult
export interface PlugPagPagBankActivationResult {
  result?: number;
  errorCode?: string;
  errorMessage?: string;
}

// TypeScript Interface: PlugPagPaymentData
export interface PlugPagPaymentData {
  type: number;
  amount: number;
  installmentType: number;
  installments: number;
  userReference?: string;
  printReceipt: boolean;
  partialPay: boolean;
  isCarne: boolean;
}

// TypeScript Interface: PlugPagPreAutoData
export interface PlugPagPreAutoData {
  amount?: number;
  installmentType: number;
  installments: number;
  userReference?: string;
  printReceipt?: boolean;
}

// TypeScript Interface: PlugPagPreAutoKeyingData
export interface PlugPagPreAutoKeyingData {
  amount?: number;
  installmentType: number;
  installments: number;
  userReference?: string;
  printReceipt?: boolean;
  pan: string;
  securityCode: string;
  expirationDate: string;
}

// TypeScript Interface: PlugPagPreAutoQueryData
export interface PlugPagPreAutoQueryData {
  amount?: number;
  installmentType: number;
  installments: number;
  pan: string;
  securityCode: string;
  expirationDate: string;
  transactionDate: string;
  transactionCode: string;
}

// TypeScript Interface: PlugPagPreAutoQueryResult
export interface PlugPagPreAutoQueryResult {
  result?: number;
  message?: string;
  errorCode?: string;
  transactions: PlugPagTransactionResult[];
}

// TypeScript Interface: PlugPagPrintActionResult
export interface PlugPagPrintActionResult {
  result: number;
}

// TypeScript Interface: PlugPagPrinterData
export interface PlugPagPrinterData {
  filePath: string;
  printerQuality: number;
  steps: number;
}

export interface PlugPagPrintResult {
  result: number;
  message?: string;
  errorCode?: string;
  steps: number;
}

export interface PlugPagReceiptSMSData {
  phoneNumber: string;
  transactionCode: string;
}

export interface PlugPagStyleData {
  headTextColor?: number;
  headBackgroundColor?: number;
  contentTextColor?: number;
  contentTextValue1Color?: number;
  contentTextValue2Color?: number;
  positiveButtonTextColor?: number;
  positiveButtonBackground?: number;
  negativeButtonTextColor?: number;
  negativeButtonBackground?: number;
  genericButtonBackground?: number;
  genericButtonTextColor?: number;
  genericSmsEditTextBackground?: number;
  genericSmsEditTextTextColor?: number;
  lineColor?: number;
}

export interface PlugPagSubAcquirerData {
  name: string;
  address: string;
  city: string;
  uf: string;
  country: string;
  zipCode: string;
  mcc: string;
  cnpjCpf: string;
  docType: string;
  telephone: string;
  fullName: string;
  merchantId: string;
}

export interface PlugPagSubAcquirerResult {
  name: string;
  address: string;
  city: string;
  uf: string;
  country: string;
  zipCode: string;
  mcc: string;
  cnpjCpf: string;
  docType: string;
  telephone: string;
  fullName: string;
  merchantId: string;
}

export interface PlugPagTransactionResult {
  message?: string;
  errorCode?: string;
  transactionCode?: string;
  transactionId?: string;
  date?: string;
  time?: string;
  hostNsu?: string;
  cardBrand?: string;
  bin?: string;
  holder?: string;
  userReference?: string;
  terminalSerialNumber?: string;
  amount?: string;
  availableBalance?: string;
  cardApplication?: string;
  label?: string;
  holderName?: string;
  extendedHolderName?: string;
  cardIssuerNationality?: CardIssuerNationality;
  result?: number;
  readerModel?: string;
  nsu?: string;
  autoCode?: string;
  installments?: string;
  originalAmount?: number;
  buyerName?: string;
  paymentType?: number;
  typeTransaction?: string;
  appIdentification?: string;
  cardHash?: string;
  preAutoDueDate?: string;
  preAutoOriginalAmount?: string;
  userRegistered: number;
  accumulatedValue?: string;
  consumerIdentification?: string;
  currentBalance?: string;
  consumerPhoneNumber?: string;
  clubePagScreensIds?: string;
  partialPayPartiallyAuthorizedAmount?: string;
  partialPayRemainingAmount?: string;
  pixTxIdCode?: string;
}

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

export interface PlugPagVoidData {
  transactionCode: string;
  transactionId: string;
  printReceipt: boolean;
  voidType: number;
}

/**
 * Contains methods executed during printing or sending customer receipt.
 */
export interface PlugPagPrintActionListener {
  /**
   * Called when printing or sending receipt is completed.
   */
  onSuccess(): void;

  /**
   * Called when printing or sending receipt fails.
   * @param error Error details
   */
  onError(error: Error): void;
}

/**
 * Contains methods called during printing.
 */
export interface PlugPagPrinterListener {
  /**
   * Action executed when a print error occurs.
   * @param result Print result details
   */
  onError(result: PlugPagPrintResult): void;

  /**
   * Action executed after a successful print.
   * @param result Print result details
   */
  onSuccess(result: PlugPagPrintResult): void;
}

/**
 * Contains methods that can be called at the end of a transaction
 * for sending SMS or printing customer receipt.
 */
export interface OnFinishPlugPagPrintActions {
  /**
   * Called when SMS is sent successfully
   */
  onSendSMSSuccess(): void;

  /**
   * Called when SMS sending fails
   * @param error Error details
   */
  onSendSMSError(error: Error): void;

  /**
   * Called when printing is completed
   */
  onPrintSuccess(): void;

  /**
   * Called when printing fails
   * @param error Error details
   */
  onPrintError(error: Error): void;
}
