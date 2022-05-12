import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContent } from '../components/Drawer';
import { ProfileStackRoute } from './profile/profile.stack';
import { SettingsStackRoute } from './settings/settings.stack';
import MainTabRoute from './tab';

const Drawer = createDrawerNavigator();

const MainDrawerRoute = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Timeline"
      screenOptions={{ headerShown: false, }}
      drawerContent={(props: DrawerContentComponentProps) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Timeline"
        options={{ title: "Inicio" }}
        component={MainTabRoute}
      />
      <Drawer.Screen
        name="Profile"
        options={{ title: "Perfil" }}
        component={ProfileStackRoute}
      />
      <Drawer.Screen
        name="Settings"
        options={{ title: "Configurações" }}
        component={SettingsStackRoute}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerRoute;
