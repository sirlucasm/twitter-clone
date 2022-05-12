import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../../screens/settings';

const Stack = createNativeStackNavigator();

const SettingsStackRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SettingsStack'
        component={Settings}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}



export { SettingsStackRoute };
