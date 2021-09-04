/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {finalTransaction, defaultItems} from '../redux/actions/cart';

const Payment = props => {
  const [modal, setModal] = useState(false);
  const {token} = props.auth.refreshToken;
  const shipping = 6000;
  const {cartItem, items} = props.cart;
  const cost = items.map(e => e.amount);
  const setTotal = items.map(e => e.amount.final_price * e.item);
  const costTotal = setTotal.reduce((acc, curr) => acc + curr);
  const taxAndFees = costTotal * (10 / 100);

  const paymentMethodArr = [
    {
      bank: 'bank',
      card: 'Card',
      cashOnDelivery: 'Cash On Delivery',
    },
  ];

  const showModal = visible => {
    setModal(visible);
  };

  const makeTransaction = () => {
    const newData = {
      item_id: cost.map(e => e.id),
      total: costTotal,
      tax: taxAndFees,
      item_amount: items.map(e => e.item),
      variant: cost.map(e => e.variant),
      payment_method: paymentMethodArr[0].bank,
    };
    props.finalTransaction(token, newData).then(() => {
      props.defaultItems();
      Alert.alert('transaction success');
      props.navigation.navigate('home');
    });
  };

  console.log(cartItem);

  return (
    <View style={styles.parent}>
      <Modal
        visible={modal}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
          showModal(true);
        }}>
        <View style={styles.modalParent}>
          <View style={styles.modalContainer}>
            <View style={styles.customTextContainer}>
              <Text style={styles.customText}>Continue buying?</Text>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={makeTransaction}
                activeOpacity={0.5}>
                <Text>Ok</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => setModal(false)}
                activeOpacity={0.5}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.content1}>
          <View style={{marginVertical: 20}}>
            <Text style={styles.paymentText}>Payment</Text>
          </View>
          <View>
            <View style={styles.primaryPaymentMethod}>
              <Image style={styles.paymentPicture} />
              <View style={styles.userPayment}>
                <Text style={styles.userPaymentText1}>Lorem ipsum</Text>
                <Text style={styles.userPaymentText2}>User Name</Text>
              </View>
            </View>
            <View style={styles.paymentContainer}>
              <Text style={styles.chooseAnotherPaymentText}>
                Choose another payment method
              </Text>
              <View style={styles.paymentMethod2}>
                <View style={{flexDirection: 'row'}}>
                  <Image style={styles.paymentPicture} />
                  <View style={styles.userPayment}>
                    <Text style={styles.userPaymentText1}>
                      Credit or Debit Card
                    </Text>
                    <Text style={styles.userPaymentText2}>User Name</Text>
                  </View>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name="chevron-right" size={20} />
                </View>
              </View>
              <View style={styles.paymentMethod2}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Image style={styles.paymentPicture} />
                  <View style={styles.userPayment}>
                    <Text style={styles.userPaymentText1}>
                      Cash On Delivery
                    </Text>
                    <Text style={styles.userPaymentText2}>User Name</Text>
                  </View>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name="chevron-right" size={20} />
                </View>
              </View>
              <View style={styles.paymentMethod2}>
                <View style={{flexDirection: 'row'}}>
                  <Image style={styles.paymentPicture} />
                  <View style={styles.userPayment}>
                    <Text style={styles.userPaymentText1}>Paypal</Text>
                    <Text style={styles.userPaymentText2}>User Name</Text>
                  </View>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name="chevron-right" size={20} />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.content2}>
          <Text style={styles.orderSummaryText}>Order Summary</Text>
          <View>
            <FlatList
              keyExtractor={idx => String(idx)}
              data={items}
              renderItem={({item}) => {
                console.log(item.item);
                return (
                  <View style={styles.orderItem}>
                    <View style={styles.orderContainer}>
                      <Image style={styles.itemImg} />
                      <View style={styles.itemName}>
                        <Text style={styles.primaryText}>
                          {item.amount.name}
                        </Text>
                        <Text style={styles.primaryText}>
                          {item.amount.variant}
                        </Text>
                        <Text style={styles.primaryText}>{item.item} X</Text>
                      </View>
                      <View style={styles.finalPriceContainer}>
                        <Text style={styles.finalPrice}>
                          IDR{' '}
                          {Number(item.amount.final_price).toLocaleString(
                            'ind',
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.totalText}>
            <View style={styles.totalContent}>
              <Text style={styles.infoText}>Item Total</Text>
              <Text style={styles.priceText}>
                IDR {Number(costTotal).toLocaleString('ind')}
              </Text>
            </View>
            <View style={styles.totalContent}>
              <Text style={styles.infoText}>Tax and Fees</Text>
              <Text style={styles.priceText}>
                IDR {Number(taxAndFees).toLocaleString('ind')}
              </Text>
            </View>
            <View style={styles.totalContent}>
              <Text style={styles.infoText}>Delivery Charge</Text>
              <Text style={styles.priceText}>
                IDR {Number(shipping).toLocaleString('ind')}
              </Text>
            </View>
          </View>
          <View style={styles.finalTotalContainer}>
            <Text style={styles.finalTotal}>TOTAL:</Text>
            <Text style={styles.finalTotal}>
              IDR{' '}
              {Number(costTotal + shipping + taxAndFees).toLocaleString('ind')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => showModal(true)}
            style={styles.completePaymentButton}>
            <Text style={styles.completePaymentText}>Complete Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // content: {
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  content1: {
    backgroundColor: '#362115',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  modalParent: {
    position: 'absolute',
    width: '100%',
    paddingVertical: 100,
    paddingHorizontal: 20,
    backgroundColor: '#000000a0',
    height: '100%',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  customTextContainer: {
    backgroundColor: 'rgba(106, 64, 41, 1)',
    justifyContent: 'center',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    padding: 15,
  },
  customText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  btnContainer: {
    flexDirection: 'row',
    paddingVertical: 70,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  primaryBtn: {
    width: 100,
    alignItems: 'center',
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
  },
  primaryText: {
    color: 'rgba(106, 64, 41, 1)',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  paymentContainer: {
    marginVertical: 20,
  },
  paymentText: {
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
  },
  chooseAnotherPayment: {
    flexDirection: 'column',
  },
  chooseAnotherPaymentText: {
    fontSize: 17,
    fontFamily: 'Poppins-Light',
    color: '#fff',
  },
  paymentText2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  paymentMethod2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
  },
  primaryPaymentMethod: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
  },
  paymentPicture: {
    width: 50,
    marginHorizontal: 25,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 25,
  },
  userPayment: {
    flexDirection: 'column',
  },
  userPaymentText1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  userPaymentText2: {
    textTransform: 'uppercase',
  },
  content2: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginBottom: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 3,
  },
  orderSummaryText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 20,
    left: 30,
    top: 20,
  },
  totalText: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#ADADAF',
    margin: 20,
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
    fontFamily: 'Poppins-Medium',
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
    top: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completePaymentText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  orderItem: {
    padding: 30,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemImg: {
    width: 54,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'grey',
  },
  itemName: {
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  finalPriceContainer: {
    justifyContent: 'center',
  },
  finalPrice: {
    fontSize: 20,
  },
});

const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth,
});

const mapDispatchToProps = {finalTransaction, defaultItems};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
