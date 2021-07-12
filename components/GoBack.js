import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Header = props => {
  console.log(props.scene);
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

const styles = StyleSheet.create({
  couponHeader: {
    flexDirection: 'row',
  },
  headerIcon: {
    justifyContent: 'center',
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
