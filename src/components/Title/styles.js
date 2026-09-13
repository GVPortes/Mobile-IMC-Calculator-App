import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: flex-start;
  justify-content: center;
  padding-vertical: 10px;
`;

export const TitleText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.primary};
`;
