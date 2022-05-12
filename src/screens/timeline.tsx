import { FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import normalize from 'react-native-normalize';
import { Button, Avatar, Divider, FAB } from 'react-native-elements';
import { Container, Header } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/Auth';

export default function Timeline({ navigation }: any) {
  const { currentUser } = useAuth();
  const handleDrawer = () => {
    navigation.openDrawer();
  }

  const TWEETS = [
    {
      id: 'sad321sdf213ds234g.asd2dfas3213e',
      text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.`,
      image: {
        uri: 'https://www.techreviews.com.br/wp-content/uploads/2020/04/VZI-0-monitor-hd-davidx-rq7e1qwspey-unsplash-scaled.jpg',
        type: 'image/jpeg'
      },
      likes: [
        {
          uid: 'as6d5a76576d.dafd7f677',
          name: 'Teste 1',
          username: 'teste1',
          email: 'teste1@gmail.com',
          profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        },
        {
          uid: 'as6d5a76576d.dafd7f677',
          name: 'Lucas Matheus',
          username: 'sirlucasm',
          email: 'lucasmatheus2021@gmail.com',
          profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        },
        {
          uid: 'as6d5a76576d.dafd7f677',
          name: 'Teste 2',
          username: 'teste2',
          email: 'teste2@gmail.com',
          profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        }
      ],
      retweets: [
        {
          uid: 'as6d5a76576d.dafd7f677',
          name: 'Teste 1',
          username: 'teste1',
          email: 'teste1@gmail.com',
          profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        },
        {
          uid: 'as6d5a76576d.dafd7f677',
          name: 'Teste 2',
          username: 'teste2',
          email: 'teste2@gmail.com',
          profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        }
      ],
      comments: [],
      createdBy: {
        uid: 'as6d5a76576d.dafd7f677',
        name: 'Lucas Matheus',
        username: 'sirlucasm',
        email: 'lucasmatheus2021@gmail.com',
        profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
      }
    },
    {
      id: 'dsd3224sd7asd67.dasd87867das65d675',
      text: ``,
      image: {
        uri: 'https://geekblog.com.br/wp-content/uploads/2021/01/7fea175e13ba4a4b29672d15b2497367.jpg',
        type: 'image/jpeg'
      },
      likes: [
        {
          uid: 'as6d5a76576d.dafd7f677',
          name: 'Teste 1',
          username: 'teste1',
          email: 'teste1@gmail.com',
          profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        },
        {
          uid: 'as6d5a76576d.dafd7f677',
          name: 'Lucas Matheus',
          username: 'sirlucasm',
          email: 'lucasmatheus2021@gmail.com',
          profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        },
        {
          uid: 'as6d5a76576d.dafd7f677',
          name: 'Teste 2',
          username: 'teste2',
          email: 'teste2@gmail.com',
          profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        }
      ],
      retweets: [
        {
          uid: 'as6d5a76576d.dafd7f677',
          name: 'Teste 1',
          username: 'teste1',
          email: 'teste1@gmail.com',
          profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        },
        {
          uid: 'as6d5a76576d.dafd7f677',
          name: 'Teste 2',
          username: 'teste2',
          email: 'teste2@gmail.com',
          profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        }
      ],
      comments: [],
      createdBy: {
        uid: 'as6d5a76576d.dafd7f677',
        name: 'Lucas Matheus',
        username: 'sirlucasm',
        email: 'lucasmatheus2021@gmail.com',
        profilePicture: 'https://instagram.fmcz9-1.fna.fbcdn.net/v/t51.2885-19/211551140_796875311012805_188347745712073640_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fmcz9-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=NXxdxdeLuh8AX8ZYnAU&edm=ALbqBD0BAAAA&ccb=7-4&oh=00_AT8Msq8xJSIOazYhqCeYJ31kkyjk9ETKQLvCSdd7IhQVdQ&oe=6282ACD4&_nc_sid=9a90d6'
      }
    }
  ];

  const renderFlatItems = ({ item }: { item: any }) => {
    return (
      <>
        <TouchableHighlight>
          <View style={styles.tweetContent}>
            <Avatar
              rounded
              source={{
                uri: item.createdBy.profilePicture,
              }}
              size='medium'
              onPress={() => navigation.navigate('Profile', item.createdBy)}
            />
            <View style={styles.tweetArea}>
              {
                !!item.text && <Text>{item.text}</Text>
              }
              {
                !!item.image.uri && <Image source={{ uri: item.image.uri}} style={styles.tweetImg} />
              }
              <View style={styles.tweetsButtons}>
                <TouchableOpacity style={styles.btnItemNumbers}>
                  <Ionicons name='chatbubble-outline' size={22} />
                  <Text style={{ marginLeft: 4 }}>{item.comments.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnItemNumbers}>
                  <Ionicons name='reload-outline' size={22} />
                  <Text style={{ marginLeft: 4 }}>{item.retweets.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnItemNumbers}>
                  <Ionicons name='heart-outline' size={22} />
                  <Text style={{ marginLeft: 4 }}>{item.likes.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name='share-social-outline' size={22} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <Divider orientation="horizontal" />
      </>
    );
  }

  return (
    <Container>
      <Header>
        <Avatar
          rounded
          source={{
            uri: currentUser?.profilePicture,
          }}
          size='small'
          onPress={handleDrawer}
        />
        <View>
          <Image source={require('../../assets/icons/twitter-icon.png')} style={styles.iconImg}/>
        </View>
        <View>
          <Button
            onPress={() => navigation.navigate('Settings')}
            icon={<Ionicons name="cog" size={28} color="#3d3d3d" />}
            type="clear"
          />
        </View>
      </Header>
      <FlatList
        data={TWEETS}
        renderItem={renderFlatItems}
        keyExtractor={item => item.id}
      />
      <FAB
        title=""
        icon={{ name: 'add-circle-outline', color: 'white' }}
        placement='right'
        color="#1da1f2"
        buttonStyle={{ borderRadius: 50 }}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  iconImg: {
    width: 24,
    height: 24,
  },

  tweetContent: {
    marginTop: 16,
    marginBottom: 10,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row'
  },

  tweetArea: {
    width: '80%',
    marginLeft: 8
  },

  tweetImg: {
    width: normalize(287, 'width'),
    height: normalize(312, 'height'),
    marginTop: 15,
  },

  tweetsButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 12,
  },

  btnItemNumbers: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
