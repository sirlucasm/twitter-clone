import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../../screens/settings';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../contexts/Auth';
import AccountSettings from '../../screens/settings/account';

const Stack = createNativeStackNavigator();

const SettingsStackRoute = () => {
  const { currentUser } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SettingsStack'
        component={Settings}
        options={
          ({ navigation }) => {
            return ({
              headerLeft: (props) => (
                <Button
                  onPress={() => navigation.goBack()}
                  icon={<Ionicons name="arrow-back-outline" size={24} color="#3d3d3d" />}
                  type="clear"
                />
              ),
              headerTitle: (props) => (
                <View style={styles.titleArea}>
                  <Text style={styles.titleText}>Configurações</Text>
                  <Text style={styles.usernameText}>@{currentUser?.username}</Text>
                </View>
              ),
            })
          }
        }
      />
      <Stack.Screen
        name='AccountSettings'
        component={AccountSettings}
        options={
          ({ navigation }) => {
            return ({
              headerLeft: (props) => (
                <Button
                  onPress={() => navigation.goBack()}
                  icon={<Ionicons name="arrow-back-outline" size={24} color="#3d3d3d" />}
                  type="clear"
                />
              ),
              headerTitle: (props) => (
                <View style={styles.titleArea}>
                  <Text style={styles.titleText}>Sua conta</Text>
                  <Text style={styles.usernameText}>@{currentUser?.username}</Text>
                </View>
              ),
              headerBackVisible: false
            })
          }
        }
      />
    </Stack.Navigator>
  );
}

export { SettingsStackRoute };

const styles = StyleSheet.create({
  titleArea: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 12
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  usernameText: {
    fontSize: 15,
    color: '#3d3d3d',
  },
});
