import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePost from '../../screens/posts/create';
import Timeline from '../../screens/timeline';

const Stack = createNativeStackNavigator();

const TimelineStackRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='TimelineStack'
        component={Timeline}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='CreatePost'
        component={CreatePost}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export { TimelineStackRoute };
