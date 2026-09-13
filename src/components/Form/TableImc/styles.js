import styled from 'styled-components/native';

export const TableContainer = styled.View`
  width: 100%;
  border-radius: 16px;
  padding: 16px;
  margin-top: 24px;
  margin-bottom: 30px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.card};
  border-color: ${({ theme }) => theme.colors.border};
`;

export const TableTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TableRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
  border-bottom-width: ${({ isLast }) => (isLast ? '0px' : '1px')};
  border-bottom-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.tableRowHighlight : 'transparent'};
  border-radius: ${({ isSelected }) => (isSelected ? '8px' : '0px')};
  padding-horizontal: ${({ isSelected }) => (isSelected ? '8px' : '0px')};
`;

export const TableLabel = styled.Text`
  font-size: 13px;
  font-weight: ${({ isSelected }) => (isSelected ? '700' : '500')};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TableValue = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: ${({ color }) => color};
`;
