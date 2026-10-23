import styled from 'styled-components/native';

export const HistoryContainer = styled.View`
  width: 100%;
  border-radius: 16px;
  padding: 16px;
  margin-top: 10px;
  margin-bottom: 40px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.card};
  border-color: ${({ theme }) => theme.colors.border};
`;

export const HistoryHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

export const HistoryTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const HistoryBadgeCount = styled.View`
  background-color: ${({ theme }) => theme.colors.tableRowHighlight || theme.colors.border};
  padding-horizontal: 10px;
  padding-vertical: 3px;
  border-radius: 12px;
`;

export const HistoryBadgeText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const EmptyHistoryText = styled.Text`
  font-size: 13px;
  text-align: center;
  padding-vertical: 20px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const HistoryItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 12px;
  border-bottom-width: ${({ isLast }) => (isLast ? '0px' : '1px')};
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const HistoryInfo = styled.View`
  flex: 1;
`;

export const HistoryDate = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 4px;
`;

export const HistoryResultRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HistoryResultLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-right: 8px;
`;

export const HistoryResultValue = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: ${({ color }) => color || '#FF0043'};
`;

export const HistoryClassificationBadge = styled.View`
  background-color: ${({ color }) => `${color}20`};
  padding-horizontal: 8px;
  padding-vertical: 2px;
  border-radius: 6px;
  margin-left: 8px;
`;

export const HistoryClassificationText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${({ color }) => color};
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 8px;
  margin-left: 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.errorBg || '#FEE2E2'};
`;

export const DeleteIcon = styled.Text`
  font-size: 14px;
`;
