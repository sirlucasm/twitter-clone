import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import normalize from 'react-native-normalize';
import { Formik } from 'formik';
import { Input, Button } from 'react-native-elements';
import { useAuth } from '../../contexts/Auth';
import { IUserSignIn } from '../../@types/user.types';

export default function SignIn({ navigation }: any) {
  const { signIn } = useAuth();

  const handleSignIn = async (values: IUserSignIn) => {
    await signIn({ identifier: values.identifier, password: values.password });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require('../../../assets/icons/twitter-icon.png')} style={styles.iconImg}/>
      </View>
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>Entrar no Twitter</Text>
      </View>
      <View style={styles.formArea}>
        <Formik
          initialValues={{ identifier: '', password: '' }}
          onSubmit={handleSignIn}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Input
                placeholder='Telefone, Email ou Usuário'
                leftIcon={{ type: 'ionicon', name: 'person-outline' }}
                onChangeText={handleChange('identifier')}
                onBlur={handleBlur('identifier')}
                value={values.identifier}
              />
              <Input
                placeholder='Senha'
                leftIcon={{ type: 'ionicon', name: 'lock-closed-outline' }}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <View style={styles.formBtnArea}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text>Esqueceu a senha?</Text>
                </TouchableOpacity>
                <Button
                  onPress={(e: any) => handleSubmit(e)}
                  title='Entrar'
                  buttonStyle={styles.formBtn}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
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
  iconImg: {
    width: 28,
    height: 28,
  },
  titleArea: {
    marginTop: normalize(90, 'height'),
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  titleText: {
    fontSize: 28,
  },
  formArea: {
    marginTop: 60,
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
