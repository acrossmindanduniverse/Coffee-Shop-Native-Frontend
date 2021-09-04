/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {
  searchItems,
  getItemDefault,
  changeSearchState,
} from '../src/redux/actions/items';
import Icon from 'react-native-vector-icons/AntDesign';
const SearchItems = props => {
  const {searchItemsData, pageInfo} = props.items;
  const [countPage, setCountPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [onReached, setOnReached] = useState(false);
  const [detail, setDetail] = useState({
    search: '',
    sortBy: '' || 'name',
    sort: '' || 'asc',
  });
  const err = 'there is no item anymore';

  const onSearchNext = () => {
    if (pageInfo.nextPage !== null) {
      setCountPage(countPage + 1);
    }
  };

  const onSearch = () => {
    if (countPage > 1) {
      props.searchItems(detail.search, detail.sortBy, detail.sort, countPage);
    } else {
      props.searchItems(detail.search, detail.sortBy, detail.sort);
    }
    setTapped(false);
    setOnReached(true);
    setCountPage(1);
  };

  const handleSortBy = data => {
    setDetail({
      ...detail,
      sortBy: data,
    });
  };

  const handleSort = data => {
    setDetail({
      ...detail,
      sort: data,
    });
  };

  useEffect(() => {
    onSearch();
  }, [countPage]);

  useEffect(() => {
    if (tapped) {
      props.getItemDefault();
    }
  }, [tapped]);

  console.log(props.items, 'search items debugger');

  const customDropDown = visible => {
    setModal(visible);
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <View
          onTouchStart={() => setTapped(true)}
          style={styles.inputContainer}
          initialValues={{search: ''}}>
          <SafeAreaView style={styles.input}>
            <View style={styles.iconContainer}>
              <Icon style={styles.icon} name="search1" />
            </View>
            <TextInput
              onTouchStart={() => props.navigation.navigate('searchItems')}
              style={styles.searchInput}
              placeholder="Search"
              onChangeText={values =>
                setDetail({
                  ...detail,
                  search: values,
                })
              }
              onSubmitEditing={onSearch}
            />
          </SafeAreaView>
        </View>
        <View style={styles.dropDown}>
          <TouchableOpacity onPress={() => customDropDown(true)}>
            <Icon name="down" style={styles.down} />
          </TouchableOpacity>
        </View>
      </View>
      {searchItemsData !== err ? (
        <View>
          <Modal
            animationType="slide"
            visible={modal}
            transparent={true}
            onRequestClose={() => setModal(true)}>
            <View style={styles.dropDownContent}>
              <View style={styles.dropDownList}>
                <View style={styles.closeBtnContainer}>
                  <Text style={styles.sortBy}>Sort By :</Text>
                  <TouchableOpacity onPress={() => setModal(false)}>
                    <Icon style={styles.close} name="close" />
                  </TouchableOpacity>
                </View>
                <View style={styles.dropDownInsideContent}>
                  <TouchableOpacity
                    onPress={() => handleSort('desc')}
                    style={styles.itemBtn1}>
                    <Text style={styles.item1}>To Highest</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.dropDownInsideContent}>
                  <TouchableOpacity
                    onPress={() => handleSort('asc')}
                    style={styles.itemBtn1}>
                    <Text style={styles.item1}>To Lowest</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.dropDownInsideContent}>
                  <TouchableOpacity
                    onPress={() => handleSortBy('name')}
                    style={styles.itemBtn2}>
                    <Text style={styles.item2}>Item</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.dropDownInsideContent}>
                  <TouchableOpacity
                    onPress={() => handleSortBy('price')}
                    style={styles.itemBtn2}>
                    <Text style={styles.item2}>Price</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <FlatList
            data={searchItemsData}
            style={styles.gridView}
            onMomentumScrollEnd={() => setOnReached(true)}
            onEndReachedThreshold={0.5}
            onEndReached={onSearchNext}
            numColumns={2}
            renderItem={({item}) => (
              <View style={styles.itemContent}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('detail', item.id)}>
                  <View style={styles.itemContainer}>
                    <View style={styles.itemInfo}>
                      <Image
                        style={styles.picture}
                        source={{uri: `${item.picture}`}}
                      />
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>
                        IDR {Number(item.price).toLocaleString('ind')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={idx => idx}
          />
        </View>
      ) : (
        <View style={styles.errorContainer}>
          <View style={styles.error}>
            <Text style={styles.errorText}>Oops, no item has been found</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 70,
  },
  input: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 2,
    width: 250,
    borderRadius: 40,
  },
  dropDown: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  searchInput: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    width: '100%',
    color: '#000',
  },
  down: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  favouriteContainer: {
    marginVertical: 50,
    alignItems: 'center',
  },
  favourite: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  gridView: {
    marginHorizontal: 30,
    marginBottom: 120,
  },
  itemContent: {
    marginVertical: 35,
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
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // error: {
  //   marginTop: 420,
  // },
  errorText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgba(106, 64, 41, 1)',
    fontSize: 50,
  },
  dropDownContent: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#000000a0',
    height: '100%',
  },
  dropDownList: {
    flexDirection: 'column',
    elevation: 4,
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  closeBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  sortBy: {
    color: '#362115',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  close: {
    justifyContent: 'flex-end',
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 30,
  },
  dropDownInsideContent: {
    marginVertical: 20,
    marginHorizontal: 35,
  },
  itemBtn1: {
    backgroundColor: '#FFBA33',
    alignItems: 'center',
    borderRadius: 18,
  },
  item1: {
    marginVertical: 20,
    color: '#fff',
    marginHorizontal: 40,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  item2: {
    marginVertical: 20,
    marginHorizontal: 40,
    color: '#FFBA33',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  itemBtn2: {
    backgroundColor: '#362115',
    alignItems: 'center',
    borderRadius: 18,
  },
});

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = {searchItems, getItemDefault, changeSearchState};

export default connect(mapStateToProps, mapDispatchToProps)(SearchItems);
