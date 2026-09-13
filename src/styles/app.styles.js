import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: 40px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 20px;
  margin-bottom: 10px;
`;

export const TitleWrapper = styled.View`
  flex: 1;
`;

export const ThemeButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.themeBtnBg};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const ThemeIcon = styled(Animated.Text)`
  font-size: 16px;
  margin-right: 6px;
`;

export const ThemeText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.themeBtnText};
`;
