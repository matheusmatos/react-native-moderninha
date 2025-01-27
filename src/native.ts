import { NativeModules } from 'react-native';

const Moderninha = NativeModules.Moderninha
  ? NativeModules.Moderninha
  : undefined;

export default Moderninha;
