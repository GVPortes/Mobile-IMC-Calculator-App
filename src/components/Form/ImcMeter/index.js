import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import {
  Container,
  Title,
  PointerArea,
  PointerWrapper,
  PointerBubble,
  PointerValue,
  PointerArrow,
  MeterBar,
  Segment,
  LabelsRow,
  LabelText,
  ThresholdRow,
  ThresholdText,
} from './styles';

export default function ImcMeter({ imc }) {
  const animatedPosition = useRef(new Animated.Value(0)).current;
  const containerFade = useRef(new Animated.Value(0)).current;
  const containerSlide = useRef(new Animated.Value(15)).current;

  // Calcula a porcentagem [0, 100] mapeada nos 4 blocos de 25% cada
  const calculatePercentage = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return 0;

    let pct = 0;
    if (num < 18.5) {
      // Bloco 1: [0% a 25%] - mapeia de 12 a 18.5
      const clamped = Math.max(12, num);
      pct = ((clamped - 12) / (18.5 - 12)) * 25;
    } else if (num < 25) {
      // Bloco 2: [25% a 50%] - mapeia de 18.5 a 25
      pct = 25 + ((num - 18.5) / (25 - 18.5)) * 25;
    } else if (num < 30) {
      // Bloco 3: [50% a 75%] - mapeia de 25 a 30
      pct = 50 + ((num - 25) / (30 - 25)) * 25;
    } else {
      // Bloco 4: [75% a 100%] - mapeia de 30 a 40
      const clamped = Math.min(40, num);
      pct = 75 + ((clamped - 30) / (40 - 30)) * 25;
    }

    return Math.min(Math.max(pct, 2), 98); // Margem para o ponteiro não vazar
  };

  const targetPercentage = calculatePercentage(imc);

  useEffect(() => {
    // Animação de entrada do container
    containerFade.setValue(0);
    containerSlide.setValue(15);

    Animated.parallel([
      Animated.timing(containerFade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(containerSlide, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.spring(animatedPosition, {
        toValue: targetPercentage,
        friction: 5,
        tension: 35,
        useNativeDriver: false,
      }),
    ]).start();
  }, [targetPercentage]);

  const leftInterpolate = animatedPosition.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Container
      style={{
        opacity: containerFade,
        transform: [{ translateY: containerSlide }],
      }}
    >
      <Title>Medidor Visual do IMC</Title>

      {/* Área do Ponteiro Animado */}
      <PointerArea>
        <PointerWrapper
          style={{
            left: leftInterpolate,
            transform: [{ translateX: -20 }],
          }}
        >
          <PointerBubble>
            <PointerValue>{imc}</PointerValue>
          </PointerBubble>
          <PointerArrow>▼</PointerArrow>
        </PointerWrapper>
      </PointerArea>

      {/* Barra de Cores Segmentada */}
      <MeterBar>
        <Segment color="#3B82F6" />
        <Segment color="#10B981" />
        <Segment color="#F59E0B" />
        <Segment color="#EF4444" />
      </MeterBar>

      {/* Legendas das Faixas */}
      <LabelsRow>
        <LabelText>Abaixo</LabelText>
        <LabelText>Normal</LabelText>
        <LabelText>Sobrepeso</LabelText>
        <LabelText>Obesidade</LabelText>
      </LabelsRow>

      {/* Marcadores Numéricos de Fronteira */}
      <ThresholdRow>
        <ThresholdText>18.5</ThresholdText>
        <ThresholdText>25.0</ThresholdText>
        <ThresholdText>30.0</ThresholdText>
      </ThresholdRow>
    </Container>
  );
}
