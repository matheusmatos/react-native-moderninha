import { NativeModules } from 'react-native';

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

export default Moderninha;
