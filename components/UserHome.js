import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import defaultPicture from '../assets/defaultPicture.png';
import {connect} from 'react-redux';

const UserHome = props => {
  return (
    props.auth.info !== null && (
      <View>
        <View style={styles.profileInfo}>
          <Image
            source={
              props.auth.info.userData.picture !== null
                ? {
                    uri: `${props.auth.info.userData.picture}`,
                  }
                : defaultPicture
            }
            style={styles.profilePicture}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{props.auth.info.userData.name}</Text>
            <Text style={styles.userEmail}>
              {props.auth.info.userData.username}
            </Text>
          </View>
        </View>
      </View>
    )
  );
};

const PictureSize = 130;

const styles = StyleSheet.create({
  profileInfo: {
    height: 320,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A4029',
  },
  profilePicture: {
    width: PictureSize,
    height: PictureSize,
    backgroundColor: 'white',
    borderRadius: PictureSize / 2,
  },
  userEmail: {
    color: '#fff',
    fontSize: 17,
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  userName: {
    color: '#fff',
    fontSize: 25,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserHome);
