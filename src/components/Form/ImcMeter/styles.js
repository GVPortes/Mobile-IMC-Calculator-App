import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled(Animated.View)`
  width: 100%;
  border-radius: 16px;
  padding: 16px;
  margin-top: 18px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.card};
  border-color: ${({ theme }) => theme.colors.border};
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PointerArea = styled.View`
  height: 38px;
  width: 100%;
  position: relative;
  justify-content: flex-end;
`;

export const PointerWrapper = styled(Animated.View)`
  position: absolute;
  align-items: center;
  width: 40px;
  bottom: 0;
`;

export const PointerBubble = styled.View`
  padding-horizontal: 7px;
  padding-vertical: 3px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 3px;
  elevation: 3;
  background-color: ${({ theme }) => theme.colors.pointerBubbleBg};
`;

export const PointerValue = styled.Text`
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.pointerBubbleText};
`;

export const PointerArrow = styled.Text`
  font-size: 9px;
  margin-top: -2px;
  line-height: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const MeterBar = styled.View`
  flex-direction: row;
  height: 12px;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 2px;
`;

export const Segment = styled.View`
  flex: 1;
  height: 100%;
  background-color: ${({ color }) => color};
`;

export const LabelsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export const LabelText = styled.Text`
  flex: 1;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ThresholdRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 4px;
  padding-horizontal: 25px;
`;

export const ThresholdText = styled.Text`
  font-size: 10px;
  font-weight: 500;
  opacity: 0.7;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
