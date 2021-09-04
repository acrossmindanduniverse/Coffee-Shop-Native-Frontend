/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {addItems} from '../redux/actions/cart';
import {
  getItemsAndVariants,
  getDetailItemVariant,
} from '../redux/actions/items';

const ProductDetail = props => {
  const {params} = props.route;
  const {itemsAndVariants, variantDetail} = props.items;
  const [added, setAdded] = useState(false);
  const variant = itemsAndVariants.map(row => row.variant_code);
  const [screenTab, setScreenTab] = useState();
  const [amount, setAmount] = useState(1);

  const handleVariantTouch = (id, tab) => {
    props.getDetailItemVariant(id, tab);
    setScreenTab(tab);
  };

  const handleAddItem = (data, data2) => {
    props.addItems(data, data2);
    setAdded(true);
  };

  useEffect(() => {
    if (added) {
      setAmount(1);
      setTimeout(() => {
        setAdded(false);
      }, 1000);
    }
  }, [added]);

  useEffect(() => {
    props.getDetailItemVariant(params, variant[0]);
  }, [params, variant[0]]);

  useEffect(() => {
    if (variant) {
      setScreenTab(variant[0]);
    }
  }, [null]);

  useEffect(() => {
    props.getItemsAndVariants(params);
  }, []);

  console.log(props.cart);

  const onIncrease = () => {
    if (amount !== variantDetail[0].quantity) {
      setAmount(amount + 1);
    }
  };

  const onDecrease = () => {
    if (variantDetail[0].quantity >= 0) {
      setAmount(amount - 1);
    }
  };

  return (
    variantDetail[0] !== undefined && (
      <View style={styles.parent}>
        <ScrollView style={{flex: 1}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.info1}>
                <Image
                  style={styles.image}
                  source={{uri: `${itemsAndVariants[1].picture}`}}
                />
                <View style={{flexDirection: 'column', padding: 20}}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.itemText}>{variantDetail[0].name}</Text>
                    <Text style={styles.deliveryInfo}>
                      {variantDetail[0].delivery_on}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{padding: 30}}>
                <FlatList
                  keyExtractor={index => String(index)}
                  data={variant}
                  renderItem={({item}) => (
                    <View style={styles.variantContainer}>
                      <TouchableOpacity
                        onPress={() => handleVariantTouch(params, item)}
                        style={
                          item === screenTab
                            ? styles.exacVariant
                            : styles.variant
                        }>
                        <Text style={styles.variantText}>{item}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>
            <View
              style={{
                padding: 15,
                flexDirection: 'column',
              }}>
              <View>
                <Text style={styles.itemDescriptionText}>
                  {variantDetail[0].item_description}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.price}>
                    IDR{' '}
                    {Number(variantDetail[0].final_price).toLocaleString('ind')}
                  </Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => handleAddItem(variantDetail[0], amount)}
                    style={styles.shoppingCart}>
                    <Icon style={styles.icon} name="shopping-cart" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View>
          <View
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {added && (
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 18,
                  color: '#FFBA33',
                }}>
                Item added to cart
              </Text>
            )}
          </View>
          <View style={styles.amountContainer}>
            <TouchableOpacity
              disabled={amount === 1}
              onPress={onDecrease}
              style={styles.primaryBtn}>
              <Text style={styles.primaryAmount}>-</Text>
            </TouchableOpacity>
            <Text style={styles.primaryAmount}>{amount}</Text>
            <TouchableOpacity
              disabled={amount > variantDetail[0].quantity}
              onPress={onIncrease}
              style={styles.primaryBtn}>
              <Text style={styles.primaryAmount}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  );
};
const PictureSize = [200, 80];

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#362115',
    paddingBottom: 5,
  },
  info1: {
    padding: 30,
    flex: 1,
    backgroundColor: '#FFBA33',
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: PictureSize[0],
    backgroundColor: 'grey',
    height: PictureSize[0],
    borderRadius: PictureSize[0] / 2,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 15,
    textTransform: 'uppercase',
  },
  deliveryInfo: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  variantContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variant: {
    width: PictureSize[1],
    height: PictureSize[1],
    justifyContent: 'center',
    marginVertical: 15,
    alignItems: 'center',
    borderRadius: PictureSize[1] / 2,
    backgroundColor: 'grey',
  },
  exacVariant: {
    width: PictureSize[1],
    height: PictureSize[1],
    justifyContent: 'center',
    marginVertical: 15,
    alignItems: 'center',
    borderRadius: PictureSize[1] / 2,
    backgroundColor: '#FFBA33',
  },
  variantText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  itemDescriptionText: {
    fontWeight: 'bold',
    textAlign: 'justify',
    fontSize: 25,
    color: '#fff',
  },
  price: {
    fontSize: 45,
    color: '#fff',
    fontWeight: 'bold',
  },
  shoppingCart: {
    width: PictureSize[1],
    height: PictureSize[1],
    borderRadius: PictureSize[1] / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
  },
  icon: {
    fontSize: 30,
    color: '#362115',
  },
  amountContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  primaryAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  primaryBtn: {
    backgroundColor: '#FFBA33',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
});

const mapStateToProps = state => ({
  items: state.items,
  cart: state.cart,
});

const mapDispatchToProps = {
  getItemsAndVariants,
  getDetailItemVariant,
  addItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
