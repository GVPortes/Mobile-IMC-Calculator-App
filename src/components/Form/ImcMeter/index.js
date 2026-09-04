import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function ImcMeter({ imc, isDarkMode }) {
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

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
    },
    title: {
      color: isDarkMode ? '#F8FAFC' : '#1E293B',
    },
    label: {
      color: isDarkMode ? '#94A3B8' : '#64748B',
    },
    trackBg: {
      backgroundColor: isDarkMode ? '#1E293B' : '#E2E8F0',
    },
    pointerText: {
      color: isDarkMode ? '#0F172A' : '#FFFFFF',
      backgroundColor: isDarkMode ? '#F8FAFC' : '#0F172A',
    },
  };

  return (
    <Animated.View
      style={[
        styles.container,
        dynamicStyles.container,
        {
          opacity: containerFade,
          transform: [{ translateY: containerSlide }],
        },
      ]}
    >
      <Text style={[styles.title, dynamicStyles.title]}>
        Medidor Visual do IMC
      </Text>

      {/* Área do Ponteiro Animado */}
      <View style={styles.pointerArea}>
        <Animated.View
          style={[
            styles.pointerWrapper,
            { left: leftInterpolate, transform: [{ translateX: -20 }] },
          ]}
        >
          <View style={[styles.pointerBubble, dynamicStyles.pointerText]}>
            <Text
              style={[
                styles.pointerValue,
                { color: isDarkMode ? '#0F172A' : '#FFFFFF' },
              ]}
            >
              {imc}
            </Text>
          </View>
          <Text
            style={[
              styles.pointerArrow,
              { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
            ]}
          >
            ▼
          </Text>
        </Animated.View>
      </View>

      {/* Barra de Cores Segmentada */}
      <View style={styles.meterBar}>
        <View style={[styles.segment, styles.underweight]} />
        <View style={[styles.segment, styles.normal]} />
        <View style={[styles.segment, styles.overweight]} />
        <View style={[styles.segment, styles.obese]} />
      </View>

      {/* Legendas das Faixas */}
      <View style={styles.labelsRow}>
        <Text style={[styles.labelText, dynamicStyles.label]}>Abaixo</Text>
        <Text style={[styles.labelText, dynamicStyles.label]}>Normal</Text>
        <Text style={[styles.labelText, dynamicStyles.label]}>Sobrepeso</Text>
        <Text style={[styles.labelText, dynamicStyles.label]}>Obesidade</Text>
      </View>

      {/* Marcadores Numéricos de Fronteira */}
      <View style={styles.thresholdRow}>
        <Text style={[styles.thresholdText, dynamicStyles.label]}>18.5</Text>
        <Text style={[styles.thresholdText, dynamicStyles.label]}>25.0</Text>
        <Text style={[styles.thresholdText, dynamicStyles.label]}>30.0</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
    borderWidth: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  pointerArea: {
    height: 38,
    width: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  pointerWrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: 40,
    bottom: 0,
  },
  pointerBubble: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  pointerValue: {
    fontSize: 12,
    fontWeight: '800',
  },
  pointerArrow: {
    fontSize: 9,
    marginTop: -2,
    lineHeight: 10,
  },
  meterBar: {
    flexDirection: 'row',
    height: 12,
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 2,
  },
  segment: {
    flex: 1,
    height: '100%',
  },
  underweight: {
    backgroundColor: '#3B82F6', // Azul
  },
  normal: {
    backgroundColor: '#10B981', // Verde
  },
  overweight: {
    backgroundColor: '#F59E0B', // Amarelo/Laranja
  },
  obese: {
    backgroundColor: '#EF4444', // Vermelho
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  labelText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  thresholdRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
    paddingHorizontal: 25,
  },
  thresholdText: {
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.7,
  },
});
