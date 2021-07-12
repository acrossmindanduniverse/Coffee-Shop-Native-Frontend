import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {connect} from 'react-redux';

const AllMenu = props => {
  const {data} = props.items;
  console.log(props.items);
  return (
    <View>
      <View style={styles.favouriteContainer}>
        <Text style={styles.favourite}>All Menu</Text>
        <Text style={styles.category}>Pick your good deals</Text>
      </View>
      <FlatGrid
        itemDimension={230}
        data={data}
        spacing={10}
        renderItem={({item}) => (
          <View>
            <View style={styles.itemContainer}>
              <View style={styles.itemInfo}>
                <Image
                  style={styles.picture}
                  source={{uri: `${item.picture}`}}
                />
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>IDR {item.price}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 180,
    height: 260,
    backgroundColor: '#fff',
    elevation: 2,
    margin: 40,
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

export default connect(mapStateToProps)(AllMenu);