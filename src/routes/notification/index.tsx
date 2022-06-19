import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { INotification } from "../../@types/notification.types";
import NotificationService from "../../api/services/NotificationService";
import { Container } from "../../components";
import { useAuth } from "../../contexts/Auth";

export default function Notification() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const fetchNotifications = async () => {
    const data: INotification[] = await NotificationService.all(currentUser?.uid || '');
    setNotifications(data);
  }

  useEffect(() => {
    fetchNotifications();
    return () => {
      setNotifications([]);
    }
  }, [])

  return notifications.length ? (
      <ScrollView style={{ padding: 20 }}>
        {
          notifications.map((notification: any) => {
            return (
              <View key={notification.id} style={styles.notificationContent}>
                <Avatar
                  rounded
                  size='small'
                  source={{ uri: notification.byUser?.profilePicture }}
                />
                <Text>{' '}{notification.byUser?.username}{' '}</Text>
                <Text>{notification.message}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    ) : (
      <Container>
        <Text style={{ alignSelf: 'center', fontSize: 16 }}>Você não possui nenhuma notificação</Text>
      </Container>
    )
}

const styles = StyleSheet.create({
  notificationContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
