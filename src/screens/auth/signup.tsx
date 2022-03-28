import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import normalize from 'react-native-normalize';
import { Formik } from 'formik';
import { Input, Button } from 'react-native-elements';

export default function SignUp() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require('../../../assets/icons/twitter-icon.png')} style={styles.iconImg}/>
      </View>
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>Criar conta no Twitter</Text>
      </View>
      <View style={styles.formArea}>
        <Formik
          initialValues={{ name: '', username: '', email: '', password: '' }}
          onSubmit={values => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Input
                placeholder='Nome'
                leftIcon={{ type: 'ionicon', name: 'person-outline' }}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <Input
                placeholder='Usuário'
                leftIcon={{ type: 'ionicon', name: 'person-outline' }}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              <Input
                placeholder='Email'
                leftIcon={{ type: 'ionicon', name: 'mail-outline' }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
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
                <View></View>
                <Button
                  onPress={handleSubmit}
                  title='Criar conta'
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
