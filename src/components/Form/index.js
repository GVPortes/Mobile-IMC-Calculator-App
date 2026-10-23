import React, { useState, useRef } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  Vibration,
  Animated,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import ResultImc from './ResultImc';
import TableImc from './TableImc';
import ImcMeter from './ImcMeter';
import HistoryImc from './HistoryImc';
import Storage from '../../db/storage';

const storage = new Storage();
import {
  FormContext,
  FormScrollView,
  FormContainer,
  FieldGroup,
  LabelRow,
  FormLabel,
  ErrorMessage,
  StyledInput,
  ErrorBanner,
  ErrorBannerIcon,
  ErrorBannerText,
  ButtonCalculatorWrapper,
  ButtonCalculator,
  TextButtonCalculator,
  ButtonReset,
  TextButtonReset,
} from './styles';

export default function Form() {
  const theme = useTheme();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [messageImc, setMessageImc] = useState('Preencha o peso e altura');
  const [imc, setImc] = useState(null);
  const [classification, setClassification] = useState('');
  const [textButton, setTextButton] = useState('Calcular');

  // Estados de validação estilizada
  const [errorMessageHeight, setErrorMessageHeight] = useState(null);
  const [errorMessageWeight, setErrorMessageWeight] = useState(null);
  const [generalError, setGeneralError] = useState(null);

  // Animações
  const scaleButton = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const triggerShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
    ]).start();
  };

  function calculateImcClassification(imcValue) {
    if (imcValue < 18.5) {
      return 'Abaixo do peso';
    } else if (imcValue < 25) {
      return 'Peso normal';
    } else if (imcValue < 30) {
      return 'Sobrepeso';
    } else if (imcValue < 35) {
      return 'Obesidade Grau I';
    } else {
      return 'Obesidade Grau II / III';
    }
  }

  function imcCalculator() {
    Keyboard.dismiss();

    const cleanWeight = weight.replace(',', '.').trim();
    const cleanHeight = height.replace(',', '.').trim();

    let hasError = false;

    if (!cleanHeight) {
      setErrorMessageHeight('campo obrigatório*');
      hasError = true;
    } else {
      setErrorMessageHeight(null);
    }

    if (!cleanWeight) {
      setErrorMessageWeight('campo obrigatório*');
      hasError = true;
    } else {
      setErrorMessageWeight(null);
    }

    if (hasError) {
      Vibration.vibrate(200);
      triggerShake();
      setGeneralError('Por favor, preencha os campos obrigatórios.');
      setImc(null);
      setClassification('');
      setTextButton('Calcular');
      setMessageImc('Preencha o peso e altura');
      return;
    }

    const numWeight = parseFloat(cleanWeight);
    let numHeight = parseFloat(cleanHeight);

    if (isNaN(numWeight) || isNaN(numHeight) || numWeight <= 0 || numHeight <= 0) {
      Vibration.vibrate(200);
      triggerShake();
      setGeneralError('Insira valores numéricos válidos maiores que zero.');
      setImc(null);
      return;
    }

    // Limpa erros caso passe na validação
    setGeneralError(null);
    setErrorMessageHeight(null);
    setErrorMessageWeight(null);

    // Converte cm para metros se o usuário digitar ex: 175
    if (numHeight > 3) {
      numHeight = numHeight / 100;
    }

    const calculatedImc = numWeight / (numHeight * numHeight);
    const formattedImc = calculatedImc.toFixed(2);

    setImc(formattedImc);
    setClassification(calculateImcClassification(calculatedImc));
    setMessageImc('Seu IMC é igual a:');
    setTextButton('Calcular Novamente');

    console.log('IMC calculado:', formattedImc);
    // Salva o cálculo no banco Firestore
    storage.add({
      resultado: formattedImc,
    });
  }

  function handleReset() {
    setWeight('');
    setHeight('');
    setImc(null);
    setClassification('');
    setMessageImc('Preencha o peso e altura');
    setTextButton('Calcular');
    setErrorMessageHeight(null);
    setErrorMessageWeight(null);
    setGeneralError(null);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FormContext>
        <FormScrollView>
          <FormContainer>
            {/* Campo Altura */}
            <FieldGroup>
              <LabelRow>
                <FormLabel>Altura</FormLabel>
                {errorMessageHeight && (
                  <ErrorMessage>{errorMessageHeight}</ErrorMessage>
                )}
              </LabelRow>
              <StyledInput
                hasError={!!errorMessageHeight}
                onChangeText={(text) => {
                  setHeight(text);
                  if (errorMessageHeight) setErrorMessageHeight(null);
                  if (generalError) setGeneralError(null);
                }}
                value={height}
                placeholder="Ex. 1.75 ou 175 cm"
                placeholderTextColor={theme.colors.placeholder}
                keyboardType="numeric"
              />
            </FieldGroup>

            {/* Campo Peso */}
            <FieldGroup>
              <LabelRow>
                <FormLabel>Peso</FormLabel>
                {errorMessageWeight && (
                  <ErrorMessage>{errorMessageWeight}</ErrorMessage>
                )}
              </LabelRow>
              <StyledInput
                hasError={!!errorMessageWeight}
                onChangeText={(text) => {
                  setWeight(text);
                  if (errorMessageWeight) setErrorMessageWeight(null);
                  if (generalError) setGeneralError(null);
                }}
                value={weight}
                placeholder="Ex. 75.3"
                placeholderTextColor={theme.colors.placeholder}
                keyboardType="numeric"
              />
            </FieldGroup>

            {/* Alerta Estilizado com Animação Shake */}
            {generalError && (
              <ErrorBanner style={{ transform: [{ translateX: shakeAnim }] }}>
                <ErrorBannerIcon>⚠️</ErrorBannerIcon>
                <ErrorBannerText>{generalError}</ErrorBannerText>
              </ErrorBanner>
            )}

            {/* Botão de Ação com Microinteração Tátil (Scale Bounce) */}
            <ButtonCalculatorWrapper style={{ transform: [{ scale: scaleButton }] }}>
              <ButtonCalculator
                onPress={imcCalculator}
                onPressIn={() =>
                  Animated.spring(scaleButton, {
                    toValue: 0.95,
                    useNativeDriver: true,
                  }).start()
                }
                onPressOut={() =>
                  Animated.spring(scaleButton, {
                    toValue: 1,
                    friction: 4,
                    tension: 40,
                    useNativeDriver: true,
                  }).start()
                }
                activeOpacity={0.9}
              >
                <TextButtonCalculator>{textButton}</TextButtonCalculator>
              </ButtonCalculator>
            </ButtonCalculatorWrapper>

            {/* Botão de Limpar */}
            {(imc || weight || height || generalError) && (
              <ButtonReset onPress={handleReset} activeOpacity={0.7}>
                <TextButtonReset>Limpar</TextButtonReset>
              </ButtonReset>
            )}

            {/* Resultado com Animação Fluida */}
            <ResultImc
              messageResultImc={messageImc}
              resultImc={imc}
              classification={classification}
            />

            {/* Medidor Visual do IMC */}
            {imc && <ImcMeter imc={imc} />}

            {/* Tabela de Referência */}
            <TableImc currentClassification={classification} />

            {/* Histórico do Firebase */}
            <HistoryImc />
          </FormContainer>
        </FormScrollView>
      </FormContext>
    </TouchableWithoutFeedback>
  );
}
