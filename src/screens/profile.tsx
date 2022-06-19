import { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
  TouchableHighlight,
  FlatList
} from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { IPost } from '../@types/post.types';
import { useAuth } from '../contexts/Auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostService from '../api/services/PostService';
import { ScrollView } from 'react-native-gesture-handler';

export default function Profile({ navigation, route }: any) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { currentUser, setIsLoading } = useAuth();
  const { profile } = route.params;

  const fetchPosts = async () => {
    setIsLoading(true);
    PostService.postsById(profile.uid)
      .then(data => {
        setPosts(data);
      })
      .finally(() => setIsLoading(false));
  }

  const handleLikePost = async (docId: string, userId: string, likes: string[]) => {
    if (postAlreadyLiked(likes)) await PostService.unlikePost({ docId, userId, likes });
    else await PostService.likePost({ docId, userId });

    await fetchPosts();
  }

  const renderFlatItems = posts.map((item: any) => {
    return (
      <View key={item.id}>
        <TouchableHighlight>
          <View style={styles.tweetContent}>
            <Avatar
              rounded
              source={{
                uri: item.createdBy.profilePicture,
              }}
              size={40}
              onPress={() => navigation.navigate('ProfileDrawer', { profile: item.createdBy })}
            />
            <View style={styles.tweetArea}>
              {
                !!item.text && <Text>{item.text}</Text>
              }
              {
                !!item.image && <Image source={{ uri: item.image }} style={styles.tweetImg} />
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
                <TouchableOpacity
                  style={styles.btnItemNumbers}
                  onPress={() => handleLikePost(item.id, item.createdBy.uid, item.likes)}
                >
                  <Ionicons
                    name={item.likes.includes(currentUser?.uid) ? 'heart' : 'heart-outline'}
                    size={22}
                    color={item.likes.includes(currentUser?.uid) ? '#de2a2a': '#000'}
                  />
                  <Text style={{ marginLeft: 4 }}>{item.likes.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare}>
                  <Ionicons name='share-social-outline' size={22} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <Divider orientation="horizontal" />
      </View>
    );
  });

  const postAlreadyLiked = (likes: string[]) => likes.includes(currentUser?.uid || '');

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Twitter Clone - study app',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
    return () => {
      setPosts([]);
    }
  }, [profile]);

  return (
    <ScrollView>
      <View style={styles.profileInfoArea}>
        <View>
          <View>
            <Image source={{ uri: profile.backgroundPicture }} style={styles.profileBackgroundPic} />
          </View>
          <View style={styles.profileImagePic}>
            <Avatar
              rounded
              source={{ uri: profile.profilePicture }}
              size={90}
            />
          </View>
        </View>
        <View style={styles.profileTextsArea}>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileUsername}>@{profile.username}</Text>
          {
            !!profile.biography && (
              <View style={styles.profileBiography}>
                <Text>{profile.biography}</Text>
              </View>
            )
          }
          <View style={styles.profileFollowingInfo}>
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', }}>
              <Text style={{ fontWeight: 'bold' }}>{profile.following.length}</Text>
              <Text>{' '}Seguindo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 30, display: 'flex', flexDirection: 'row', }}>
              <Text style={{ fontWeight: 'bold' }}>{profile.followers.length}</Text>
              <Text>{' '}Seguidores</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Divider style={{ marginVertical: 20 }} />
      <View style={styles.profilePostsArea}>
        {
          renderFlatItems
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  profileInfoArea: {
    width: '100%',
    position: 'relative',

  },
  profileBackgroundPic: {
    width: '100%',
    height: 210,
  },
  profileImagePic: {
    position: 'absolute',
    bottom: -50,
    left: 20,
  },
  profileTextsArea: {
    marginTop: 54,
    marginLeft: 16
  },
  profileName: {
    fontWeight: '700',
    fontSize: 18
  },
  profileUsername: {
    fontSize: 15,
    color: '#4d4d4d'
  },
  profileBiography: {
    marginTop: 20,
    width: normalize(260, 'width')
  },
  profileFollowingInfo: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  profilePostsArea: {
    paddingHorizontal: 20,
  },

  tweetContent: {
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
