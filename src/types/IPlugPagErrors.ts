export interface PlugPagException extends Error {
  message: string;
  cause?: Error;
  errorCode: string;
}
