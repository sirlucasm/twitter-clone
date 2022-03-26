import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import normalize from 'react-native-normalize';

export default function SignUp() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: normalize(40, 'width'),
    paddingTop: 60,
  },
});
