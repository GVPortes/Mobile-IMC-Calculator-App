import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Animated,
  useColorScheme,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Title from './src/components/Title';
import Form from './src/components/Form';

export default function App() {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleTheme = () => {
    // Animação de rotação suave no ícone do tema
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();

    setIsDarkMode((prev) => !prev);
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#0F172A' : '#E0E5EB' },
      ]}
    >
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      {/* Barra Superior com Título e Botão de Dark Mode */}
      <View style={styles.topBar}>
        <View style={styles.titleWrapper}>
          <Title isDarkMode={isDarkMode} />
        </View>

        <TouchableOpacity
          style={[
            styles.themeButton,
            { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' },
          ]}
          onPress={toggleTheme}
          activeOpacity={0.8}
        >
          <Animated.Text
            style={[styles.themeIcon, { transform: [{ rotate: spin }] }]}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </Animated.Text>
          <Text
            style={[
              styles.themeText,
              { color: isDarkMode ? '#F8FAFC' : '#0F172A' },
            ]}
          >
            {isDarkMode ? 'Claro' : 'Escuro'}
          </Text>
        </TouchableOpacity>
      </View>

      <Form isDarkMode={isDarkMode} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  titleWrapper: {
    flex: 1,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  themeIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  themeText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
