import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultImc({ messageResultImc, resultImc, classification }) {
  if (!resultImc) return null;

  return (
    <View style={styles.resultContainer}>
      <Text style={styles.information}>{messageResultImc}</Text>
      <Text style={styles.numberImc}>{resultImc}</Text>
      {classification ? (
        <View style={styles.badge}>
          <Text style={styles.classificationText}>{classification}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  information: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: 'bold',
  },
  numberImc: {
    fontSize: 42,
    color: '#FF0043',
    fontWeight: 'bold',
    marginVertical: 6,
  },
  badge: {
    backgroundColor: '#FFE4E6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 4,
  },
  classificationText: {
    fontSize: 15,
    color: '#E11D48',
    fontWeight: 'bold',
  },
});
