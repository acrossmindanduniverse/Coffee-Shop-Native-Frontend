import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import defaultPicture from '../assets/defaultPicture.png';
import {getUserSigned} from '../src/redux/actions/user';
import {connect} from 'react-redux';
import {API_URL} from '@env';

const UserHome = props => {
  const user = props.user.user[0];

  useEffect(() => {
    if (props.auth.info !== null) {
      props.getUserSigned(props.auth.refreshToken?.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth.refreshToken]);

  return (
    user !== undefined && (
      <View>
        <View style={styles.profileInfo}>
          <Image
            source={
              user.picture !== null
                ? {
                    uri: `${API_URL}${user.picture}`,
                  }
                : defaultPicture
            }
            style={styles.profilePicture}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.username}</Text>
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
  user: state.user,
});

const mapDispatchToProps = {getUserSigned};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
