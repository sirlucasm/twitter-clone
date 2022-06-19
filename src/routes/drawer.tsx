import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContent } from '../components/Drawer';
import Profile from '../screens/profile';
import { ProfileStackRoute } from './profile/profile.stack';
import { SettingsStackRoute } from './settings/settings.stack';
import MainTabRoute from './tab';

const Drawer = createDrawerNavigator();

const MainDrawerRoute = () => {
  return (
    <Drawer.Navigator
      initialRouteName="TimelineDrawer"
      screenOptions={{ headerShown: false, }}
      drawerContent={(props: DrawerContentComponentProps) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="TimelineDrawer"
        options={{ title: "Inicio" }}
        component={MainTabRoute}
      />
      <Drawer.Screen
        name="ProfileDrawer"
        options={{ title: "Perfil" }}
        component={Profile}
      />
      <Drawer.Screen
        name="SettingsDrawer"
        options={{ title: "Configurações" }}
        component={SettingsStackRoute}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerRoute;
