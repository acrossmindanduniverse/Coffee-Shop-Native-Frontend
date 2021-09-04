/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {getUserSigned} from '../redux/actions/user';

const DeliveryMethod = props => {
  const {token} = props.auth.refreshToken;
  const user = props.user.user[0];
  const {items} = props.cart;
  const newItems = items.map(e => e.amount);
  const addItems = newItems.map(e => e.final_price);
  const total = addItems.reduce((acc, curr) => acc + curr);

  useEffect(() => {
    props.getUserSigned(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <View style={styles.parent}>
      <ScrollView>
        <View style={styles.checkoutContainer}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </View>
        <View
          style={{
            padding: 15,
            position: 'relative',
            bottom: 150,
          }}>
          <View style={styles.primaryContainer}>
            <Text style={styles.primaryText}>Address</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.primaryContent}>
                <Text style={styles.secondaryText}>Street Name</Text>
              </View>
              <View style={styles.delveryAddress}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <TextInput placeholder="Add delivery address" />
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.addBtn}>+</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.primaryContainer}>
            <Text style={styles.primaryText}>Delivery and time</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginHorizontal: 70,
              }}>
              <TouchableOpacity style={styles.primaryBtn}>
                <Text style={styles.secondaryText}>Dine In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryBtn}>
                <Text style={styles.secondaryText}>Door Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryBtn}>
                <Text style={styles.secondaryText}>Pick Up</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.tertiaryText}>Now</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.primaryBtn}>
                  <Text style={styles.secondaryText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryBtn}>
                  <Text style={styles.secondaryText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.tertiaryText}>Set time</Text>
              <View style={styles.reservationContainer}>
                <TextInput placeholder="Enter reservation" />
              </View>
            </View>
          </View>
          <View style={styles.costContainer}>
            <Text style={styles.costText}>Cost</Text>
            <Text style={styles.costText}>
              IDR {Number(total).toLocaleString('ind')}
            </Text>
          </View>
        </View>
      </ScrollView>
      {user.user_address !== null ? (
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => props.navigation.navigate('payment')}>
          <Text style={styles.confirmBtnText}>Confirm and pay</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => props.navigation.navigate('profile')}>
          <Text style={styles.confirmBtnText}>Please add address first</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#F4F4F8',
  },
  checkoutContainer: {
    height: 370,
    backgroundColor: '#6A4029',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  checkoutText: {
    top: 100,
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  infoContainer: {
    marginHorizontal: 50,
    bottom: 230,
  },
  delveryAddress: {
    backgroundColor: '#F4F4F8',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  streetNameContainer: {
    backgroundColor: '#F4F4F8',
    justifyContent: 'center',
    marginHorizontal: 30,
    height: 60,
    borderRadius: 20,
  },
  streetNameText: {
    left: 16,
  },
  primaryContainer: {
    backgroundColor: '#fff',
    elevation: 3,
    padding: 35,
    marginVertical: 15,
    borderRadius: 20,
  },
  reservationContainer: {
    backgroundColor: '#F4F4F8',
    flex: 1,
    marginLeft: 20,
    borderRadius: 10,
    padding: 12,
  },
  addBtn: {
    fontSize: 25,
  },
  secondaryText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins-Light',
  },
  tertiaryText: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  yesOrNoOptionsBtn: {
    marginHorizontal: 15,
    width: 106,
    justifyContent: 'center',
    height: 41,
    backgroundColor: '#F4F4F8',
    borderRadius: 10,
  },
  setTimeContainer: {
    flexDirection: 'row',
    top: 20,
    marginHorizontal: 31,
    alignItems: 'center',
  },
  timeInputContainer: {
    borderRadius: 15,
    backgroundColor: '#F4F4F8',
    marginLeft: 20,
    alignItems: 'center',
    width: 350,
    flexDirection: 'row',
  },
  timeInput: {
    marginLeft: 15,
  },
  primaryText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 23,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  primaryBtn: {
    backgroundColor: '#F4F4F8',
    justifyContent: 'center',
    padding: 15,
    marginHorizontal: 4,
    borderRadius: 10,
  },
  costContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignContent: 'center',
    borderRadius: 20,
  },
  costText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 23,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  confirmBtn: {
    backgroundColor: '#6A4029',
    borderRadius: 20,
    margin: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 18,
  },
});

const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {getUserSigned};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryMethod);
