import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {connect} from 'react-redux';

const Promo = props => {
  const {data} = props.items;
  console.log(props.items);
  return (
    <View style={styles.parent}>
      <View style={styles.favouriteContainer}>
        <Text style={styles.favourite}>Promo for you</Text>
        <Text style={styles.category}>Pick your good deals</Text>
        <Text style={styles.discounted}>The price has been discounted</Text>
      </View>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <View>
            <View style={styles.itemContainer}>
              <View style={styles.itemInfo}>
                <Image
                  style={styles.picture}
                  source={{uri: `${item.picture}`}}
                />
                <View style={styles.discountContainer}>
                  <Text style={styles.itemName}>10 %</Text>
                </View>
                <View style={styles.itemInfoContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    IDR {item.price - item.price * (10 / 100)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  favouriteContainer: {
    marginVertical: 50,
    alignItems: 'center',
  },
  favourite: {
    fontSize: 40,
    bottom: 40,
    fontWeight: 'bold',
  },
  discounted: {
    fontSize: 17,
  },
  category: {
    color: 'rgba(106, 64, 41, 1)',
    fontWeight: 'bold',
    fontSize: 40,
  },
  itemInfo: {
    alignItems: 'center',
  },
  picture: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    bottom: 75,
    backgroundColor: 'grey',
  },
  itemContainer: {
    top: 50,
    borderRadius: 25,
    marginHorizontal: 50,
    width: 180,
    height: 260,
    backgroundColor: '#fff',
    elevation: 2,
    margin: 40,
  },
  discountContainer: {
    backgroundColor: '#fff',
    bottom: 170,
    width: 90,
    left: 90,
    height: 30,
    borderRadius: 40,
  },
  itemInfoContainer: {
    bottom: 35,
  },
  itemName: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemPrice: {
    fontWeight: '600',
    color: 'rgba(106, 64, 41, 1)',
    textAlign: 'center',
    fontSize: 17,
  },
});
const mapStateToProps = state => ({
  items: state.items,
});

export default connect(mapStateToProps)(Promo);
