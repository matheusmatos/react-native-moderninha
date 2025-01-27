import { NativeModules } from 'react-native';
export {
  TerminalCapabilities,
  type PlugPagUserDataResult,
  getUserData,
  Constants,
} from './utils';

const LINKING_ERROR =
  `The package 'react-native-moderninha' doesn't seem to be linked. Make sure: \n\n` +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Moderninha = NativeModules.Moderninha
  ? NativeModules.Moderninha
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return Moderninha.multiply(a, b);
}

export function getIsAuthenticated(): boolean {
  return Moderninha.isAuthenticated();
}

export function hasCapability(capability: number): boolean {
  return Moderninha.hasCapability(capability);
}

export function printFromFile(
  filePath: string,
  printerQuality: number = 4,
  steps: number = 10 * 12
): Promise<boolean> {
  return Moderninha.printFromFile(filePath, printerQuality, steps);
}
