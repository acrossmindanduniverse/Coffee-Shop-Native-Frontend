/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {homeToggle} from '../redux/actions/user';
import {connect} from 'react-redux';
import {registerFcmToken} from '../redux/actions/auth';
import {
  getItemsCategory,
  getItemsByCategory,
  searchItems,
  getItemDefault,
} from '../redux/actions/items';

const HomeScreen = props => {
  const {data, dataByCategory} = props.items;
  const [screenTab, setScreenTab] = useState();
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

  useEffect(() => {
    if (props.auth.info !== null) {
      props.registerFcmToken(props.auth.refreshToken?.token, {
        token: props.auth.fcmToken?.token,
      });
    }
  }, []);

  useEffect(() => {
    mapAllCategoryName(data);
  }, [data]);

  useEffect(() => {
    if (categoryName[3]) {
      setScreenTab(categoryName[3]);
      props.getItemsByCategory(categoryName[3]);
    }
  }, [categoryName[3]]);

  useEffect(() => {
    props.getItemsCategory();
  }, []);

  useEffect(() => {
    props.homeToggle();
  }, []);

  return (
    <View style={styles.parent}>
      <ScrollView
        style={styles.productParent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.slogan}>
          <Text style={styles.sloganText}>A good coffee is a good day</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon style={styles.icon} name="search1" />
          <TextInput
            onTouchStart={() => props.navigation.navigate('searchItems')}
            style={styles.input}
            placeholder="Search"
          />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.categoryNameContainer}>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => handleTabTouch(categoryName[3])}>
              <Text
                style={
                  screenTab === categoryName[3]
                    ? styles.tabName2
                    : styles.tabName
                }>
                {categoryName[3]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => handleTabTouch(categoryName[0])}>
              <Text
                style={
                  screenTab === categoryName[0]
                    ? styles.tabName2
                    : styles.tabName
                }>
                {categoryName[0]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => handleTabTouch(categoryName[1])}>
              <Text
                style={
                  screenTab === categoryName[1]
                    ? styles.tabName2
                    : styles.tabName
                }>
                {categoryName[1]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('promo')}>
              <Text style={styles.tabName}>Promo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => handleTabTouch(categoryName[2])}>
              <Text
                style={
                  screenTab === categoryName[2]
                    ? styles.tabName2
                    : styles.tabName
                }>
                {categoryName[2]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => handleTabTouch(categoryName[4])}>
              <Text
                style={
                  screenTab === categoryName[2]
                    ? styles.tabName2
                    : styles.tabName
                }>
                {categoryName[4]}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.seeMore}
          onPress={() =>
            props.navigation.navigate('items', [dataByCategory, screenTab])
          }>
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
                {console.log(item.picture, 'test')}
                <Image source={{uri: `${item.picture}`}} style={styles.image} />
                <Text style={styles.primaryFontBold}>{item.name}</Text>
                <Text style={styles.price}>
                  IDR {Number(item.price).toLocaleString('ind')}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerItems}>
          <Entypo name="home" style={styles.home} />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('profile')}>
              <Ionicons name="person-outline" style={styles.home} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('chatList')}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                style={styles.home}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  seeMore: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seeMoreText: {
    marginRight: 30,
    marginTop: 15,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'rgba(106, 64, 41, 1)',
  },
  productParent: {
    backgroundColor: '#fff',
  },
  slogan: {
    marginTop: 90,
  },
  sloganText: {
    fontFamily: 'Poppins-Black',
    width: 285,
    color: 'rgba(106, 64, 41, 1)',
    marginHorizontal: 30,
    fontSize: 35,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#EFEEEE',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 70,
    borderRadius: 40,
  },
  input: {
    marginVertical: 18,
    fontSize: 25,
    marginTop: 10,
    marginLeft: 10,
    width: '80%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 30,
    fontSize: 25,
  },
  searchInput: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    width: '100%',
    color: '#000',
  },
  categoryNameContainer: {
    flexDirection: 'row',
  },
  tab: {
    marginTop: 90,
    marginLeft: 30,
  },
  tabName: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#9A9A9D',
  },
  tabName2: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#9A9A9D',
    borderBottomColor: 'rgba(106, 64, 41, 1)',
    borderBottomWidth: 3,
  },
  productCardParent: {
    margin: 20,
    elevation: 4,
  },
  productCard: {
    backgroundColor: '#fff',
    width: 300,
    height: 300,
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
    width: 250,
    resizeMode: 'cover',
    height: 250,
  },
  primaryFontBold: {
    textAlign: 'center',
    color: 'rgba(106, 64, 41, 1)',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  price: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    color: 'rgba(106, 64, 41, 1)',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: 'transparent',
    marginVertical: 30,
  },
  footerItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  home: {
    color: '#6A4029',
    marginHorizontal: 35,
    position: 'relative',
    justifyContent: 'center',
    fontSize: 35,
  },
});

const mapStateToProps = state => ({
  items: state.items,
  auth: state.auth,
  user: state.user,
});
const mapDispatchToProps = {
  registerFcmToken,
  getItemsCategory,
  getItemsByCategory,
  searchItems,
  getItemDefault,
  homeToggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
