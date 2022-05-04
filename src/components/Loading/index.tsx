import { ActivityIndicator, Text } from "react-native";
import { Container, WhiteBox, LoadingText } from "./styles";

const Loading = () => {
  return (
    <Container>
      <WhiteBox>
        <ActivityIndicator
          color="#3495eb"
          size={48}
        />
        <LoadingText>Carregando...</LoadingText>
      </WhiteBox>
    </Container>
  );
}

export default Loading;
