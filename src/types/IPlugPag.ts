import type { PlugPagException } from './IPlugPagErrors';
import {
  type PlugPagAbortResult,
  type PlugPagActivationData,
  type PlugPagBeepData,
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
  type PlugPagPrintResult,
  type PlugPagReceiptSMSData,
  type PlugPagSimpleNFCData,
  type PlugPagStyleData,
  type PlugPagSubAcquirerData,
  type PlugPagSubAcquirerResult,
  type PlugPagTransactionResult,
  type PlugPagUserDataResult,
  type PlugPagVoidData,
} from './IPlugPagTypes';
import {
  type PlugPagPrinterDataFile,
  type PlugPagPrinterDataLines,
  type PlugPagPrinterDataText,
} from './IPlugPagTypesCustom';

export type IPlugPagProperties = {
  /**
   * Quantidade de parcelas padrão de uma venda à vista.
   */
  readonly A_VISTA_INSTALLMENT_QUANTITY: 1;
  /**
   * Código utilizado para indicar que o nome ou versão do aplicativo não foram declarados.
   */
  readonly APP_NAME_VERSION_NOT_SET: number | undefined;
  /**
   * Código utilizado para indicar que o modo selecionado é inválido.
   */
  readonly APPLICATION_NOT_SUPPORTED: number | undefined;
  /**
   * Código utilizado para indicar que ocorreu uma falha ao autenticar.
   */
  readonly AUTHENTICATION_FAILED: number | undefined;
  /**
   * Código utilizado para indicar falha na geração de mensagem da transação, ocasionado pelo tamanho do buffer.
   */
  readonly BUFFER_SIZE_ERROR: number | undefined;
  /**
   * Código utilizado para erros de comunicação.
   */
  readonly COMMUNICATION_ERROR: number | undefined;
  /**
   * Código utilizado para indicar que não existem dados de autenticação.
   */
  readonly CRYPTO_INIT_ERROR: number | undefined;
  /**
   * Código utilizado para indicar que dada funcionalidade não está disponível para o terminal.
   */
  readonly DISABLED_FUNCTION: number | undefined;
  /**
   * Código utilizado para indicar que o serviço da PlugPag se encontra ocupado, já existindo uma operação em andamento.
   */
  readonly DOING_TRANSACTION: number | undefined;
  /**
   * Código utilizado para inidicar que ocorreu um erro na função do driver de conexão.
   */
  readonly DRIVER_FUNCTION_ERROR: number | undefined;
  /**
   * Código utilizado para inidicar que o driver de conexão não foi encontrado.
   */
  readonly DRIVER_NOT_FOUND: number | undefined;
  /**
   * Código utilizado para sucesso numa transação.
   */
  readonly ERROR_CODE_OK: string | undefined;
  /**
   * Código utilizado para indicar uma falha de comunicação com o servidor.
   */
  readonly HOST_ERROR: number | undefined;
  /**
   * Código utilizado para indicar uma falha no cálculo de parcelamento.
   */
  readonly INSTALLMENT_ERROR: number | undefined;
  /**
   * Forma de parcelamento: À vista.
   */
  readonly INSTALLMENT_TYPE_A_VISTA: 1;
  /**
   * Forma de parcelamento: Parcelamento comprador.
   */
  readonly INSTALLMENT_TYPE_PARC_COMPRADOR: 3;
  /**
   * Forma de parcelamento: Parcelamento vendedor.
   */
  readonly INSTALLMENT_TYPE_PARC_VENDEDOR: 2;
  /**
   * Código utilizado para indicar que o valor da transação é inválido, não podendo ser inferior a R$1,00.
   */
  readonly INVALID_AMOUNT: number | undefined;
  /**
   * Código utilizado para indicar que o valor da transação é inválido, podendo ser um erro de digitação ou formatação.
   */
  readonly INVALID_AMOUNT_FORMAT: number | undefined;
  /**
   * Código utilizado para indicar que o nome do aplicativo excedeu o tamanho limite (25 caracteres).
   */
  readonly INVALID_APP_NAME: number | undefined;
  /**
   * Código utilizado para indicar que a versão do aplicativo excedeu o tamanho limite (10 caracteres).
   */
  readonly INVALID_APP_VERSION: number | undefined;
  /**
   * Código utilizado para indicar que o buffer de resposta é inválido.
   */
  readonly INVALID_BUFFER: number | undefined;
  /**
   * Código utilizado para indicar que o buffer de resposta é inválido, sendo necessário refazê-la.
   */
  readonly INVALID_BUFFER_DATA: number | undefined;
  /**
   * Código utilizado para indicar que o cartão é inválido.
   */
  readonly INVALID_CARD: number | undefined;
  /**
   * Código utilizado para indicar que a identificação do dispositivo é inválida.
   */
  readonly INVALID_DEVICE_IDENTIFICATION: number | undefined;
  /**
   * Código utilizado para indicar que o parcelamento da transação é inválido, podendo ser um erro da quantidade de parcelas ou valor de cada parcela. A quantidade de parcelas deve ser superior a 0 e inferior ao limite máximo para aquela conta / terminal (definido dinamicamente). O valor da parcela não pode ser inferior a R$5,00. Nesse caso só é permitido à vista.
   */
  readonly INVALID_INSTALLMENT: number | undefined;
  /**
   * Código utilizado para indicar que um tipo de parcelamento inválido foi informado.
   */
  readonly INVALID_INSTALLMENT_TYPE: number | undefined;
  /**
   * Código utilizado para indicar que o código da venda ultrapassou o tamanho limite (10 caracteres).
   */
  readonly INVALID_LENGTH_USER_REFERENCE: number | undefined;
  /**
   * Código utilizado para indicar que o parâmetro fornecido é inválido.
   */
  readonly INVALID_PARAMETER: number | undefined;
  /**
   * Código utilizado para indicar que o leitor é inválido.
   */
  readonly INVALID_READER: number | undefined;
  /**
   * Código utilizado para indicar que o tipo de transação informada é inválido.
   */
  readonly INVALID_TRANSACTION_TYPE: number | undefined;
  /**
   * Quantidade mínima de linhas impressas após a impressão finalizar.
   */
  readonly MIN_PRINTER_STEPS: 70;
  /**
   * Código utilizado para indicar que ocorreu uma falha obter os coeficientes de parcelamento.
   */
  readonly MISSING_COEFFICIENTS: number | undefined;
  /**
   * Código utilizado quando uma efetivação ou cancelamento de pré-autorização foi feita mas não houve consulta anteriormente ou se o cache da consulta anterior foi perdido.
   */
  readonly MISSING_PREAUTO_CACHE: number | undefined;
  /**
   * Código utilizado para indicar que o token não foi encontrado.
   */
  readonly MISSING_TOKEN: number | undefined;
  /**
   * Código utilizado para pagamento parcial.
   */
  readonly MODE_PARTIAL_PAY: 1001;
  /**
   * Código utilizado para indicar falha nas operações de NFC.
   */
  readonly NFC_RET_ERROR: number | undefined;
  /**
   * Código utilizado para indicar sucesso nas operações de NFC.
   */
  readonly NFC_RET_OK: 1;
  /**
   * Código utilizado quando não existe impressora no dispositivo.
   */
  readonly NO_PRINTER_DEVICE: number | undefined;
  /**
   * Código utilizado para transação sem dados.
   */
  readonly NO_TRANSACTION_DATA: number | undefined;
  /**
   * Código utilizado para indicar que o valor da transação está nulo.
   */
  readonly NULL_AMOUNT: number | undefined;
  /**
   * Código utilizado para inidcar que o parâmetro da aplicação está com valor nulo.
   */
  readonly NULL_APPLICATION_PARAMETER: number | undefined;
  /**
   * Código utilizado para indicar que o valor total da transação está nulo.
   */
  readonly NULL_TOTAL_AMOUNT: number | undefined;
  /**
   * Código utilizado para inidicar que o Valor resultante da transação está nulo.
   */
  readonly NULL_TRANSACTION_RESULT: number | undefined;
  /**
   * Código utilizado para indicar que o código de venda está nulo.
   */
  readonly NULL_USER_REFERENCE: number | undefined;
  /**
   * Código utilizado como retorno de uma transação cancelada.
   */
  readonly OPERATION_ABORTED: number | undefined;
  /**
   * Código utilizado para indicar uma falha ao adquirir as informações do leitor.
   */
  readonly PINPAD_ERROR: number | undefined;
  /**
   * Código utilizado para indicar que o pinpad não foi inicializado.
   */
  readonly PINPAD_NOT_INITIALIZED: number | undefined;
  /**
   * Constante de configuração remota para confirmação assíncrona.
   */
  readonly PLUGPAG_ASYNC_CONFIRMATION: 1;
  /**
   * Constante de configuração remota para envio de métricas.
   */
  readonly PLUGPAG_ASYNC_METRICS: 2;
  /**
   * Constante de configuração remota para CDCVM.
   */
  readonly PLUGPAG_CDCVM: 3;
  /**
   * Constante de configuração remota para envio de logs de crash.
   */
  readonly PLUGPAG_CRASHLOG_SENDING: 4;
  /**
   * Constante de configuração remota para habilitar o GMT de São Paulo (Horario de verão).
   */
  readonly PLUGPAG_GMT_OFFSET: 5;
  /**
   * Constante de configuração remota para pré-impressão.
   */
  readonly PLUGPAG_PRE_PRINTING: 0;
  /**
   * Código utilizado para erros desconhecidos .
   */
  readonly PLUGPAG_UNKNOWN_ERROR_CODE: string | undefined;
  /**
   * Código utilizado para indicar que o terminal não está pronto para transacionar.
   */
  readonly POS_NOT_READY: number | undefined;
  /**
   * Código utilizado para indicar que ocorreu um erro ao inicializar dependências.
   */
  readonly PSC_INIT_ERROR: number | undefined;
  /**
   * Código utilizado para indicar que o QR Code gerado para a transação foi expirado.
   */
  readonly QR_CODE_EXPIRED: number | undefined;
  /**
   * Código utilizado quando um estorno não pode ser realizado devido ao cartão do cliente não ser o mesmo cartão da venda.
   */
  readonly REFUND_NOT_ALLOWED: number | undefined;
  /**
   * Código utilizado para indicar sucesso nas operações.
   */
  readonly RET_OK: 0;
  /**
   * Código utilizado para indicar que a transação via bluetooth não é permitida em modo compartilhado.
   */
  readonly SHARE_MODE_NOT_ALLOWED: number | undefined;
  /**
   * Código utilizado para indicar uma falha ao carregar tabelas.
   */
  readonly TABLE_LOAD_FAILED: number | undefined;
  /**
   * Código utilizado para indicar transação não realizada.
   */
  readonly TRANSACTION_DENIED: number | undefined;
  /**
   * Tipo de pagamento: Crédito.
   */
  readonly TYPE_CREDITO: 1;
  /**
   * Tipo de pagamento: Débito.
   */
  readonly TYPE_DEBITO: 2;
  /**
   * Tipo de pagamento: QR Code Pix.
   */
  readonly TYPE_PIX: 5;
  /**
   * Tipo de pagamento: Pré-autorização via cartão.
   */
  readonly TYPE_PREAUTO_CARD: 6;
  /**
   * Tipo de pagamento: Pré-autorização por digitação.
   */
  readonly TYPE_PREAUTO_KEYED: 8;
  /**
   * Tipo de pagamento: QR Code débito.
   */
  readonly TYPE_QRCODE: 4;
  /**
   * Tipo de pagamento: QR Code crédito.
   */
  readonly TYPE_QRCODE_CREDITO: 7;
  /**
   * Tipo de pagamento: Voucher (vale refeição).
   */
  readonly TYPE_VOUCHER: 3;
  /**
   * Código numérico utilizado para erros desconhecidos.
   */
  readonly UNKNOWN_ERROR_CODE: number | undefined;
  /**
   * Mensagem utilizada para erros desconhecidos .
   */
  readonly UNKNOWN_ERROR_MESSAGE: string | undefined;
  /**
   * Código utilizado para estorno de um pagamento.
   */
  readonly VOID_PAYMENT: 1;
  /**
   * Código utilizado para um estorno via QR Code.
   */
  readonly VOID_QRCODE: 2;
};

