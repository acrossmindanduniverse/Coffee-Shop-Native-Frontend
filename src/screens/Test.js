import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

export default function Test(props) {
  const [checked, setChecked] = useState('');

  const proceed = data => {
    setChecked(data);
  };

  return (
    <View style={styles.parent}>
      <View style={styles.deliveryAddress}>
        <Text style={styles.deliveryText}>Delivery</Text>
        <View style={styles.changingAddress}>
          <Text style={styles.addressDetails}>Address Details</Text>
          <Text style={styles.changeAddress}>Change</Text>
        </View>
        <View style={styles.addressContainer}>
          <SafeAreaView style={styles.inputContent}>
            <TextInput placeholder="Street" />
            <TextInput placeholder="Street Details" />
            <TextInput placeholder="phoneNumber" />
          </SafeAreaView>
        </View>
        <View style={styles.deliveryContainer}>
          <View style={styles.radioButton}>
            <RadioButton
              value="Door Delivery"
              status={checked === 'Door Delivery' ? 'checked' : 'unchecked'}
              color="rgba(106, 64, 41, 1)"
              onPress={() => setChecked('Door Delivery')}
            />
            <RadioButton
              value="Self Pick Up"
              status={checked === 'Self Pick Up' ? 'checked' : 'unchecked'}
              color="rgba(106, 64, 41, 1)"
              onPress={() => setChecked('Self Pick Up')}
            />
            <RadioButton
              value="Dine In"
              status={checked === 'Dine In' ? 'checked' : 'unchecked'}
              color="rgba(106, 64, 41, 1)"
              onPress={() => setChecked('Dine In')}
            />
          </View>
        </View>
      </View>
      <View style={styles.totalInfo}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.price}>IDR 000</Text>
      </View>
      <View style={styles.paymentButtonContainer}>
        <TouchableOpacity onPress={() => proceed(() => console.log)}>
          <Text style={styles.paymentText}>Proceed to payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: 50,
  },
  deliveryAddress: {
    marginTop: 30,
  },
  deliveryText: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  addressDetails: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  changeAddress: {
    color: 'rgba(106, 64, 41, 1)',
  },
  changingAddress: {
    marginVertical: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  addressContainer: {
    elevation: 2,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  inputContent: {
    margin: 10,
  },
  deliveryContainer: {
    elevation: 2,
    backgroundColor: '#fff',
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 40,
  },
  checked: {
    color: 'rgba(106, 64, 41, 1)',
  },
  unchecked: {
    color: '#fff',
  },
  totalInfo: {
    flexDirection: 'row',
    marginVertical: 100,
    marginHorizontal: 40,
    justifyContent: 'space-between',
  },
  total: {
    fontSize: 30,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  paymentButtonContainer: {
    height: 60,
    marginHorizontal: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#6A4029',
  },
  paymentText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
