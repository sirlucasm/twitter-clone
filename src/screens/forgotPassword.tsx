import { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, } from 'react-native';
import { Button, Input } from 'react-native-elements';
import normalize from 'react-native-normalize';
import UserService from '../api/services/UserService';
import { useAuth } from '../contexts/Auth';

export default function ForgotPassword({ navigation }: any) {
  const { setIsLoading } = useAuth();
  const [email, setEmail] = useState<string>('');

  const isValidEmail = (val: string) => /[A-Z0-9]+@[A-Z]+\.[A-Z]+/gi.test(val);

  const handleSubmit = () => {
    if (!isValidEmail(email))  return;
    setIsLoading(true);
    UserService.sendForgotPasswordEmail(email)
      .then(() => navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] }))
      .finally(() => setIsLoading(false));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require('../../assets/icons/twitter-icon.png')} style={styles.iconImg}/>
      </View>
      <View style={styles.formArea}>
        <View style={styles.titleArea}>
          <Text style={styles.titleText}>Esqueci minha senha</Text>
        </View>
        <Input
          placeholder='E-mail'
          leftIcon={{ type: 'ionicon', name: 'mail-outline' }}
          onChangeText={(e: string) => setEmail(e)}
        />
        <Button
          onPress={() => handleSubmit()}
          title='Enviar'
          buttonStyle={styles.formBtn}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: normalize(40, 'width'),
    paddingTop: 60,
  },
  iconImg: {
    width: 28,
    height: 28,
  },
  titleArea: {
    marginTop: normalize(90, 'height'),
    marginBottom: normalize(40, 'height'),
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  titleText: {
    fontSize: 28,
  },
  formArea: {
    width: normalize(330, 'width'),
  },
  formBtnArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  formBtn: {
    backgroundColor: '#1da1f2',
    paddingHorizontal: 14,
  },
});
