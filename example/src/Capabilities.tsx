import { StyleSheet, View, Text } from 'react-native';
import { hasCapability, TerminalCapabilities } from 'react-native-moderninha';

export default function Capabilities() {
  return (
    <View style={styles.container}>
      {Object.entries(TerminalCapabilities).map(([name, capability]) => (
        <Text key={name}>
          {name.replace('MODULE_', '')}: {hasCapability(capability).toString()}
        </Text>
      ))}
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
