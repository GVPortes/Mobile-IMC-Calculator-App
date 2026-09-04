import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultImc({
  messageResultImc,
  resultImc,
  classification,
  isDarkMode,
}) {
  if (!resultImc) return null;

  return (
    <View style={styles.resultContainer}>
      <Text
        style={[
          styles.information,
          { color: isDarkMode ? '#94A3B8' : '#64748B' },
        ]}
      >
        {messageResultImc}
      </Text>
      <Text
        style={[
          styles.numberImc,
          { color: isDarkMode ? '#FF3767' : '#FF0043' },
        ]}
      >
        {resultImc}
      </Text>
      {classification ? (
        <View
          style={[
            styles.badge,
            { backgroundColor: isDarkMode ? '#3B0715' : '#FFE4E6' },
          ]}
        >
          <Text
            style={[
              styles.classificationText,
              { color: isDarkMode ? '#FDA4AF' : '#E11D48' },
            ]}
          >
            {classification}
          </Text>
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
    fontWeight: 'bold',
  },
  numberImc: {
    fontSize: 42,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 4,
  },
  classificationText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
