import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  Constants,
  getIsAuthenticated,
  getUserData,
  type PlugPagUserDataResult,
  hasCapability,
  TerminalCapabilities,
} from 'react-native-moderninha';

export default function Home() {
  const [userData, setUserData] = useState<PlugPagUserDataResult>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  useEffect(() => {
    getUserData().then(setUserData);
    let val = getIsAuthenticated();
    setIsAuthenticated(val);
  }, []);

  return (
    <View style={styles.container}>
      <Text>SERIAL_NUMBER: {Constants.TERMINAL_SERIAL_NUMBER}</Text>
      <Text>isAuthenticated: {isAuthenticated?.toString()}</Text>
      <Text>{JSON.stringify(userData, null, 2)}</Text>
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
