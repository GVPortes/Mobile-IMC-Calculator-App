import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Title({ isDarkMode }) {
  return (
    <View style={styles.boxTitle}>
      <Text
        style={[
          styles.textTitle,
          { color: isDarkMode ? '#FF3767' : '#FF0043' },
        ]}
      >
        CALCULADORA IMC
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  boxTitle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
