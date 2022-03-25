import { Image, StyleSheet, Text, View } from 'react-native';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.iconArea}>
        <Image source={require('../../assets/icons/twitter-icon.png')} style={styles.iconImg}/>
      </View>
      <View style={styles.titleArea}>
        <Text style={styles.title}>Veja o que está acontecendo no mundo agora</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  titleArea: {
    marginVertical: 120,
    width: 300,
    marginLeft: 30
  },
  title: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
  },
  iconArea: {
    marginTop: 60
  },
  iconImg: {
    width: 28,
    height: 28,
  }
});
