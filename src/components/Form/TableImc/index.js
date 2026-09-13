import React from 'react';
import {
  TableContainer,
  TableTitle,
  TableRow,
  TableLabel,
  TableValue,
} from './styles';

export default function TableImc({ currentClassification }) {
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

  return (
    <TableContainer>
      <TableTitle>Tabela de Classificação</TableTitle>

      {tableData.map((item, index) => {
        const isSelected =
          currentClassification &&
          (currentClassification === item.classification ||
            (currentClassification.startsWith('Obesidade') &&
              item.classification.startsWith('Obesidade')));

        return (
          <TableRow
            key={index}
            isLast={index === tableData.length - 1}
            isSelected={isSelected}
          >
            <TableLabel isSelected={isSelected}>
              {isSelected ? `👉 ${item.range}` : item.range}
            </TableLabel>
            <TableValue color={item.color}>
              {item.classification}
            </TableValue>
          </TableRow>
        );
      })}
    </TableContainer>
  );
}
