import { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Image } from 'react-native';
import { IUser } from '../../@types/user.types';
import { Container, Header } from '../../components';
import { Avatar, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import PostService from '../../api/services/PostService';
import Toast from 'react-native-toast-message';
import normalize from "react-native-normalize";
import { useAuth } from '../../contexts/Auth';

interface CreatePostProps {
  route: any;
  navigation: any;
};

export default function CreatePost({ route, navigation }: CreatePostProps) {
  const { setIsLoading } = useAuth();
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const { currentUser } = route.params;

  const handleTweet = async () => {
    setIsLoading(true);
    if (!text.length && !image) return;
    PostService.create({
      createdBy: currentUser,
      text,
      image
    })
      .then(() => {
        Toast.show({
          type: 'success',
          text2: 'Postagem publicada com sucesso.',
        });
        navigation.navigate('TimelineStack');
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
      setImage(result.uri);
    }
  }

  return (
    <Container>
      <Header>
        <Button
          onPress={() => navigation.goBack()}
          icon={<Ionicons name="close" size={28} color="#3d3d3d" />}
          type="clear"
        />
        <Button
          onPress={handleTweet}
          title="Tweet"
          type="clear"
          buttonStyle={styles.buttonTweetStyle}
          titleStyle={{ color: '#fff', fontWeight: 'bold' }}
        />
      </Header>
      <View style={styles.formArea}>
        <Avatar
          rounded
          source={{
            uri: currentUser?.profilePicture,
          }}
          size='small'
          containerStyle={{ marginRight: 10 }}
        />
        <TextInput
          multiline
          placeholder="O que está acontecendo?"
          style={styles.multiInput}
          onChangeText={(e: string) => setText(e)}
        />
      </View>
      <View style={styles.attachArea}>
        <Button
          onPress={handlePickImage}
          icon={<Ionicons name="attach" size={28} color="#3d3d3d" />}
          type="clear"
        />
        { image && <Image source={{ uri: image }} style={styles.attachedImage} /> }
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  formArea: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  multiInput: {
    fontSize: 17,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8
  },
  buttonTweetStyle: {
    backgroundColor: '#1da1f2',
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  attachArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  attachedImage: {
    width: normalize(120, 'width'),
    height: normalize(90, 'height')
  }
});
