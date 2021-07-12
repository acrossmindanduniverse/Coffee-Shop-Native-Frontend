import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  getItemsCategory,
  getItemsByCategory,
  searchItems,
} from '../../redux/actions/items';

const HomeScreen = props => {
  const {data, dataByCategory, searchItemsData} = props.items;
  const [screenTab, setScreenTab] = useState();
  const [search, setSearch] = useState('');
  const [categoryName, setCategoryName] = useState([]);

  const mapAllCategoryName = category => {
    const newCategoryName = [];
    category.forEach(row => {
      if (!newCategoryName.includes(row.category_name)) {
        newCategoryName.push(row.category_name);
      }
    });
    setCategoryName(newCategoryName);
  };

  const handleTabTouch = tabComp => {
    setScreenTab(tabComp);
    props.getItemsByCategory(tabComp);
  };

  const onSearch = searchData => {
    props.searchItems(searchData);
    if (searchData) {
      props.navigation.navigate('searchItems');
    }
  };
  console.log(searchItemsData);

  useEffect(() => {
    mapAllCategoryName(data);
  }, [data]);

  useEffect(() => {
    if (categoryName[0]) {
      setScreenTab(categoryName[0]);
      props.getItemsByCategory(categoryName[0]);
    }
  }, [categoryName[0]]);

  useEffect(() => {
    props.getItemsCategory();
  }, []);

  return (
    <View style={styles.parent}>
      <ScrollView
        style={styles.productParent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.slogan}>
          <Text style={styles.sloganText}>A good coffee is a good day</Text>
        </View>
        <View style={styles.inputContainer} initialValues={{search: ''}}>
          <SafeAreaView style={styles.input}>
            <View style={styles.iconContainer}>
              <Icon style={styles.icon} name="search1" />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="search items"
              onChangeText={values => setSearch(values)}
              onSubmitEditing={() => onSearch(search)}
            />
          </SafeAreaView>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            horizontal
            data={categoryName}
            renderItem={({item}) => (
              <View style={styles.tab}>
                <TouchableOpacity onPress={() => handleTabTouch(item)}>
                  <Text style={styles.tabName}>{item}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(_, index) => String(index)}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.seeMore}
          onPress={() => props.navigation.navigate('items', dataByCategory)}>
          <Text> </Text>
          <Text style={styles.seeMoreText}>See more</Text>
        </TouchableOpacity>
        <ScrollView
          style={styles.productCardParent}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {dataByCategory.map((item, index) => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('detail', item.id)}
              style={styles.productCard}
              key={index}>
              <View>
                <Image source={{uri: `${item.picture}`}} style={styles.image} />
                <Text style={styles.primaryFontBold}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerItems}>
          <Entypo name="home" style={styles.home} />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('profile')}>
            <Ionicons name="person-outline" style={styles.home} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  seeMore: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seeMoreText: {
    marginRight: 30,
    color: 'rgba(106, 64, 41, 1)',
  },
  productParent: {
    backgroundColor: '#EFEEEE',
  },
  slogan: {
    alignItems: 'center',
    marginTop: 90,
  },
  sloganText: {
    fontWeight: 'bold',
    fontSize: 60,
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  input: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 40,
    width: 300,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 10,
    fontSize: 20,
  },
  tab: {
    margin: 35,
    marginTop: 90,
  },
  tabName: {
    fontSize: 20,
    color: '#9A9A9D',
  },
  productCardParent: {
    margin: 20,
    elevation: 4,
  },
  productCard: {
    backgroundColor: '#fff',
    width: 250,
    height: 270,
    margin: 30,
    marginTop: 80,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    backgroundColor: 'grey',
    borderRadius: 20,
    marginTop: -60,
    width: 168,
    height: 189,
  },
  primaryFontBold: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  footer: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  footerItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  home: {
    color: '#6A4029',
    fontSize: 35,
  },
});

const mapStateToProps = state => ({
  items: state.items,
});
const mapDispatchToProps = {getItemsCategory, getItemsByCategory, searchItems};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
