
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Timeline from '../screens/timeline';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TimelineStackRoute } from './timeline/timeline.stack';
import Search from '../screens/search';
import Notification from './notification';

const Tab = createBottomTabNavigator();

const MainTabRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'Timeline') iconName = focused ? 'ios-home' : 'ios-home-outline';
          else if (route.name === 'Search') iconName = focused ? 'ios-search' : 'ios-search-outline';
          else if (route.name === 'Notifications') iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
          else if (route.name === 'Messages') iconName = focused ? 'ios-chatbubble' : 'ios-chatbubble-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Timeline"
        component={TimelineStackRoute}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          headerTitle: 'Notificações'
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabRoute;
