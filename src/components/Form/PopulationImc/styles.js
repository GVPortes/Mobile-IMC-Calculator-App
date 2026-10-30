import styled from 'styled-components/native';

export const PopulationContainer = styled.View`
  width: 100%;
  align-items: center;
  border-radius: 16px;
  padding: 16px;
  margin-top: 24px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.card};
  border-color: ${({ theme }) => theme.colors.border};
`;

export const PopulationLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const PopulationPercentage = styled.Text`
  font-size: 32px;
  font-weight: 800;
  margin-vertical: 2px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const PopulationDescription = styled.Text`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PopulationSource = styled.Text`
  font-size: 11px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const RetryButton = styled.TouchableOpacity`
  padding-vertical: 8px;
  margin-top: 4px;
`;

export const RetryButtonText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;
