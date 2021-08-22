/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {getItemDefault, getItemsByCategory} from '../src/redux/actions/items';
import {connect} from 'react-redux';

const HomeItemsGrid = props => {
  const {params} = props.route;
  const [countPage, setCountPage] = useState(1);
  const {pageInfo, dataByCategory} = props.items;
  console.log(props.items, 'items params');

  const handleCountPage = () => {
    if (pageInfo.nextPage !== null) {
      setCountPage(countPage + 1);
    }
  };

  const paginate = () => {
    props.getItemsByCategory(params[1], countPage);
  };

  useEffect(() => {
    paginate();
  }, [countPage]);

  return (
    <View style={styles.parent}>
      <View>
        {dataByCategory[0].category_name === 'Favorite Product' ? (
          <View style={styles.favouriteContainer}>
            <Text style={styles.favourite}>
              {dataByCategory[0].category_name}
            </Text>
            <Text style={styles.category}>
              These are our best products, choose yours
            </Text>
          </View>
        ) : (
          <View style={styles.favouriteContainer}>
            <Text style={styles.favourite}>Choose your favorite</Text>
            <Text style={styles.category}>
              {dataByCategory[0].category_name}
            </Text>
          </View>
        )}
      </View>
      <FlatList
        data={dataByCategory}
        style={styles.gridView}
        onEndReachedThreshold={0.5}
        onEndReached={handleCountPage}
        numColumns={2}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('detail', item.id)}
              style={styles.itemInfo}>
              <Image style={styles.picture} source={{uri: `${item.picture}`}} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                IDR {Number(item.price).toLocaleString('ind')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    marginVertical: 40,
  },
  favouriteContainer: {
    alignItems: 'center',
  },
  gridView: {
    marginHorizontal: 30,
  },
  favourite: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  category: {
    color: 'rgba(106, 64, 41, 1)',
    textAlign: 'center',
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
    marginVertical: 80,
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

const mapDispatchToProps = {getItemsByCategory, getItemDefault};

export default connect(mapStateToProps, mapDispatchToProps)(HomeItemsGrid);
