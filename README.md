# react-native-moderninha

Biblioteca React Native que integra o SDK oficial pagseguro-sdk-plugpagservicewrapper para interagir com as Moderninhas Smart do Pagbank.

## Installation

```sh
npm install react-native-moderninha
```

## Usage


```js
import PlugPag, { BeepDataConstants, PlugPagUserDataResult } from 'react-native-moderninha';

// ...

let isAuthenticated = PlugPag.isAuthenticated();
let userData: PlugPagUserDataResult = PlugPag.getUserData();

console.log({ isAuthenticated, userData });

PlugPag.beep({
    frequency: BeepDataConstants.FREQUENCY_LEVEL_1,
    duration: 200,
}).then((result) => {
    console.log("onBeep.result:", result);
}).catch((err) => {
    console.error("onBeep.error:", err);
});
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
