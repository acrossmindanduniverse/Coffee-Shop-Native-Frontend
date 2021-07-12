/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {addItemsToCart} from '../../redux/actions/cart';
import {
  getItemsAndVariants,
  getDetailItemVariant,
} from '../../redux/actions/items';

const ProductDetail = props => {
  const {params} = props.route;
  const {itemsAndVariants, variantDetail} = props.items;
  const variant = itemsAndVariants.map(row => row.variant_code);
  const [_, setScreenTab] = useState();
  // const [newItem, setNewItem] = useState([]);
  // const [cart, setCart] = useState();

  const handleVariantTouch = (id, tab) => {
    props.getDetailItemVariant(id, tab);
    setScreenTab(tab);
  };

  // console.log(props.cart.cartItem);

  const handleAddItem = data => {
    props.addItemsToCart(data);
  };

  useEffect(() => {
    props.getDetailItemVariant(params, variant[0]);
  }, [itemsAndVariants]);

  // useEffect(() => {
  //   const getVariants = allItems => {
  //     const allItemsArr = [];
  //     allItems.map(row => {
  //       if (row.variant_code === screenTab) {
  //         if (!allItemsArr.includes(row.variant_code)) {
  //           allItemsArr.push(row);
  //         }
  //       }
  //     });
  //     setNewItem(allItemsArr);
  //   };
  //   getVariants(itemsAndVariants);
  // }, [itemsAndVariants, screenTab]);

  useEffect(() => {
    if (variant) {
      setScreenTab(variant[0]);
    }
  }, [null]);

  useEffect(() => {
    props.getItemsAndVariants(params);
  }, []);

  return (
    variantDetail[0] !== undefined && (
      <View style={styles.parent}>
        <View>
          <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.imageParent}>
                <View style={styles.image} />
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
            <Text style={styles.price}>IDR {variantDetail[0].final_price}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleAddItem(variantDetail[0])}
            style={styles.shoppingCart}>
            <Icon style={styles.icon} name="shopping-cart" />
          </TouchableOpacity>
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
});

const mapStateToProps = state => ({
  items: state.items,
  cart: state.cart,
});

const mapDispatchToProps = {
  getItemsAndVariants,
  getDetailItemVariant,
  addItemsToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