export interface IPlugPag extends IPlugPagProperties {
  /**
   * Executa uma solicitação de cancelamento da operação em execução.
   * @returns Resultado da solicitação de cancelamento.
   */
  abort(): PlugPagAbortResult;
  /**
   * Executa uma solicitação de cancelamento de leitura ou escrita NFC.
   * @returns Resultado da solicitação de cancelamento.
   */
  abortNFC(): PlugPagNFCResult;
  /**
   * Executa uma solicitação de comando APDU (Application Protocol Data Unit).
   * @param command Comando APDU.
   * @param dataLength Tamanho dos dados.
   * @returns Resultado da solicitação de comando APDU.
   */
  apduCommand(
    command: Uint8Array,
    dataLength: number
  ): PlugPagCmdExchangeResult;
  /**
   * Executa uma solicitação de autenticação direta em um cartão NFC.
   * @param authData Dados de autenticação.
   * @param timeout Tempo de espera para a resposta.
   * @returns Resultado da solicitação de autenticação.
   */
  authNFCCardDirectly(
    authData: PlugPagNFCAuth,
    timeout: number
  ): number | undefined;
  /**
   * Executa um alerta sonoro.
   * @param beepData Dados do alerta sonoro.
   * @returns Resultado da solicitação de alerta sonoro.
   */
  beep(beepData: PlugPagBeepData): Promise<number>;
  /**
   * Executa o cálculo de valor das parcelas de um parcelamento do tipo PlugPag.INSTALLMENT_TYPE_PARC_COMPRADOR.
   * @param saleValue Valor da venda.
   * @param installmentType Tipo de parcelamento.
   * @returns Resultado do cálculo de parcelas.
   */
  calculateInstallments(
    saleValue: string,
    installmentType: number
  ): PlugPagInstallment[];
  /**
   * Executa uma validação de permissões necessárias para executar as funcionalidades do WrapperPPS.
   * @returns `true` se as permissões forem válidas, `false` caso contrário.
   */
  checkPermissionPlugPagService(): boolean;
  /**
   * Executa a desativação do terminal.
   * @param activationData Dados de ativação.
   * @returns Resultado da desativação.
   */
  deactivate(
    activationData: PlugPagActivationData
  ): PlugPagInitializationResult;
  /**
   * Executa uma solicitação de detecção detecção direta de informações de um cartão NFC.
   * @param cardType Tipo de cartão.
   * @param timeout Tempo de espera para a resposta.
   * @returns Resultado da detecção direta.
   */
  detectNfcCardDirectly(
    cardType: number,
    timeout: number
  ): PlugPagNFCInfosResultDirectly;
  /**
   * Executa uma solicitação de detecção de remoção de um cartão NFC.
   * @param detectRemove Dados de detecção de remoção.
   * @returns Resultado da detecção de remoção.
   */
  detectNfcRemoveDirectly(
    detectRemove: PlugPagNFCDetectRemoveCard
  ): number | undefined;
  /**
   * Executa uma solicitação de efetivação de uma transação pré-autorizada.
   * @param effectuatePreAutoData Dados de efetivação de transação pré-autorizada.
   * @returns Resultado da efetivação de transação pré-autorizada.
   */
  doEffectuatePreAuto(
    effectuatePreAutoData: PlugPagEffectuatePreAutoData
  ): Promise<PlugPagTransactionResult>;
  /**
   * Executa uma solicitação de transação.
   * @param paymentData Dados de transação.
   * @returns Resultado da transação.
   */
  doPayment(
    paymentData: PlugPagPaymentData
  ): Promise<PlugPagTransactionResult | PlugPagException>;
  /**
   * Executa uma solicitação de cancelamento de uma transação pré-autorizada.
   * @param transactionId ID da transação.
   * @param transactionCode Código da transação.
   * @returns Resultado da cancelamento de transação pré-autorizada.
   */
  doPreAutoCancel(
    transactionId: string,
    transactionCode: string
  ): Promise<PlugPagTransactionResult>;
  /**
   * Executa uma solicitação de criação de transação pré-autorizada.
   * @param plugPagPreAutoData Dados de transação pré-autorizada.
   * @returns Resultado da criação de transação pré-autorizada.
   */
  doPreAutoCreate(
    plugPagPreAutoData: PlugPagPreAutoData
  ): Promise<PlugPagTransactionResult>;
  /**
   * Executa uma solicitação de criação de transação pré-autorizada digitada.
   * @param plugPagPreAutoKeyingData Dados de transação pré-autorizada digitada.
   * @returns Resultado da criação de transação pré-autorizada digitada.
   */
  doPreAutoCreate(
    plugPagPreAutoKeyingData: PlugPagPreAutoKeyingData
  ): Promise<PlugPagTransactionResult>;
  /**
   * Ação a ser executada durante uma impressão.
   * @param action Ação a ser executada.
   * @param phoneNumber Número de telefone.
   */
  doPrintAction(action: number, phoneNumber?: string): void;
  /**
   * Obtém dados de um cartão de pagamentos através de uma leitura do mesmo.
   * @returns Resultado dos dados do cartão.
   */
  getCardData(): PlugPagCardInfoResult;
  /**
   * Executa uma consulta de pré-autorização via digitação.
   * @param plugPagPreAutoQueryData Dados de consulta de pré-autorização.
   * @returns Resultado da consulta de pré-autorização.
   */
  getKeyedInPreAutoData(
    plugPagPreAutoQueryData: PlugPagPreAutoQueryData
  ): PlugPagTransactionResult;
  /**
   * Obtém a última transação aprovada.
   * @returns Resultado da última transação aprovada.
   */
  getLastApprovedTransaction(): PlugPagTransactionResult;
  /**
   * Executa uma solicitação de consulta de informações de um cartão NFC.
   * @param cardType Tipo de cartão.
   * @returns Resultado da consulta de informações do cartão NFC.
   */
  getNFCInfos(cardType: number): PlugPagNFCInfosResult;
  /**
   * Executa uma solicitação de consulta de transação pré-autorização.
   * @param plugPagPreAutoQueryData Dados de consulta de transação pré-autorização.
   * @returns Resultado da consulta de transação pré-autorização.
   */
  getPreAutoData(
    plugPagPreAutoQueryData?: PlugPagPreAutoQueryData
  ): PlugPagTransactionResult;
  /**
   * Executa uma consulta de pré-autorização via cartão.
   * @returns Resultado da consulta de pré-autorização via cartão.
   */
  getPreAutoList(): PlugPagPreAutoQueryResult;
  /**
   * Executa uma solicitação de consulta de dados de sub adquirência do terminal.
   * @returns Resultado da consulta de dados de sub adquirência do terminal.
   */
  getSubAcquirerData(): PlugPagSubAcquirerResult | null;
  /**
   * Executa uma solicitação de consulta de dados do usuário do terminal.
   * @returns Resultado da consulta de dados do usuário do terminal.
   */
  getUserData(): Promise<PlugPagUserDataResult>;
  /**
   * Verifica se o terminal tem uma funcionalidade específica.
   * @param capability Funcionalidade a ser verificada.
   * @returns `true` se a funcionalidade está disponível, `false` caso contrário.
   */
  hasCapability(capability: number): boolean;
  /**
   * Verifica se a PlugPagService tem uma funcionalidade específica.
   * @param operation Operação a ser verificada.
   * @param mode Modo a ser verificado.
   * @returns `true` se a funcionalidade está disponível, `false` caso contrário.
   */
  hasSoftwareCapability(operation: number, mode?: number): boolean;
  /**
   * Verifica se há perfil de sub adquirência do terminal.
   * @returns `true` se há perfil de sub adquirência, `false` caso contrário.
   */
  hasSubAcquirer(): boolean;
  /**
   * Executa uma solicitação de inicialização e ativação do terminal.
   * @param activationData Dados de ativação.
   * @returns Resultado da inicialização e ativação do terminal.
   */
  initializeAndActivatePinpad(
    activationData: PlugPagActivationData
  ): Promise<PlugPagInitializationResult>;
  /**
   * Executa a inicialização do perfil de sub adquirência do terminal.
   * @param data Dados de inicialização do perfil de sub adquirência.
   * @returns Resultado da inicialização do perfil de sub adquirência.
   */
  initializeSubAcquirer(
    data: PlugPagSubAcquirerData
  ): PlugPagInitializationResult;
  /**
   * Executa uma ativação através do QRCode do PagBank.
   * @returns Resultado da ativação através do QRCode do PagBank.
   */
  initPagBankActivation(): PlugPagPagBankActivationResult;
  /**
   * Executa uma limpeza em todos os dados relacionados a autenticação.
   */
  invalidateAuthentication(): void;
  /**
   * Invalida a inicialização do perfil de sub adquirência do terminal.
   * @returns `true` se a inicialização do perfil de sub adquirência foi invalidada, `false` caso contrário.
   */
  invalidateSubAcquirer(): boolean;
  /**
   * Verifica se existe um usuário autenticado.
   * @returns `true` se um usuário estiver autenticado, `false` caso contrário.
   */
  isAuthenticated(): boolean;
  /**
   * Verifica se o serviço da PlugPag está ocupado.
   * @returns `true` se o serviço está ocupado, `false` caso contrário.
   */
  isServiceBusy(): boolean;
  /**
   * Executa uma solicitação de autenticação do cartão NFC diretamente pelo hardware.
   * @param plugPagNFCAuthDirectly Dados de autenticação do cartão NFC diretamente pelo hardware.
   * @returns Resultado da autenticação do cartão NFC diretamente pelo hardware.
   */
  justAuthNfcDirectly(
    plugPagNFCAuthDirectly: PlugPagNFCAuthDirectly
  ): number | undefined;
  /**
   * Executa uma solicitação de impressão através do caminho de um arquivo local.
   * @param printerData Dados de impressão.
   * @returns Resultado da impressão.
   */
  printFromFile(
    printerData: PlugPagPrinterDataFile
  ): Promise<PlugPagPrintResult>;
  /**
   * Prints a series of lines with different styles (tags) and content.
   * @param printerData Dados de impressão.
   */
  printFromLines(
    printerData: PlugPagPrinterDataLines
  ): Promise<PlugPagPrintResult>;
  /**
   * Prints text by converting it to a bitmap.
   * @param printerData Dados de impressão.
   */
  printFromText(
    printerData: PlugPagPrinterDataText
  ): Promise<PlugPagPrintResult>;
  /**
   * Executa uma solicitação de leitura de um cartão NFC.
   * @param cardData Dados do cartão NFC.
   * @returns Resultado da leitura do cartão NFC.
   */
  readFromNFCCard(cardData: PlugPagNearFieldCardData): PlugPagNFCResult;
  /**
   * Executa uma solicitação de leitura direta em um cartão NFC.
   * @param cardData Dados do cartão NFC.
   * @returns Resultado da leitura direta do cartão NFC.
   */
  readNFCCardDirectly(cardData: PlugPagSimpleNFCData): PlugPagNFCResult;
  /**
   * Executa a reinicialização do terminal.
   */
  reboot(): void;
  /**
   * Executa uma solicitação de reimpressão da via do cliente.
   * @returns Resultado da reimpressão da via do cliente.
   */
  reprintCustomerReceipt(): PlugPagPrintResult;
  /**
   * Executa uma solicitação de reimpressão da via do estabelecimento.
   * @returns Resultado da reimpressão da via do estabelecimento.
   */
  reprintStablishmentReceipt(): PlugPagPrintResult;
  /**
   * Executa uma solicitação de envio de comprovante via SMS.
   * @param smsData Dados de envio de comprovante via SMS.
   * @returns `true` se o envio de comprovante via SMS foi bem-sucedido, `false` caso contrário.
   */
  sendReceiptSMS(smsData: PlugPagReceiptSMSData): boolean;
  /**
   * Define os métodos a serem chamados quando existem novos eventos de pagamento, estorno, desativação ou ativação.
   * @param listener Métodos a serem chamados.
   */
  setEventListener(listener: PlugPagEventListener): void;
  /**
   * Executa uma solicitação de definição do LED que será usado em ações que usam o mesmo.
   * @param ledData Dados do LED.
   * @returns Resultado da definição do LED.
   */
  setLed(ledData: PlugPagLedData): number | undefined;
  /**
   * Executa a customização dos elementos da tela de impressão da via do cliente.
   * @param plugPagCustomPrinterLayout Dados de customização da tela de impressão da via do cliente.
   */
  setPlugPagCustomPrinterLayout(
    plugPagCustomPrinterLayout: PlugPagCustomPrinterLayout
  ): void;
  /**
   * Define os métodos a serem chamados durante uma ação relacionada a impressão.
   * @param printListener Métodos a serem chamados.
   * @returns Resultado da definição dos métodos a serem chamados durante uma ação relacionada a impressão.
   */
  setPrintActionListener(
    printListener?: PlugPagPrintActionListener
  ): PlugPagPrintActionResult;
  /**
   * Define os métodos a serem chamados durante uma impressão.
   * @param listener Métodos a serem chamados.
   */
  setPrinterListener(listener: PlugPagPrinterListener): void;
  /**
   * Executa uma solicitação de definição de cores a serem usadas no design das telas fornecidas pela PlugPagService.
   * @param styleData Dados de estilo.
   * @returns `true` se a definição de cores foi bem-sucedida, `false` caso contrário.
   */
  setStyleData(styleData: PlugPagStyleData): boolean;
  /**
   * Executa uma solicitação de ligar a antena do sistema de NFC em uso.
   * @returns Resultado da solicitação de ligar a antena do sistema de NFC em uso.
   */
  startNFCCardDirectly(): number | undefined;
  /**
   * Executa a aplicação "Boas Vindas" caso a mesma esteja instalada e o terminal esteja desativado.
   */
  startOnBoarding(): void;
  /**
   * Executa uma solicitação de parada da antena do sistema de NFC em uso.
   * @returns Resultado da solicitação de parada da antena do sistema de NFC em uso.
   */
  stopNFCCardDirectly(): number | undefined;
  /**
   * Executa a atualização dos dados de configuração remota.
   * @returns Resultado da atualização dos dados de configuração remota.
   */
  updateRemoteConfig(): number | undefined;
  /**
   * Executa uma solicitação de estorno.
   * @param voidData Dados de estorno.
   * @returns Resultado do estorno.
   */
  voidPayment(voidData: PlugPagVoidData): PlugPagTransactionResult;
  /**
   * Realiza escrita em um cartão NFC.
   * @param cardData Dados do cartão NFC.
   * @returns Resultado da escrita no cartão NFC.
   */
  writeToNFCCard(cardData: PlugPagNearFieldCardData): PlugPagNFCResult;
  /**
   * Executa uma solicitação de escrita direta em um cartão NFC.
   * @param cardData Dados do cartão NFC.
   * @returns Resultado da escrita direta no cartão NFC.
   */
  writeToNFCCardDirectly(cardData: PlugPagSimpleNFCData): number | undefined;
}
