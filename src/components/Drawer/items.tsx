import { DrawerContentComponentProps, DrawerItem } from "@react-navigation/drawer";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useAuth } from "../../contexts/Auth";

function DrawerItems(props: DrawerContentComponentProps) {
  const { signOut } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        onPress={signOut}
      />
    </DrawerContentScrollView>
  );
}

export default DrawerItems;
