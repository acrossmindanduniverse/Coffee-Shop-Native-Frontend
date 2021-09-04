/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvillCons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {addItems} from '../redux/actions/cart';
import {connect} from 'react-redux';
import NoOrderBg from '../../assets/Group-66.png';
import {deleteFromCart} from './../redux/actions/cart';
import {API_URL} from '@env';

const Cart = props => {
  const {items} = props.cart;
  const [item, setItem] = useState([]);
  const [close, setClose] = useState(false);

  const deleteItem = data => {
    props.deleteFromCart({item: data});
    setClose(true);
  };

  useEffect(() => {
    if (close) {
      setClose(false);
    }
  }, [close]);

  console.log(close, 'test items 123123');

  return items.length > 0 ? (
    <View style={styles.parent}>
      <View style={{flex: 1}}>
        <View
          style={{
            padding: 25,
          }}>
          <Text style={styles.cartItem}>Cart</Text>
          <View style={styles.swipeContainer}>
            <MaterialIcons style={styles.icon} name="gesture-swipe-left" />
            <Text style={styles.swipeText}>swipe item to delete</Text>
          </View>
        </View>
        <ScrollView style={{padding: 15}}>
          <SwipeListView
            closeOnRowPress={close}
            data={items}
            renderItem={(itemData, idx) => {
              return (
                <View
                  onTouchMove={() => setItem(itemData.item)}
                  key={idx}
                  style={styles.cart}>
                  <View style={styles.itemImageContainer}>
                    <Image
                      style={styles.itemImage}
                      source={{uri: `${API_URL}${itemData.item.picture}`}}
                    />
                  </View>
                  <View>
                    <Text style={styles.itemName}>
                      {itemData.item.amount.name}
                    </Text>
                    <Text style={styles.itemInfo}>
                      IDR{' '}
                      {Number(itemData.item.amount.final_price).toLocaleString(
                        'ind',
                      )}
                    </Text>
                  </View>
                </View>
              );
            }}
            renderHiddenItem={data => (
              <View key={data} style={styles.iconContent}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={styles.heartContainer}>
                    <FontAwesome style={styles.heartIcon} name="heart-o" />
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteItem(item)}
                    style={styles.trashContainer}>
                    <EvillCons style={styles.trashIcon} name="trash" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            rightOpenValue={-160}
          />
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity
          style={styles.confirmContainer}
          onPress={() => props.navigation.navigate('deliveryMethod')}>
          <Text style={styles.confirmText}>Confirm and Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.parent2}>
      <View style={styles.firstContent}>
        <View style={styles.bgContainer}>
          <Image source={NoOrderBg} />
          <View>
            <Text style={styles.noOrderText}>No orders yet</Text>
            <Text style={styles.hitBtn}>
              Hit the brown button down below to Create an order
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.btnOrder}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('home')}
          style={styles.btn}>
          <Text style={styles.orderText}>Start ordering</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingBottom: 20,
  },
  parent2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  cartItem: {
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 34,
  },
  swipeContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    fontSize: 25,
    marginHorizontal: 4,
  },
  swipeText: {
    fontSize: 20,
  },
  cart: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 17,
  },
  itemImageContainer: {
    marginHorizontal: 20,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'grey',
  },
  itemName: {
    fontSize: 25,
    fontFamily: 'Poppins-Medium',
  },
  itemInfo: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: 'rgba(106, 64, 41, 1)',
  },
  iconContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 55,
    alignContent: 'flex-end',
  },
  trashContainer: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45 / 2,
    backgroundColor: '#FFBA33',
  },
  heartContainer: {
    width: 45,
    height: 45,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45 / 2,
    backgroundColor: '#FFBA33',
  },
  trashIcon: {
    color: '#6A4029',
    fontSize: 30,
  },
  heartIcon: {
    color: '#6A4029',
    fontSize: 25,
  },
  btnOrder: {
    padding: 30,
  },
  counterBtn: {
    marginHorizontal: 10,
  },
  firstContent: {
    flex: 1,
    justifyContent: 'center',
  },
  confirmContainer: {
    backgroundColor: '#6A4029',
    borderRadius: 20,
    marginHorizontal: 30,
    padding: 30,
    justifyContent: 'center',
  },
  confirmText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
  bgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrderText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
  },
  hitBtn: {
    fontSize: 25,
    textAlign: 'center',
  },
  btn: {
    padding: 20,
    paddingHorizontal: 100,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
  },
  orderText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = {addItems, deleteFromCart};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
