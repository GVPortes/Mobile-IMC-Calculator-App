import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Storage from '../../../db/storage';
import {
  HistoryContainer,
  HistoryHeader,
  HistoryTitle,
  HistoryBadgeCount,
  HistoryBadgeText,
  EmptyHistoryText,
  HistoryItem,
  HistoryInfo,
  HistoryDate,
  HistoryResultRow,
  HistoryResultLabel,
  HistoryResultValue,
  HistoryClassificationBadge,
  HistoryClassificationText,
  DeleteButton,
  DeleteIcon,
} from './styles';

const storage = new Storage();

function getClassificationInfo(imcValue) {
  const val = parseFloat(String(imcValue).replace(',', '.'));
  if (isNaN(val)) {
    return { text: '', color: '#94A3B8' };
  }
  if (val < 18.5) {
    return { text: 'Abaixo do peso', color: '#3B82F6' };
  } else if (val < 25) {
    return { text: 'Peso normal', color: '#10B981' };
  } else if (val < 30) {
    return { text: 'Sobrepeso', color: '#F59E0B' };
  } else if (val < 35) {
    return { text: 'Obesidade I', color: '#EA580C' };
  } else {
    return { text: 'Obesidade II/III', color: '#EF4444' };
  }
}

export default function HistoryImc() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const unsubscribe = storage.listContents((data) => {
      // Ordena pelos mais recentes primeiro
      const sorted = [...data].reverse();
      setHistory(sorted);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Excluir registro',
      'Deseja realmente excluir este cálculo do histórico?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => storage.deleteContent(id),
        },
      ]
    );
  };

  return (
    <HistoryContainer>
      <HistoryHeader>
        <HistoryTitle>Histórico de Cálculos</HistoryTitle>
        <HistoryBadgeCount>
          <HistoryBadgeText>{history.length}</HistoryBadgeText>
        </HistoryBadgeCount>
      </HistoryHeader>

      {history.length === 0 ? (
        <EmptyHistoryText>
          Nenhum registro encontrado. Realize um cálculo acima para salvar no histórico!
        </EmptyHistoryText>
      ) : (
        history.map((item, index) => {
          const classInfo = getClassificationInfo(item.resultado);
          return (
            <HistoryItem
              key={item.id || index}
              isLast={index === history.length - 1}
            >
              <HistoryInfo>
                <HistoryDate>📅 {item.data || 'Sem data'}</HistoryDate>
                <HistoryResultRow>
                  <HistoryResultLabel>IMC:</HistoryResultLabel>
                  <HistoryResultValue color={classInfo.color}>
                    {item.resultado}
                  </HistoryResultValue>
                  {classInfo.text ? (
                    <HistoryClassificationBadge color={classInfo.color}>
                      <HistoryClassificationText color={classInfo.color}>
                        {classInfo.text}
                      </HistoryClassificationText>
                    </HistoryClassificationBadge>
                  ) : null}
                </HistoryResultRow>
              </HistoryInfo>

              <DeleteButton
                onPress={() => handleDelete(item.id)}
                activeOpacity={0.7}
              >
                <DeleteIcon>🗑️</DeleteIcon>
              </DeleteButton>
            </HistoryItem>
          );
        })
      )}
    </HistoryContainer>
  );
}
