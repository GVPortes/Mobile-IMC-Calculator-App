import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { getPopulationBySex } from '../../../services/worldBank';
import {
  PopulationContainer,
  PopulationLabel,
  PopulationPercentage,
  PopulationDescription,
  PopulationSource,
  RetryButton,
  RetryButtonText,
} from './styles';

const POPULATION_NAMES = {
  feminino: 'das mulheres adultas brasileiras',
  masculino: 'dos homens adultos brasileiros',
};

// A API não separa quem está abaixo do peso, por isso a primeira faixa vai até 25
function getRange(imc) {
  if (imc < 25) {
    return { key: 'normal', description: 'têm IMC abaixo de 25' };
  } else if (imc < 30) {
    return { key: 'overweight', description: 'têm IMC entre 25 e 29,9' };
  } else {
    return { key: 'obese', description: 'têm IMC de 30 ou mais' };
  }
}

export default function PopulationImc({ imc, sex }) {
  const theme = useTheme();
  const [population, setPopulation] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // Evita que uma resposta atrasada sobrescreva a do sexo selecionado agora
    let ignore = false;

    setPopulation(null);
    setHasError(false);

    getPopulationBySex(sex)
      .then((data) => {
        if (!ignore) setPopulation(data);
      })
      .catch((error) => {
        console.log('Erro ao buscar dados do Banco Mundial:', error);
        if (!ignore) setHasError(true);
      });

    return () => {
      ignore = true;
    };
  }, [sex, attempt]);

  if (hasError) {
    return (
      <PopulationContainer>
        <PopulationDescription>
          Não foi possível buscar os dados da população.
        </PopulationDescription>
        <RetryButton onPress={() => setAttempt(attempt + 1)} activeOpacity={0.7}>
          <RetryButtonText>Tentar novamente</RetryButtonText>
        </RetryButton>
      </PopulationContainer>
    );
  }

  if (!population) {
    return (
      <PopulationContainer>
        <ActivityIndicator color={theme.colors.primary} />
      </PopulationContainer>
    );
  }

  const range = getRange(parseFloat(imc));
  const percentage = population[range.key].toFixed(1).replace('.', ',');

  return (
    <PopulationContainer>
      <PopulationLabel>Você se encaixa nos</PopulationLabel>
      <PopulationPercentage>{percentage}%</PopulationPercentage>
      <PopulationDescription>
        {POPULATION_NAMES[sex]} que {range.description}
      </PopulationDescription>
      <PopulationSource>Fonte: Banco Mundial, dados de 2022</PopulationSource>
    </PopulationContainer>
  );
}
