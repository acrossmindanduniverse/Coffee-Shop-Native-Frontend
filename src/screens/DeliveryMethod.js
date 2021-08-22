import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {getUserSigned} from '../redux/actions/user';

const DeliveryMethod = props => {
  const {token} = props.auth.refreshToken;
  const user = props.user.user[0];
  const {items} = props.cart;
  const newItems = items.map(e => e.amount);
  const addItems = newItems.map(e => e.final_price);
  const total = addItems.reduce((acc, curr) => acc + curr);

  console.log(user.user_address, 'delivery method');

  useEffect(() => {
    props.getUserSigned(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  console.log(addItems.reduce((acc, curr) => acc + curr));
  return (
    <View style={styles.parent}>
      <View style={styles.checkoutContainer}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.primaryText}>Address</Text>
          <View style={styles.addressInputContent}>
            <View style={styles.streetNameContainer}>
              <Text style={styles.streetNameText}>Street name</Text>
            </View>
            <SafeAreaView style={styles.addressInput}>
              <TextInput
                style={styles.addressPlaceHolder}
                placeholder="Add delivery address"
              />
              <Text style={styles.addBtn}>+</Text>
            </SafeAreaView>
          </View>
        </View>
        <View style={styles.deliveryTimeContainer}>
          <Text style={styles.primaryText}>Delivery and time</Text>
          <View style={styles.deliveryOptions}>
            <TouchableOpacity style={styles.deliveryTimeBtn}>
              <Text style={styles.deliveryTimeBtnText}>Dine in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deliveryTimeBtn}>
              <Text style={styles.deliveryTimeBtnText}>Door Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deliveryTimeBtn}>
              <Text style={styles.deliveryTimeBtnText}>Pick up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.yesOrNoOptionsBtnContainer}>
            <View style={styles.secondaryTextContainer}>
              <Text stlye={styles.secondaryText}>Now</Text>
            </View>
            <View style={styles.yesOrNoOptionsBtnContent}>
              <TouchableOpacity style={styles.yesOrNoOptionsBtn}>
                <Text style={styles.yesOrNoOptionsBtnText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.yesOrNoOptionsBtn}>
                <Text style={styles.yesOrNoOptionsBtnText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.setTimeContainer}>
            <Text stlye={styles.secondaryText}>Set time</Text>
            <SafeAreaView style={styles.timeInputContainer}>
              <TextInput
                style={styles.timeInput}
                placeholder="Enter for reservation"
              />
            </SafeAreaView>
          </View>
        </View>
        <View style={styles.costContainer}>
          <Text style={styles.primaryText}>Cost</Text>
          <Text style={styles.primaryText}>
            IDR {Number(total).toLocaleString('ind')}
          </Text>
        </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  checkoutContainer: {
    height: 414,
    bottom: 30,
    backgroundColor: '#6A4029',
    borderRadius: 30,
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
  addressInputContent: {
    top: 35,
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
  addressContainer: {
    backgroundColor: '#fff',
    height: 300,
    borderRadius: 20,
  },
  addressInput: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F8',
    borderRadius: 20,
    height: 60,
    alignItems: 'center',
    margin: 25,
    justifyContent: 'space-between',
  },
  addressPlaceHolder: {
    left: 16,
  },
  addBtn: {
    fontSize: 25,
    right: 16,
  },
  yesOrNoOptionsBtnContainer: {
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
  },
  secondaryTextContainer: {
    marginHorizontal: 31,
  },
  secondaryText: {
    fontSize: 30,
    color: '#F4F4F8',
  },
  yesOrNoOptionsBtnContent: {
    flexDirection: 'row',
    left: 64,
  },
  yesOrNoOptionsBtnText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 15,
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
    marginHorizontal: 31,
    fontSize: 23,
    marginTop: 20,
    fontWeight: 'bold',
  },
  deliveryOptions: {
    flexDirection: 'row',
    margin: 20,
  },
  deliveryTimeBtn: {
    backgroundColor: '#F4F4F8',
    justifyContent: 'center',
    marginHorizontal: 15,
    width: 106,
    height: 41,
    borderRadius: 10,
  },
  deliveryTimeBtnText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 15,
  },
  costContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignContent: 'center',
    borderRadius: 20,
    height: 65,
    marginVertical: 48,
  },
  deliveryTimeContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    top: 24,
    height: 300,
  },
  confirmBtn: {
    backgroundColor: '#6A4029',
    borderRadius: 20,
    height: 70,
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
