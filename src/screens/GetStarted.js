import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import image from '../../assets/female-waiting-for-order-at-cafe-1.png';

export default function Welcome() {
  return (
    <View style={styles.parent}>
      <View style={styles.backgroundImg}>
        <ImageBackground
          style={styles.image}
          source={image}
          resizeMode="contain">
          <View style={styles.imageTextContainer}>
            <Text style={styles.imageText}>Coffee For Everyone</Text>
          </View>
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <Text>welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  image: {
    height: '100%',
  },
  imageTextContainer: {
    alignItems: 'center',
    flex: 1,
  },
  imageText: {
    fontSize: 80,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  getStartedButton: {
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    borderRadius: 20,
    alignContent: 'center',
    height: 70,
    marginHorizontal: 31,
    marginBottom: 40,
  },
  getStartedText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
  },
});
