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
        style={styles.modal}
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
                <Text style={styles.primaryText2}>Ok</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => setModal(false)}
                activeOpacity={0.5}>
                <Text style={styles.primaryText2}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.content}>
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
                    <Text style={styles.userPaymentText1}>
                      Cash On Delivery
                    </Text>
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
          <View>
            <FlatList
              style={styles.itemContainer}
              data={items}
              renderItem={({item}) => {
                console.log(item.item);
                return (
                  <View style={styles.orderItem}>
                    <View style={styles.orderContainer}>
                      <Image style={styles.itemImg} />
                      <View stlye={styles.itemName}>
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
              keyExtractor={idx => String(idx)}
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
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content1: {
    backgroundColor: '#362115',
    height: 570,
  },
  modalParent: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#000000a0',
    height: '100%',
  },
  modalContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 60,
    marginVertical: 200,
    borderRadius: 20,
  },
  customTextContainer: {
    backgroundColor: 'rgba(106, 64, 41, 1)',
    justifyContent: 'center',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    height: 80,
  },
  customText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical: 70,
    top: 20,
    marginHorizontal: 90,
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
    marginTop: 50,
    left: 18,
    alignItems: 'center',
  },
  paymentText: {
    fontFamily: 'Poppins-Black',
    fontSize: 30,
    color: '#fff',
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
  paymentText2: {
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
    marginBottom: 20,
    borderRadius: 20,
    marginHorizontal: 50,
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
    marginHorizontal: 100,
    top: 10,
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
  itemContainer: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
  // orderItem: {
  //   flexDirection: 'row',
  // },
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
    left: 19,
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
