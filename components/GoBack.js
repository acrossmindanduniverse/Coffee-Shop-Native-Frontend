import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Header = props => {
  return (
    <View style={styles.headerIcon}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Icon
          style={styles.icon}
          name="chevron-left"
          color={props.scene.route.name === 'detail' ? '#fff' : '#000'}
        />
      </TouchableOpacity>
    </View>
  );
};

export const userCouponHeader = props => {
  return (
    <View style={styles.couponHeader}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Icon
          style={styles.icon}
          name="chevron-left"
          color={props.scene.route.name === 'detail' ? '#fff' : '#000'}
        />
      </TouchableOpacity>
      <View style={styles.couponTextContainer}>
        {props.scene.route === 'coupon' ? (
          <Text style={styles.couponText}>My Coupon</Text>
        ) : (
          <Text style={styles.couponText}>Check Out</Text>
        )}
      </View>
    </View>
  );
};

export const ChatHeader = props => {
  return (
    <View style={{backgroundColor: '#fff'}}>
      <View style={styles.newHeaderIcon}>
        <TouchableOpacity
          style={{
            width: '40%',
            justifyContent: 'center',
          }}
          onPress={() => props.navigation.goBack()}>
          <Icon
            style={{
              fontSize: 30,
            }}
            name="chevron-left"
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 30}}>Chat</Text>
        </View>
      </View>
    </View>
  );
};

export const RoomChatHeader = props => {
  return (
    <View style={{backgroundColor: '#fff'}}>
      <View
        style={{
          marginVertical: 80,
          justifyContent: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={props.picture} style={styles.anotherUserPicture} />
          <Text
            style={{fontFamily: 'Poppins-Bold', fontSize: 30, marginTop: 15}}>
            {props.user}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  couponHeader: {
    flexDirection: 'row',
  },
  newHeaderIcon: {
    flexDirection: 'row',
    marginVertical: 80,
    marginHorizontal: 70,
  },
  headerIcon: {
    justifyContent: 'center',
    marginRight: 510,
  },
  userCoupon: {
    alignItems: 'center',
    marginTop: 30,
  },
  icon: {
    fontSize: 25,
    marginLeft: 20,
    marginTop: 10,
  },
  anotherUserPicture: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    resizeMode: 'cover',
    backgroundColor: 'grey',
  },
  couponTextContainer: {
    marginTop: 5,
    marginHorizontal: 200,
  },
  couponText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerModal: {
    backgroundColor: 'transparent',
  },
});
