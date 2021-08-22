/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
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
  const [_, setScreenTab] = useState();
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
      }, 200);
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
        <View>
          <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.imageParent}>
                {console.log(variantDetail[0].picture, 'picture')}
                <Image
                  style={styles.image}
                  source={{uri: `${itemsAndVariants[1].picture}`}}
                />
                <Text style={styles.itemText}>{variantDetail[0].name}</Text>
                <Text style={styles.deliveryInfo}>
                  {variantDetail[0].delivery_on}
                </Text>
              </View>
            </View>
            <FlatList
              style={styles.variantContainer}
              data={variant}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleVariantTouch(params, item)}
                  style={styles.variant}>
                  <Text style={styles.variantText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={index => String(index)}
            />
          </View>
          <View style={styles.itemDescription}>
            <Text style={styles.itemDescriptionText}>
              {variantDetail[0].item_description}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              IDR {Number(variantDetail[0].final_price).toLocaleString('ind')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleAddItem(variantDetail[0], amount)}
            style={styles.shoppingCart}>
            <Icon style={styles.icon} name="shopping-cart" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 40,
          }}>
          <View
            style={{
              height: 40,
            }}>
            {added && (
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 18,
                  color: '#fff',
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
  },
  itemContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  imageParent: {
    width: 400,
    height: 550,
    backgroundColor: '#FFBA33',
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: PictureSize[0],
    marginTop: 30,
    backgroundColor: 'grey',
    height: PictureSize[0],
    borderRadius: PictureSize[0] / 2,
  },
  itemText: {
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 30,
    textTransform: 'uppercase',
  },
  deliveryInfo: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
    marginHorizontal: 30,
    justifyContent: 'flex-end',
  },
  variantContainer: {
    flexDirection: 'column',
    marginRight: 20,
    marginHorizontal: 50,
  },
  variant: {
    width: PictureSize[1],
    height: PictureSize[1],
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
    borderRadius: PictureSize[1] / 2,
    backgroundColor: 'grey',
  },
  variantText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  itemDescription: {
    margin: 50,
  },
  itemDescriptionText: {
    fontWeight: 'bold',
    textAlign: 'justify',
    fontSize: 25,
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    height: 130,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 45,
    color: '#fff',
    marginLeft: 30,
    fontWeight: 'bold',
  },
  shoppingCart: {
    width: PictureSize[1],
    height: PictureSize[1],
    borderRadius: PictureSize[1] / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    backgroundColor: '#EBEBEB',
  },
  icon: {
    fontSize: 30,
    color: '#362115',
  },
  amountContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    height: 70,
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#362115',
  },
  primaryBtn: {
    marginHorizontal: 70,
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
