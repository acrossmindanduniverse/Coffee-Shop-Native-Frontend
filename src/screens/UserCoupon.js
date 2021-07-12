import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function UserCoupon() {
  return (
    <View style={styles.parent}>
      <View style={styles.userCoupon} />
      <View style={styles.promoContainer}>
        <View style={styles.box1} />
        <View style={styles.box2} />
        <View style={styles.box3}>
          <View style={styles.box3Content}>
            <View style={styles.box3Content1}>
              <Image style={styles.promoImage} />
              <Text style={styles.itemName}>Beef Spaghetti</Text>
              <Text style={styles.discount}>20 % OFF</Text>
              <Text style={styles.itemDescription}>
                Buy 1 Choco Oreo and get 20% off for Beef Spaghetti
              </Text>
            </View>
            <View style={styles.box3Content2}>
              <Text style={styles.couponCode}>COUPON CODE</Text>
              <Text style={styles.code}>FN182H</Text>
              <Text style={styles.limit}>Valid until October 10th 2020</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.couponText}>Apply Coupon</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'column',
    flex: 1,
  },
  promoContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    marginTop: 200,
    marginLeft: 90,
  },
  box1: {
    backgroundColor: 'rgba(106, 64, 41, 1)',
    width: 360,
    borderRadius: 15,
    height: 450,
  },
  box2: {
    backgroundColor: '#000',
    width: 335,
    position: 'absolute',
    borderRadius: 15,
    height: 522,
  },
  box3: {
    width: 305,
    position: 'absolute',
    height: 592,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 203, 101, 1)',
  },
  box3Content1: {
    alignItems: 'center',
    margin: 30,
    borderBottomWidth: 1,
  },
  promoImage: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#fff',
  },
  itemName: {
    fontSize: 30,
    marginTop: 10,
    fontWeight: 'bold',
  },
  discount: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  itemDescription: {
    marginTop: 10,
    textAlign: 'center',
  },
  applyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 170,
    backgroundColor: 'rgba(106, 64, 41, 1)',
    marginHorizontal: 130,
    height: 80,
    borderRadius: 15,
  },
  couponText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  box3Content2: {
    marginVertical: 10,
    alignItems: 'center',
  },
  couponCode: {
    fontSize: 30,
  },
  code: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  limit: {
    marginTop: 20,
  },
});
