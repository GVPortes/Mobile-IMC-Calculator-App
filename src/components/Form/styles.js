import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const FormContext = styled.View`
  flex: 1;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const FormScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled',
})`
  width: 100%;
`;

export const FormContainer = styled.View`
  width: 100%;
  padding-horizontal: 25px;
`;

export const FieldGroup = styled.View`
  margin-bottom: 16px;
`;

export const LabelRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  padding-horizontal: 4px;
`;

export const FormLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ErrorMessage = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.error};
`;

export const StyledInput = styled.TextInput`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  padding-horizontal: 16px;
  font-size: 16px;
  border-width: ${({ hasError }) => (hasError ? '1.5px' : '1px')};
  border-color: ${({ hasError, theme }) =>
    hasError ? theme.colors.error : theme.colors.inputBorder};
  background-color: ${({ hasError, theme }) =>
    hasError ? theme.colors.inputErrorBg : theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ErrorBanner = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 14px;
  padding-vertical: 10px;
  border-radius: 12px;
  margin-bottom: 14px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.errorBg};
  border-color: ${({ theme }) => theme.colors.errorBorder};
`;

export const ErrorBannerIcon = styled.Text`
  font-size: 16px;
  margin-right: 8px;
`;

export const ErrorBannerText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  flex: 1;
  color: ${({ theme }) => theme.colors.errorText};
`;

export const ButtonCalculatorWrapper = styled(Animated.View)`
  width: 100%;
`;

export const ButtonCalculator = styled.TouchableOpacity`
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-vertical: 14px;
  margin-top: 4px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
  elevation: 4;
`;

export const TextButtonCalculator = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-weight: bold;
`;

export const ButtonReset = styled.TouchableOpacity`
  align-items: center;
  padding-vertical: 10px;
  margin-top: 6px;
`;

export const TextButtonReset = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
