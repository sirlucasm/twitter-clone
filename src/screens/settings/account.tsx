import { useEffect, useState } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import {
  Input,
  Button,
  Avatar
} from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import normalize from "react-native-normalize";
import UserService from "../../api/services/UserService";
import { useAuth } from "../../contexts/Auth";
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';

export default function AccountSettings({ navigation }: any) {
  const { currentUser, setIsLoading } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [canSave, setCanSave] = useState(false);

  const generateParams = () => ({
    name: name || currentUser?.name,
    username: username || currentUser?.username,
    profilePicture: profilePicture || currentUser?.profilePicture
  });

  const handleSaveChanges = async () => {
    setIsLoading(true);
    UserService.update(currentUser?.uid || '', generateParams())
      .then(() => {
        Toast.show({
          type: 'success',
          text2: 'Perfil editado com sucesso.',
        });
        navigation.goBack();
      })
      .finally(() => setIsLoading(false));
  }

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  }

  useEffect(() => {
    if (
      name.length && name.trim() != currentUser?.name ||
      username.length && username.trim() != currentUser?.username ||
      profilePicture.length && profilePicture.trim() != currentUser?.profilePicture
    ) setCanSave(true);
    else setCanSave(false);
  }, [name, username, profilePicture]);

  return (
    <View style={styles.content}>
      <ScrollView style={styles.formArea}>
        <Avatar
          rounded
          source={{
            uri: profilePicture || currentUser?.profilePicture,
          }}
          size={120}
          onPress={handlePickImage}
          containerStyle={{ alignSelf: 'center', marginBottom: 15 }}
        />
        <Input
          placeholder={currentUser?.name}
          onChangeText={(e: string) => setName(e)}
        />
        <Input
          placeholder={currentUser?.username}
          onChangeText={(e: string) => setUsername(e)}
        />
        <Button
          title='Salvar'
          disabled={!canSave}
          onPress={handleSaveChanges}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formArea: {
    marginTop: 20,
    width: normalize(320, 'width'),
  }
});
