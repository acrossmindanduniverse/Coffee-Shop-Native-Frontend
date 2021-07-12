import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const DeliveryMethod = () => {
  return (
    <View style={styles.parent}>
      <View style={styles.checkoutContainer}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </View>
      <ScrollView style={styles.infoContainer}>
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
        <View stlye={styles.costContainer}>
          <View>
            <Text style={styles.primaryText}>Cost</Text>
          </View>
          <View>
            <Text style={styles.primaryText}>IDR 000</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.confirmBtn}>
        <Text style={styles.confirmBtnText}>Confirm and pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  checkoutContainer: {
    height: 290,
    bottom: 30,
    backgroundColor: '#6A4029',
    borderRadius: 30,
  },
  checkoutText: {
    top: 45,
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginHorizontal: 50,
    bottom: 150,
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
    height: 280,
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
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
  yesOrNoOptionsBtn: {
    marginHorizontal: 15,
    width: 106,
    justifyContent: 'center',
    height: 41,
    backgroundColor: 'grey',
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
    backgroundColor: 'grey',
    justifyContent: 'center',
    marginHorizontal: 15,
    width: 106,
    height: 41,
    borderRadius: 10,
  },
  deliveryTimeBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
  deliveryTimeContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    top: 24,
    height: 280,
  },
  confirmBtn: {
    backgroundColor: '#6A4029',
    borderRadius: 20,
    marginHorizontal: 50,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
});

export default DeliveryMethod;
