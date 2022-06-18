import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import normalize from 'react-native-normalize';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Settings({ navigation }: any) {
  return (
    <View>
      <ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AccountSettings')}>
          <View style={styles.iconArea}>
            <Ionicons name="person-outline" size={24} color="#3d3d3d" />
          </View>
          <View style={styles.buttonTexts}>
            <Text style={styles.settingTitle}>Sua conta</Text>
            <Text style={styles.settingDescription}>Veja informações sobre sua conta, atualize seus dados, ou aprenda sobre como desativar sua conta.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconArea}>
            <Ionicons name="lock-closed-outline" size={24} color="#3d3d3d" />
          </View>
          <View style={styles.buttonTexts}>
            <Text style={styles.settingTitle}>Segurança e acesso a conta</Text>
            <Text style={styles.settingDescription}>Gerencie a segurança da sua conta.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconArea}>
            <Ionicons name="cash-outline" size={24} color="#3d3d3d" />
          </View>
          <View style={styles.buttonTexts}>
            <Text style={styles.settingTitle}>Monetização</Text>
            <Text style={styles.settingDescription}>Veja como você pode fazer dinheiro no Twitter e gerencie suas opções de monetização.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconArea}>
            <Ionicons name="shield-outline" size={24} color="#3d3d3d" />
          </View>
          <View style={styles.buttonTexts}>
            <Text style={styles.settingTitle}>Privacidade e segurança</Text>
            <Text style={styles.settingDescription}>Gerencie quais tipos de informação você vê e compartilha no Twitter</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconArea}>
            <Ionicons name="notifications-outline" size={24} color="#3d3d3d" />
          </View>
          <View style={styles.buttonTexts}>
            <Text style={styles.settingTitle}>Notificações</Text>
            <Text style={styles.settingDescription}>Selecione os tipos de notificações para suas atividades, interesses e recomendações.</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  iconArea: {
    marginRight: 18
  },
  buttonTexts: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  settingTitle: {
    fontSize: 16,
  },
  settingDescription: {
    color: '#4d4d4d',
    fontSize: 14,
    width: normalize(300, 'width')
  }
});
