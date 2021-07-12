import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Chevron from 'react-native-vector-icons/Entypo';
import Arrow from 'react-native-vector-icons/Fontisto';

const Checkout = () => {
  return (
    <View style={styles.parent}>
      <View style={styles.totalContainer}>
        <View style={styles.totalText}>
          <View style={styles.totalContent}>
            <Text style={styles.infoText}>Item Total</Text>
            <Text style={styles.priceText}>IDR 000</Text>
          </View>
          <View style={styles.totalContent}>
            <Text style={styles.infoText}>Delivery Charge</Text>
            <Text style={styles.priceText}>IDR 000</Text>
          </View>
          <View style={styles.totalContent}>
            <Text style={styles.infoText}>Tax</Text>
            <Text style={styles.priceText}>IDR 000</Text>
          </View>
        </View>
        <View style={styles.finalTotalContainer}>
          <Text style={styles.finalTotal}>TOTAL:</Text>
          <Text style={styles.finalTotal}>IDR 000</Text>
        </View>
      </View>
      <View style={styles.finalContainer}>
        <TouchableOpacity style={styles.applyAndCheckoutBtn}>
          <Text style={styles.btnText}>Apply Delivery Coupon</Text>
          <Arrow style={styles.arrow} name="arrow-right-l" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyAndCheckoutBtn}>
          <Chevron style={styles.chevron} name="chevron-right" />
          <Text style={styles.btnText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  totalContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderRadius: 20,
    marginHorizontal: 50,
    marginTop: 90,
    height: '45%',
    elevation: 3,
  },
  totalText: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#ADADAF',
    margin: 60,
  },
  totalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    fontWeight: 'bold',
    marginVertical: 20,
    fontSize: 18,
    color: '#ADADAF',
  },
  priceText: {
    fontSize: 18,
  },
  finalTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
  },
  finalTotal: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  finalContainer: {
    flex: 1,
    marginTop: 100,
    marginHorizontal: 50,
  },
  applyAndCheckoutBtn: {
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 63,
    backgroundColor: '#FFBA33',
  },
  btnText: {
    fontWeight: 'bold',
    color: 'rgba(106, 64, 41, 1)',
    fontSize: 23,
  },
  arrow: {
    fontWeight: 'bold',
    color: 'rgba(106, 64, 41, 1)',
    left: 60,
    fontSize: 23,
  },
  chevron: {
    right: 100,
    fontWeight: 'bold',
    color: 'rgba(106, 64, 41, 1)',
    fontSize: 23,
  },
});

export default Checkout;
