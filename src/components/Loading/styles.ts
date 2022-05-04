import { Text, View } from "react-native";
import normalize from "react-native-normalize";
import styled from "styled-components";

export const Container = styled(View)`
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(1, 1, 1, .67);
  height: 100%;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const WhiteBox = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #ececec;
  height: ${normalize(90, 'height')}px;
  width: ${normalize(200, 'width')}px;
`;

export const LoadingText = styled(Text)`
  color: #3d3d3d;
  font-size: 20px;
  margin-top: 15px;
`;
