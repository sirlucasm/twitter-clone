import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { Container } from '../components';
import { Input, Avatar } from 'react-native-elements';
import { useState } from 'react';
import UserService from '../api/services/UserService';
import { ICurrentUser } from '../@types/user.types';
import { useAuth } from '../contexts/Auth';
import { ScrollView } from 'react-native-gesture-handler';

export default function Search() {
  const { setIsLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedData, setSearchedData] = useState<ICurrentUser[]>([]);

  const handleSubmitSearch = () => {
    setIsLoading(true);
    UserService.searchUsers(searchQuery)
    .then(data => setSearchedData(data))
    .finally(() => setIsLoading(false));
  }

  return (
    <Container>
      <View>
        <Input
          placeholder='Pesquisar usuários'
          leftIcon={{ type: 'ionicon', name: 'search-outline' }}
          onChangeText={(e: string) => setSearchQuery(e)}
          onSubmitEditing={handleSubmitSearch}
          containerStyle={{ marginTop: 10 }}
        />
      </View>
      <ScrollView>
        {
          searchedData.map((user, i) => (
            <TouchableOpacity key={i} style={styles.profilesButton}>
              <Avatar
                rounded
                source={{
                  uri: user.profilePicture,
                }}
                size={45}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 15, }}>{user.name}</Text>
                <Text style={{ color: '#3d3d3d' }}>{user.username}</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  profilesButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
  }
});
