
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Timeline from '../screens/timeline';


const Tab = createBottomTabNavigator();

const MainStackRoute = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Timeline" component={Timeline} />
    </Tab.Navigator>
  );
}

export default MainStackRoute;
