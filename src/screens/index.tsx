import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import normalize from 'react-native-normalize';

export default function Welcome({ navigation }: any) {
  const googleLogin = () => alert('google :)');
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assets/icons/twitter-icon.png')} style={styles.iconImg}/>
      </View>
      <View style={styles.titleArea}>
        <Text style={styles.title}>Veja o que está acontecendo no mundo agora.</Text>
      </View>
      <View style={styles.buttonsArea}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.googleBtn}
          onPress={googleLogin}
        >
          <View style={styles.btnFlex}>
            <AntDesign name='google' size={26} color='#3d3d3d'/>
            <View>
              <Text style={styles.googleBtnText}>Continuar com Google</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.dividerArea}>
          <View style={styles.divider} />
          <Text style={{ marginHorizontal: 12, }}>ou</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.blueBtn}
          onPress={() => navigation.navigate('SignUp')}
        >
          <View style={styles.btnFlex}>
            <View>
              <Text style={styles.blueBtnText}>Criar conta</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 12, }}>
        <Text style={styles.noticeText}>
          Ao criar sua conta, você estará concordando com nossos
          <Text style={{ color:'#1da1f2', }}>Termos</Text>,{' '}
          <Text style={{ color:'#1da1f2', }}>Políticas de Privacidade</Text> e{' '}
          <Text style={{ color:'#1da1f2', }}>Uso de Cookies.</Text>
        </Text>
      </View>
      <View style={styles.logInArea}>
        <Text style={styles.logInText}>
          Já possui uma conta?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.logInBtn}>Entrar</Text>
        </TouchableOpacity>
      </View>
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
  titleArea: {
    marginVertical: normalize(160, 'height'),
  },
  title: {
    textAlign: 'center',
    color: '#000',
    fontSize: normalize(28),
    fontWeight: 'bold',
  },
  iconImg: {
    width: 28,
    height: 28,
  },
  buttonsArea: {

  },
  googleBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 50,
    paddingVertical: 12,
    width: normalize(280, 'width'),
  },
  googleBtnText: { fontSize: 16, fontWeight: '700', color: '#3d3d3d', marginLeft: 5, },
  blueBtn: {
    backgroundColor: '#1da1f2',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 50,
    paddingVertical: 14,
    width: normalize(280, 'width'),
  },
  blueBtnText: { fontSize: 16, fontWeight: '700', color: '#f9f9f9', marginLeft: 5, },
  btnFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  divider: {
    backgroundColor: '#d1d1d1',
    width: normalize(115, 'width'),
    height: 1,
  },
  noticeText: {
    fontSize: normalize(14),
  },
  logInArea: {
    alignSelf: 'flex-start',
    marginTop: normalize(22, 'height'),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  logInText: {
    fontSize: 16,
    color: '#3d3d3d',
  },
  logInBtn: {
    fontSize: 16,
    color: '#1da1f2',
  },
});
