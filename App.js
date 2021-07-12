import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetail from './src/screens/ProductDetail';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icons from 'react-native-vector-icons/FontAwesome';
import Cart from './src/screens/Cart';
import {Header, userCouponHeader} from './components/GoBack';
// import DrawerContent from './components/DrawerContent';
import AllMenu from './src/screens/AllMenu';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import Security from './src/screens/Security';
import UserCoupon from './src/screens/UserCoupon';
import DeliveryMethod from './src/screens/DeliveryMethod';
import Payment from './src/screens/Payment';
import Welcome from './src/screens/Welcome';
import History from './src/screens/History';
import HomeItemsGrid from './components/HomeItemsGrid';
import SearchItems from './components/SearchItems';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import Promo from './src/screens/Promo';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/EditProfile';
import {connect} from 'react-redux';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DashboardHeader = () => {
  return (
    <TouchableOpacity style={styles.barsContainer}>
      <Icons name="bars" style={styles.bars} />
    </TouchableOpacity>
  );
};

const PictureSize = 130;

const MainStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={Welcome}
        name="welcome"
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
        component={Cart}
        name="cart"
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
        component={UserCoupon}
        name="userCoupon"
        options={{
          header: userCouponHeader,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={SignIn}
        name="signIn"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={SignUp}
        name="signUp"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={PrivacyPolicy}
        name="privacyAndPolicy"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={AllMenu}
        name="allMenu"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={Security}
        name="security"
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
        component={EditProfile}
        name="editProfile"
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

const DrawerContent = ({descriptors, navigation}) => {
  const menuItem = Object.keys(descriptors);
  const renderMenu = menuItem.map(item => descriptors[item].options.title);
  console.log(menuItem[0].split('-')[0]);
  return (
    <View style={drawerContent.parent}>
      <View style={drawerContent.profileInfo}>
        <Image style={drawerContent.profilePicture} />
        <View style={drawerContent.userInfo}>
          <Text style={drawerContent.userName}>User</Text>
          <Text style={drawerContent.userEmail}>user@mail.com</Text>
        </View>
      </View>
      <FlatList
        style={drawerContent.menu}
        data={renderMenu}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(menuItem[index].split('-')[0])}>
            <Text style={drawerContent.menuItem}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => (
          <View style={drawerContent.menuSeparator} />
        )}
      />
      <View style={drawerContent.menu}>
        <TouchableOpacity>
          <Text style={drawerContent.menuItem}>Sign-Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{backgroundColor: 'transparent'}}
        drawerContent={DrawerContent}>
        <Drawer.Screen
          options={{title: 'Home'}}
          name="root"
          component={MainStack}
        />
        <Drawer.Screen
          options={{title: 'Profile'}}
          name="profile"
          component={Profile}
        />
        <Drawer.Screen
          options={{title: 'Orders'}}
          name="cart"
          component={Cart}
        />
        <Drawer.Screen
          options={{title: 'Coupon'}}
          name="coupon"
          component={UserCoupon}
        />
        <Drawer.Screen
          options={{title: 'All Menu'}}
          name="allMenu"
          component={AllMenu}
        />
        <Drawer.Screen
          options={{title: 'Privacy Policy'}}
          name="privacyAndPolicy"
          component={PrivacyPolicy}
        />
        <Drawer.Screen
          options={{title: 'Security'}}
          name="security"
          component={Security}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  barsContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  bars: {
    color: '#000',
    fontSize: 30,
  },
});

const drawerContent = StyleSheet.create({
  parent: {
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flex: 1,
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
});

export default connect(mapStateToProps)(App);
