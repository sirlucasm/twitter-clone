import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useAuth } from '../../contexts/Auth';
import { StyleSheet, View, Text } from "react-native";
import { Avatar, Divider } from "react-native-elements";
import DrawerItems from "./items";

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { currentUser } = useAuth();

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        source={{
          uri: currentUser?.profilePicture,
        }}
        size='medium'
        onPress={() => props.navigation.navigate('ProfileDrawer')}
      />
      <View style={styles.userInfoNames}>
        <Text style={{ fontWeight: 'bold' }}>{currentUser?.name}</Text>
        <Text>@{currentUser?.username}</Text>
      </View>
      <View style={styles.userInfoArea}>
        <Text style={{ marginRight: 10 }}>{currentUser?.following.length} seguindo</Text>
        <Text>{currentUser?.followers.length} seguidores</Text>
      </View>
      <Divider />
      <DrawerItems {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 18
  },
  userInfoNames: {
    marginTop: 8,
  },
  userInfoArea: {
    marginTop: 15,
    marginBottom: 25,
    display: 'flex',
    flexDirection: 'row'
  }
});
