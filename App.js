import React, { useState, useRef } from 'react';
import { Animated, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme, darkTheme } from './src/theme';
import Title from './src/components/Title';
import Form from './src/components/Form';
import {
  Container,
  TopBar,
  TitleWrapper,
  ThemeButton,
  ThemeIcon,
  ThemeText,
} from './src/styles/app.styles';

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

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <Container>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />

        {/* Barra Superior com Título e Botão de Dark Mode */}
        <TopBar>
          <TitleWrapper>
            <Title />
          </TitleWrapper>

          <ThemeButton onPress={toggleTheme} activeOpacity={0.8}>
            <ThemeIcon style={{ transform: [{ rotate: spin }] }}>
              {isDarkMode ? '☀️' : '🌙'}
            </ThemeIcon>
            <ThemeText>{isDarkMode ? 'Claro' : 'Escuro'}</ThemeText>
          </ThemeButton>
        </TopBar>

        <Form />
      </Container>
    </ThemeProvider>
  );
}
