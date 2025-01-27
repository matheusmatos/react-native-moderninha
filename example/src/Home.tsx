import { StyleSheet, Button, View, Text } from 'react-native';
// import {
//   Constants,
//   getIsAuthenticated,
//   getUserData,
//   type PlugPagUserDataResult,
//   hasCapability,
//   TerminalCapabilities,
// } from 'react-native-moderninha';
import Moderninha, { BeepDataConstants } from 'react-native-moderninha';

export default function Home() {
  const onBeep = () => {
    Moderninha.beep({
      frequency: BeepDataConstants.FREQUENCY_LEVEL_1,
      duration: 200,
    })
      .then((result) => {
        console.log('onBeep.result:', result);
      })
      .catch((err) => {
        console.error('onBeep.error:', err);
      });
  };

  return (
    <View style={styles.container}>
      <Text>isAuthenticated: {Moderninha.isAuthenticated()?.toString()}</Text>
      <Button onPress={onBeep} title="Beep!" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  box: {
    backgroundColor: '#ccc',
    padding: 14,
    borderRadius: 12,
  },
  title: {
    textAlign: 'left',
    color: 'black',
    fontSize: 30,
    lineHeight: 30,
  },
  headline: {
    fontSize: 18,
    color: 'black',
  },
});
