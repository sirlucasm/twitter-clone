import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../screens/profile';

const Stack = createNativeStackNavigator();

const ProfileStackRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='ProfileStack'
        component={Profile}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}



export { ProfileStackRoute };
