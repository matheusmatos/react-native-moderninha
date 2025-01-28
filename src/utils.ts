import Moderninha from './Moderninha';

let RNConstants = Moderninha.getConstants();

export interface TerminalCapabilities {
  MODULE_BT: number;
  MODULE_CASH_BOX: number;
  MODULE_CUSTOMER_DISPLAY: number;
  MODULE_ETHERNET: number;
  MODULE_FINGERPRINT_READER: number;
  MODULE_G_SENSOR: number;
  MODULE_HDMI: number;
  MODULE_ICC: number;
  MODULE_ID_CARD_READER: number;
  MODULE_KEYBOARD: number;
  MODULE_MAG: number;
  MODULE_MODEM: number;
  MODULE_PED: number;
  MODULE_PICC: number;
  MODULE_PRINTER: number;
  MODULE_SM: number;
}

export interface PlugPagUserDataResult {
  address?: string;
  city?: string;
  cnpjCpf?: string;
  addressComplement?: string;
  companyName?: string;
  userNickName?: string;
  addressState?: string;
  email?: string;
}

export interface ModerninhaConstants {
  TERMINAL_SERIAL_NUMBER: string;
  TERMINAL_SN: string;
}

export const TerminalCapabilities: TerminalCapabilities =
  RNConstants.TERMINAL_CAPABILITIES as TerminalCapabilities;

export function getUserData(): Promise<PlugPagUserDataResult> {
  return Moderninha.getUserData();
}

export const Constants: ModerninhaConstants = {
  TERMINAL_SERIAL_NUMBER: RNConstants.TERMINAL_SERIAL_NUMBER,
  TERMINAL_SN: RNConstants.TERMINAL_SN,
};
