import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Timeline from '../../screens/timeline';

const Stack = createNativeStackNavigator();

const TimelineStackRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Timeline'
        component={Timeline}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}



export { TimelineStackRoute };
