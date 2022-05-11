import { createDrawerNavigator } from '@react-navigation/drawer';
import { ProfileStackRoute } from './profile/profile.stack';
import MainTabRoute from './tab';

const Drawer = createDrawerNavigator();

const MainDrawerRoute = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Timeline"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="TimelineDrawer"
        options={{ title: "Inicio" }}
        component={MainTabRoute}
      />
      <Drawer.Screen
        name="Profile"
        options={{ title: "Perfil" }}
        component={ProfileStackRoute}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerRoute;
