import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Share } from 'react-native';
import normalize from 'react-native-normalize';
import { Button, Avatar, Divider, FAB } from 'react-native-elements';
import { Container, Header } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/Auth';
import PostService from '../api/services/PostService';
import { IPost } from '../@types/post.types';
import NotificationService from '../api/services/NotificationService';

export default function Timeline({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const { currentUser } = useAuth();

  const handleDrawer = () => {
    navigation.openDrawer();
  }

  const fetchPosts = async () => {
    setRefreshing(true);
    PostService.all()
      .then(data => {
        setPosts(data);
      })
      .finally(() => setRefreshing(false));
  }

  const handleLikePost = async (docId: string, user: any, likes: string[]) => {
    if (postAlreadyLiked(likes)) {
      await PostService.unlikePost({ docId, userId: user.uid, likes });
      await fetchPosts();
    }
    else {
      await PostService.likePost({ docId, userId: user.uid });
      await fetchPosts();
      await NotificationService.create({
        byUser: currentUser,
        toUser: user,
        message: 'curtiu sua postagem',
        post: docId,
        notificationToken: expoPushToken
      })
      await sendPushNotification();
    }
  }

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

  async function sendPushNotification() {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Nova curtida',
      body: 'Você ganhou uma nova curtida!',
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  useEffect(() => {
    NotificationService.registerForPushNotificationsAsync().then((token:any) => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    fetchPosts();

    return () => {
      setPosts([]);
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    }
  }, []);

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
                  onPress={() => handleLikePost(item.id, item.createdBy, item.likes)}
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
            onPress={() => navigation.navigate('SettingsDrawer')}
            icon={<Ionicons name="cog" size={28} color="#3d3d3d" />}
            type="clear"
          />
        </View>
      </Header>
      <FlatList
        data={posts}
        renderItem={renderFlatItems}
        keyExtractor={(item: any) => item.id}
        onRefresh={fetchPosts}
        refreshing={refreshing}
      />
      <FAB
        title=""
        icon={{ name: 'add-circle-outline', color: 'white' }}
        placement='right'
        color="#1da1f2"
        buttonStyle={{ borderRadius: 50 }}
        onPress={() => navigation.navigate('CreatePost', { currentUser })}
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
