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
  Alert,
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

    if (!cleanWeight || !cleanHeight) {
      setImc(null);
      setClassification('');
      setTextButton('Calcular');
      setMessageImc('Preencha o peso e altura');
      Alert.alert('Atenção', 'Digite seu peso e sua altura');
      return;
    }

    const numWeight = parseFloat(cleanWeight);
    let numHeight = parseFloat(cleanHeight);

    if (isNaN(numWeight) || isNaN(numHeight) || numWeight <= 0 || numHeight <= 0) {
      Alert.alert('Erro', 'Por favor, insira valores válidos.');
      return;
    }

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
            <Text style={[styles.formLabel, dynamicStyles.label]}>Altura</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              onChangeText={setHeight}
              value={height}
              placeholder="Ex. 1.75 ou 175 cm"
              placeholderTextColor={isDarkMode ? '#64748B' : '#A0AEC0'}
              keyboardType="numeric"
            />

            <Text style={[styles.formLabel, dynamicStyles.label]}>Peso</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              onChangeText={setWeight}
              value={weight}
              placeholder="Ex. 75.3"
              placeholderTextColor={isDarkMode ? '#64748B' : '#A0AEC0'}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.buttonCalculator}
              onPress={imcCalculator}
              activeOpacity={0.8}
            >
              <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>

            {imc && (
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

            <ResultImc
              messageResultImc={messageImc}
              resultImc={imc}
              classification={classification}
              isDarkMode={isDarkMode}
            />

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
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 4,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  buttonCalculator: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FF0043',
    paddingVertical: 14,
    marginTop: 10,
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
