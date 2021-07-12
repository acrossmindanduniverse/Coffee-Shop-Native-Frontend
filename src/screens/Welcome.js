import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import image from '../../assets/girl-checking-phone-during-free-time-1.png';

export default function Welcome(props) {
  return (
    <View style={styles.parent}>
      <View style={styles.ImageBackgroundContainer}>
        <ImageBackground
          style={styles.image}
          source={image}
          resizeMode="contain">
          <View style={styles.imageTextContainer}>
            <Text style={styles.imageText1}>Welcome!</Text>
            <Text style={styles.imageText2}>
              Get a cup of coffee for free only for new user
            </Text>
          </View>
          <View style={styles.button1Container}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('signUp')}
              style={styles.button1}>
              <Text style={styles.buttonText1}>Create New Account</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button2Container}>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => props.navigation.navigate('signIn')}>
              <Text style={styles.buttonText2}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  imageTextContainer: {
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: '100%',
  },
  imageText1: {
    fontSize: 80,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageText2: {
    fontSize: 30,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 70,
    fontWeight: 'bold',
  },
  button1Container: {
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    borderRadius: 20,
    alignContent: 'center',
    height: 70,
    marginHorizontal: 31,
  },
  button2Container: {
    backgroundColor: '#FFBA33',
    justifyContent: 'center',
    borderRadius: 20,
    alignContent: 'center',
    height: 70,
    marginVertical: 20,
    marginHorizontal: 31,
  },
  buttonText1: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
  },
  buttonText2: {
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontSize: 17,
  },
});
