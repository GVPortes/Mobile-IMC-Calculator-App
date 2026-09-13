import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const ResultContainer = styled(Animated.View)`
  margin-top: 20px;
  align-items: center;
  width: 100%;
`;

export const InformationText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const NumberImcText = styled.Text`
  font-size: 44px;
  font-weight: 800;
  margin-vertical: 4px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ClassificationBadge = styled.View`
  padding-horizontal: 16px;
  padding-vertical: 6px;
  border-radius: 20px;
  margin-top: 4px;
  background-color: ${({ theme }) => theme.colors.primaryBadgeBg};
`;

export const ClassificationText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryBadgeText};
`;
