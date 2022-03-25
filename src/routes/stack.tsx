const Stack = createNativeStackNavigator();

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens';

const StackRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default StackRoute;
