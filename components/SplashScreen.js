import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import AppIcon from '../assets/app_icon.png';
import SplashBg from '../assets/splash-background.jpg';
import {authSignOut} from '../src/redux/actions/auth';
import {connect} from 'react-redux';
import {splashToggle} from './../src/redux/actions/user';
import {authRefreshToken} from './../src/redux/actions/auth';

const SplashScreen = props => {
  useEffect(() => {
    props.splashToggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.auth.info !== null) {
      props.authRefreshToken(props.auth.info?.token, {
        refreshToken: props.auth.info?.refreshToken,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (props.auth.info !== null) {
        props.navigation.navigate('root');
      } else {
        props.authSignOut();
        props.getUserDefault();
      }
    }, 2000);
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

const mapDispatchToProps = {authSignOut, splashToggle, authRefreshToken};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
