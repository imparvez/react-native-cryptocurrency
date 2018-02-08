import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Custom Components
import CryptoCurrency from './src/components/CryptoCurrency.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CryptoCurrency />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
});
