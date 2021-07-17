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
import NoOrder from '../../components/NoOrder';

const Cart = props => {
  const {cartItem, items} = props.cart;

  return items.length > 0 ? (
    <View style={styles.parent}>
      <Text style={styles.cartItem}>Cart</Text>
      <View style={styles.cartItemContent}>
        <View style={styles.swipeContainer}>
          <MaterialIcons style={styles.icon} name="gesture-swipe-left" />
          <Text style={styles.swipeText}>swipe item to delete</Text>
        </View>
        <ScrollView style={styles.cartItemContainer}>
          <SwipeListView
            data={items}
            renderItem={(itemData, idx) => {
              console.log(itemData, 'test');
              return (
                <View key={idx} style={styles.cart}>
                  <View style={styles.itemImageContainer}>
                    <Image style={styles.itemImage} />
                  </View>
                  <View>
                    <Text style={styles.itemName}>
                      {itemData.item.amount.name}
                    </Text>
                    <Text style={styles.itemInfo}>
                      IDR {itemData.item.amount.final_price}
                    </Text>
                  </View>
                </View>
              );
            }}
            renderHiddenItem={data => (
              <View key={data} style={styles.iconContent}>
                <View style={styles.heartContainer}>
                  <FontAwesome style={styles.heartIcon} name="heart-o" />
                </View>
                <View style={styles.trashContainer}>
                  <EvillCons style={styles.trashIcon} name="trash" />
                </View>
              </View>
            )}
            rightOpenValue={-120}
          />
        </ScrollView>
      </View>
      {/* onPress={props.navigation.navigate('payment')} */}
      <TouchableOpacity
        style={styles.confirmContainer}
        onPress={() => props.navigation.navigate('deliveryMethod')}>
        <Text style={styles.confirmText}>Confirm and Checkout</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <NoOrder />
  );
};

const styles = StyleSheet.create({
  parent: {
    marginVertical: 90,
    flex: 1,
  },
  cartItem: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 34,
  },
  cartItemContent: {
    margin: 50,
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
  cartItemContainer: {
    height: 490,
    bottom: 90,
    marginVertical: 150,
  },
  cart: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 110,
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
    fontWeight: 'bold',
  },
  itemInfo: {
    fontSize: 15,
    color: 'rgba(106, 64, 41, 1)',
  },
  deliveryInfo: {
    fontSize: 13,
    width: 150,
    color: 'rgba(106, 64, 41, 1)',
  },
  iconContent: {
    marginLeft: 380,
    flexDirection: 'row',
  },
  trashContainer: {
    width: 45,
    marginTop: 50,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45 / 2,
    backgroundColor: '#FFBA33',
  },
  heartContainer: {
    width: 45,
    marginTop: 50,
    right: 15,
    height: 45,
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
  amountContainer: {
    top: 20,
    width: 71,
    height: 24,
  },
  amountCounter: {
    borderRadius: 30,
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  amountText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
  counterBtn: {
    marginHorizontal: 10,
  },
  confirmContainer: {
    backgroundColor: '#6A4029',
    borderRadius: 20,
    marginHorizontal: 50,
    height: 70,
    justifyContent: 'center',
    bottom: 90,
  },
  confirmText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = {addItems};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
