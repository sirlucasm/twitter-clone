import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import normalize from 'react-native-normalize';
import { Button } from 'react-native-elements';
import { useAuth } from '../contexts/Auth';

export default function Timeline({ navigation }: any) {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Timeline</Text>
      <Button title='sair' onPress={signOut} />
    </View>
  )
}
