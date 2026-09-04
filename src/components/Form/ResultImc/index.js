import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function ResultImc({
  messageResultImc,
  resultImc,
  classification,
  isDarkMode,
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
    <Animated.View
      style={[
        styles.resultContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
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
    </Animated.View>
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
    fontSize: 44,
    fontWeight: '800',
    marginVertical: 4,
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
