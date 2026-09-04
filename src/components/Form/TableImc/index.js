import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TableImc({ isDarkMode, currentClassification }) {
  const tableData = [
    {
      range: 'Menor que 18,5',
      classification: 'Abaixo do peso',
      color: '#3B82F6',
    },
    {
      range: '18,5 a 24,9',
      classification: 'Peso normal',
      color: '#10B981',
    },
    {
      range: '25,0 a 29,9',
      classification: 'Sobrepeso',
      color: '#F59E0B',
    },
    {
      range: '30,0 a 34,9',
      classification: 'Obesidade Grau I',
      color: '#EA580C',
    },
    {
      range: 'Maior que 35,0',
      classification: 'Obesidade Grau II / III',
      color: '#EF4444',
    },
  ];

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
    },
    title: {
      color: isDarkMode ? '#F8FAFC' : '#1E293B',
    },
    borderRow: {
      borderBottomColor: isDarkMode ? '#1E293B' : '#E2E8F0',
    },
    label: {
      color: isDarkMode ? '#94A3B8' : '#64748B',
    },
  };

  return (
    <View style={[styles.tableContainer, dynamicStyles.container]}>
      <Text style={[styles.tableTitle, dynamicStyles.title]}>
        Tabela de Classificação
      </Text>

      {tableData.map((item, index) => {
        const isSelected =
          currentClassification &&
          (currentClassification === item.classification ||
            (currentClassification.startsWith('Obesidade') &&
              item.classification.startsWith('Obesidade')));

        return (
          <View
            key={index}
            style={[
              styles.tableRow,
              dynamicStyles.borderRow,
              index === tableData.length - 1 && styles.lastRow,
              isSelected && {
                backgroundColor: isDarkMode ? '#1E293B' : '#EDF2F7',
                borderRadius: 8,
                paddingHorizontal: 8,
              },
            ]}
          >
            <Text
              style={[
                styles.tableLabel,
                dynamicStyles.label,
                isSelected && { fontWeight: '700' },
              ]}
            >
              {isSelected ? `👉 ${item.range}` : item.range}
            </Text>
            <Text style={[styles.tableValue, { color: item.color }]}>
              {item.classification}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    marginBottom: 30,
    borderWidth: 1,
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
  },
  lastRow: {
    borderBottomWidth: 0,
    paddingBottom: 2,
  },
  tableLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  tableValue: {
    fontSize: 13,
    fontWeight: '700',
  },
});
