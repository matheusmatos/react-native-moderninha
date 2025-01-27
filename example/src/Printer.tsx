import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {
  hasCapability,
  TerminalCapabilities,
  printFromFile,
} from 'react-native-moderninha';

export default function Capabilities() {
  const onPrint = React.useCallback(() => {
    const filePath = 'example.jpg';
    printFromFile(filePath).then((result) => {
      console.log('result:', result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Imprimir" onPress={onPrint} />
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
    // width: 60,
    // height: 60,
    // marginVertical: 20,
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
