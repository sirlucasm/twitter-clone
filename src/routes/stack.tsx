const Stack = createNativeStackNavigator();

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens';
import SignIn from '../screens/auth/signin';
import SignUp from '../screens/auth/signup';

const MainStackRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='SignIn'
        component={SignIn}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackRoute;
