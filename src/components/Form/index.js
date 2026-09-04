import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Vibration,
} from 'react-native';
import ResultImc from './ResultImc';
import TableImc from './TableImc';

export default function Form({ isDarkMode }) {
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

  const dynamicStyles = {
    formContext: {
      backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
    },
    label: {
      color: isDarkMode ? '#F8FAFC' : '#0F172A',
    },
    input: {
      backgroundColor: isDarkMode ? '#0F172A' : '#F1F5F9',
      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
      color: isDarkMode ? '#F8FAFC' : '#1E293B',
    },
    inputError: {
      borderColor: '#EF4444',
      borderWidth: 1.5,
      backgroundColor: isDarkMode ? '#281318' : '#FFF5F5',
    },
    bannerError: {
      backgroundColor: isDarkMode ? '#3B1219' : '#FEE2E2',
      borderColor: isDarkMode ? '#881337' : '#FCA5A5',
    },
    bannerText: {
      color: isDarkMode ? '#FECDD3' : '#B91C1C',
    },
    resetText: {
      color: isDarkMode ? '#94A3B8' : '#64748B',
    },
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.formContext, dynamicStyles.formContext]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            {/* Campo Altura */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={[styles.formLabel, dynamicStyles.label]}>Altura</Text>
                {errorMessageHeight && (
                  <Text style={styles.errorMessage}>{errorMessageHeight}</Text>
                )}
              </View>
              <TextInput
                style={[
                  styles.input,
                  dynamicStyles.input,
                  errorMessageHeight && dynamicStyles.inputError,
                ]}
                onChangeText={(text) => {
                  setHeight(text);
                  if (errorMessageHeight) setErrorMessageHeight(null);
                  if (generalError) setGeneralError(null);
                }}
                value={height}
                placeholder="Ex. 1.75 ou 175 cm"
                placeholderTextColor={isDarkMode ? '#64748B' : '#A0AEC0'}
                keyboardType="numeric"
              />
            </View>

            {/* Campo Peso */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={[styles.formLabel, dynamicStyles.label]}>Peso</Text>
                {errorMessageWeight && (
                  <Text style={styles.errorMessage}>{errorMessageWeight}</Text>
                )}
              </View>
              <TextInput
                style={[
                  styles.input,
                  dynamicStyles.input,
                  errorMessageWeight && dynamicStyles.inputError,
                ]}
                onChangeText={(text) => {
                  setWeight(text);
                  if (errorMessageWeight) setErrorMessageWeight(null);
                  if (generalError) setGeneralError(null);
                }}
                value={weight}
                placeholder="Ex. 75.3"
                placeholderTextColor={isDarkMode ? '#64748B' : '#A0AEC0'}
                keyboardType="numeric"
              />
            </View>

            {/* Alerta Estilizado Geral */}
            {generalError && (
              <View style={[styles.errorBanner, dynamicStyles.bannerError]}>
                <Text style={styles.errorBannerIcon}>⚠️</Text>
                <Text style={[styles.errorBannerText, dynamicStyles.bannerText]}>
                  {generalError}
                </Text>
              </View>
            )}

            {/* Botão de Ação */}
            <TouchableOpacity
              style={styles.buttonCalculator}
              onPress={imcCalculator}
              activeOpacity={0.8}
            >
              <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>

            {/* Botão de Limpar */}
            {(imc || weight || height || generalError) && (
              <TouchableOpacity
                style={styles.buttonReset}
                onPress={handleReset}
                activeOpacity={0.7}
              >
                <Text style={[styles.textButtonReset, dynamicStyles.resetText]}>
                  Limpar
                </Text>
              </TouchableOpacity>
            )}

            {/* Resultado */}
            <ResultImc
              messageResultImc={messageImc}
              resultImc={imc}
              classification={classification}
              isDarkMode={isDarkMode}
            />

            {/* Tabela de Referência */}
            <TableImc
              isDarkMode={isDarkMode}
              currentClassification={classification}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  formContext: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    overflow: 'hidden',
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  form: {
    width: '100%',
    paddingHorizontal: 25,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorMessage: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '700',
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
  },
  errorBannerIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  errorBannerText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  buttonCalculator: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FF0043',
    paddingVertical: 14,
    marginTop: 4,
    shadowColor: '#FF0043',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  textButtonCalculator: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonReset: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 6,
  },
  textButtonReset: {
    fontSize: 14,
    fontWeight: '600',
  },
});
