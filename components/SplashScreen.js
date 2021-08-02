import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import AppIcon from '../assets/app_icon.png';
import SplashBg from '../assets/splash-background.jpg';
import {connect} from 'react-redux';

const SplashScreen = props => {
  useEffect(() => {
    if (props.auth.info !== null) {
      setTimeout(() => {
        props.navigation.navigate('home');
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.parent}>
      <View style={styles.parentContainer}>
        <ImageBackground
          blurRadius={5}
          source={SplashBg}
          style={styles.parentContent}>
          <Image source={AppIcon} />
          <Text style={styles.appName}>History Coffee</Text>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    zIndex: 1,
  },
  parentContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 35,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SplashScreen);
