import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, StyleSheet, View, Text, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetail from './src/screens/ProductDetail';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icons from 'react-native-vector-icons/FontAwesome';
import Cart from './src/screens/Cart';
import {Header, ChatHeader} from './components/GoBack';
import AllMenu from './src/screens/AllMenu';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import Security from './src/screens/Security';
import DeliveryMethod from './src/screens/DeliveryMethod';
import Payment from './src/screens/Payment';
import Welcome from './src/screens/Welcome';
import History from './src/screens/History';
import HomeItemsGrid from './components/HomeItemsGrid';
import SearchItems from './components/SearchItems';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/EditProfile';
import {connect} from 'react-redux';
import UserHome from './components/UserHome';
import SignOut from './components/SignOut';
import Promo from './src/screens/Promo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from './components/SplashScreen';
import ConfirmPassword from './src/screens/ConfirmPassword';
import EditPassword from './src/screens/EditPassword';
import ChatList from './src/screens/ChatList';
import ChatRoom from './src/screens/ChatRoom';
import {API_URL} from '@env';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const PictureSize = 130;

const ProfileStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={Profile}
        name="profile"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={Cart}
        name="cart"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={HomeScreen}
        name="home"
        options={{
          header: DashboardHeader,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const AllMenuStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={AllMenu}
        name="allMenu"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const PrivacyPolicyStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={PrivacyPolicy}
        name="privacyAndPolicy"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const SecurityStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={Security}
        name="security"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const PromoStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={Promo}
        name="promo"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={ChatList}
        name="chatList"
        options={{
          header: ChatHeader,
        }}
      />
      <Stack.Screen
        component={ChatRoom}
        name="chatRoom"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={HomeScreen}
        name="home"
        options={{
          header: DashboardHeader,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={Promo}
        name="promo"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={ProductDetail}
        name="detail"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={Payment}
        name="payment"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={Profile}
        name="profile"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={ChatStack}
        name="chatList"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EditProfile}
        name="editProfile"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={ConfirmPassword}
        name="confirmPassword"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={EditPassword}
        name="editPassword"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={History}
        name="history"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={DeliveryMethod}
        name="deliveryMethod"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={HomeItemsGrid}
        name="items"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={SearchItems}
        name="searchItems"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Welcome}
        name="welcome"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={SignIn}
        name="signIn"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={SignUp}
        name="signUp"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const DashboardHeader = props => {
  return (
    <TouchableOpacity style={styles.barsContainer}>
      <Icons name="bars" style={styles.bars} />
      <TouchableOpacity onPress={() => props.navigation.navigate('cart')}>
        <AntDesign name="shoppingcart" style={styles.bars} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const DrawerContent = props => {
  const menuItem = Object.keys(props.descriptors);
  const renderMenu = menuItem.map(
    item => props.descriptors[item].options.title,
  );
  const newItem = renderMenu[0] === undefined && delete renderMenu[0];

  return (
    props.state.routeNames[0] !== 'auth' && (
      <View style={drawerContent.parent}>
        <View style={styles.content}>
          <UserHome />
          <FlatList
            style={drawerContent.menu}
            data={renderMenu}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.navigation}
                onPress={() =>
                  props.navigation.navigate(menuItem[index].split('-')[0])
                }>
                {item === 'Home' && (
                  <AntDesign name="home" style={styles.icon} />
                )}
                {item === 'Profile' && (
                  <MaterialIcons name="person-outline" style={styles.icon} />
                )}
                {item === 'Orders' && (
                  <AntDesign name="shoppingcart" style={styles.icon} />
                )}
                {item === 'Promo' && (
                  <Ionicons name="pricetag-outline" style={styles.icon} />
                )}
                {item === 'All Menu' && (
                  <MaterialIcons name="restaurant-menu" style={styles.icon} />
                )}
                {item === 'Privacy Policy' && (
                  <AntDesign name="lock" style={styles.icon} />
                )}
                {item === 'Security' && (
                  <MaterialIcons name="security" style={styles.icon} />
                )}
                <Text style={drawerContent.menuItem}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(_item, index) => String(index)}
            ItemSeparatorComponent={() => (
              <View style={drawerContent.menuSeparator} />
            )}
          />
          <SignOut />
        </View>
      </View>
    )
  );
};

const App = props => {

  const {info} = props.auth;
  const {home} = props.user;

  return (
    <NavigationContainer>
      {info !== null ? (
        <Drawer.Navigator
          drawerStyle={{backgroundColor: 'transparent', width: 380}}
          drawerContent={DrawerContent}>
          {!home && (
            <Stack.Screen
              component={SplashScreen}
              name="splash"
              options={{
                headerShown: false,
              }}
            />
          )}
          <Drawer.Screen
            options={{title: 'Home'}}
            name="root"
            component={MainStack}
          />
          <Drawer.Screen
            options={{
              title: 'Profile',
            }}
            name="profile"
            component={ProfileStack}
          />
          <Drawer.Screen
            options={{
              title: 'Orders',
            }}
            name="cart"
            component={CartStack}
          />
          <Drawer.Screen
            options={{title: 'Promo'}}
            name="promo"
            component={PromoStack}
          />
          <Drawer.Screen
            options={{
              title: 'All Menu',
            }}
            name="allMenu"
            component={AllMenuStack}
          />
          <Drawer.Screen
            options={{
              title: 'Privacy Policy',
            }}
            name="privacyAndPolicy"
            component={PrivacyPolicyStack}
          />
          <Drawer.Screen
            options={{
              title: 'Security',
            }}
            name="security"
            component={SecurityStack}
          />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={({title: 'Auth'}, {headerShown: false})}
            name="auth"
            component={AuthStack}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  barsContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bars: {
    color: '#6A4029',
    fontSize: 30,
  },
  navigation: {
    flexDirection: 'row',
  },
  icon: {
    color: '#6A4029',
    fontSize: 30,
    marginRight: 15,
  },
});

const drawerContent = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  userName: {
    color: '#fff',
    fontSize: 25,
  },
  userEmail: {
    color: '#fff',
    fontSize: 17,
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  profileInfo: {
    height: 320,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A4029',
  },
  profilePicture: {
    width: PictureSize,
    height: PictureSize,
    backgroundColor: 'white',
    borderRadius: PictureSize / 2,
  },
  menu: {
    margin: 40,
  },
  menuItem: {
    color: '#6A4029',
    fontWeight: '600',
    fontSize: 25,
  },
  menuSeparator: {
    borderBottomWidth: 2,
    marginVertical: 20,
    borderBottomColor: 'grey',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps)(App);
