import { View } from "react-native";
import normalize from "react-native-normalize";
import styled from "styled-components";

export const Container = styled(View)`
  flex: 1;
  background-color: #fff;
  padding-left: ${normalize(10, 'width')}px;
  padding-right: ${normalize(10, 'width')}px;
  padding-top: 40px;
`;

export const Header = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #ececec;
`;
