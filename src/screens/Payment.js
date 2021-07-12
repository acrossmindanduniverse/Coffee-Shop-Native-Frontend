import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  // ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Payment = () => {
  return (
    <View style={styles.parent}>
      <View style={styles.content1}>
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentText}>Payment</Text>
          <View style={styles.paymentMethod}>
            <Image style={styles.paymentPicture} />
            <View style={styles.userPayment}>
              <Text style={styles.userPaymentText1}>
                Lorem ipsum dolor sit amet
              </Text>
              <Text style={styles.userPaymentText2}>User Name</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.paymentContainer2}>
            <View style={styles.chooseAnotherPayment}>
              <Text style={styles.chooseAnotherPaymentText}>
                Choose another payment method
              </Text>
              <View style={styles.paymentMethod2}>
                <View style={styles.paymentMethodFirstContent}>
                  <Image style={styles.paymentPicture} />
                  <View style={styles.userPayment}>
                    <Text style={styles.userPaymentText1}>
                      Credit or Debit Card
                    </Text>
                    <Text style={styles.userPaymentText2}>User Name</Text>
                  </View>
                </View>
                <View style={styles.chevronRight}>
                  <Icon name="chevron-right" size={20} />
                </View>
              </View>
            </View>
            <View style={styles.paymentMethod2}>
              <View style={styles.paymentMethodFirstContent}>
                <Image style={styles.paymentPicture} />
                <View style={styles.userPayment}>
                  <Text style={styles.userPaymentText1}>Cash On Delivery</Text>
                  <Text style={styles.userPaymentText2}>User Name</Text>
                </View>
              </View>
              <View style={styles.chevronRight}>
                <Icon name="chevron-right" size={20} />
              </View>
            </View>
            <View style={styles.paymentMethod2}>
              <View style={styles.paymentMethodFirstContent}>
                <Image style={styles.paymentPicture} />
                <View style={styles.userPayment}>
                  <Text style={styles.userPaymentText1}>Paypal</Text>
                </View>
              </View>
              <View style={styles.chevronRight}>
                <Icon name="chevron-right" size={20} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.content2}>
        <Text style={styles.orderSummaryText}>Order Summary</Text>
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
        <TouchableOpacity style={styles.completePaymentButton}>
          <Text style={styles.completePaymentText}>Complete Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
  },
  content1: {
    backgroundColor: '#362115',
    height: 570,
  },
  paymentContainer: {
    marginTop: 50,
    left: 18,
    alignItems: 'center',
  },
  paymentContainer2: {
    marginTop: 50,
    alignItems: 'center',
  },
  chooseAnotherPayment: {
    flexDirection: 'column',
  },
  chooseAnotherPaymentText: {
    fontSize: 17,
    color: '#fff',
  },
  paymentText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  paymentMethod2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 10,
    width: 450,
    borderRadius: 15,
    height: 70,
  },
  paymentMethodFirstContent: {
    flexDirection: 'row',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 60,
    width: 450,
    marginRight: 40,
    borderRadius: 15,
    height: 70,
  },
  chevronRight: {
    right: 30,
  },
  paymentPicture: {
    width: 50,
    marginHorizontal: 25,
    marginRight: 44,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 25,
  },
  userPayment: {
    flexDirection: 'column',
    marginRight: 190,
  },
  userPaymentText1: {
    fontWeight: 'bold',
  },
  userPaymentText2: {
    textTransform: 'uppercase',
  },
  content2: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderRadius: 20,
    marginHorizontal: 50,
    height: '40%',
    elevation: 3,
  },
  orderSummaryText: {
    fontWeight: 'bold',
    fontSize: 30,
    left: 30,
    top: 20,
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
  completePaymentButton: {
    backgroundColor: '#362115',
    marginHorizontal: 90,
    top: 20,
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completePaymentText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Payment;
