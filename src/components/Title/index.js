import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Title() {
  return (
    <View style={styles.boxTitle}>
      <Text style={styles.textTitle}>CALCULADORA IMC</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  boxTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  textTitle: {
    color: '#FF0043',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
