import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import {
  ResultContainer,
  InformationText,
  NumberImcText,
  ClassificationBadge,
  ClassificationText,
} from './styles';

export default function ResultImc({
  messageResultImc,
  resultImc,
  classification,
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    if (resultImc) {
      // Reinicia os valores para cada novo cálculo
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
      scaleAnim.setValue(0.92);

      // Dispara a animação combinada fluida a 60 FPS
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [resultImc]);

  if (!resultImc) return null;

  return (
    <ResultContainer
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <InformationText>{messageResultImc}</InformationText>
      <NumberImcText>{resultImc}</NumberImcText>
      {classification ? (
        <ClassificationBadge>
          <ClassificationText>{classification}</ClassificationText>
        </ClassificationBadge>
      ) : null}
    </ResultContainer>
  );
}
